import { storable } from '$lib/storable';
import { store } from '$lib/store';
import { Logger } from '$lib/utils';
import { useDB } from './db';
import type { JournalItem, JournalSubscriber } from './journal';
import type { UserSettings } from './userSettings';

export type User = {
  uuid: string;
  login?: string | null;
  publicKey?: string | null;
  privateKey?: string | null;
};

const currentUserIdStore = storable<string | null>(null, 'current_user');

const logger = new Logger('UserService', { disabled: false, color: '#00bbbb' });

const GUEST: User = { uuid: 'guest', login: null };

export class UserService implements JournalSubscriber {
  // #region PRIVATE FIELDS
  private _users = store<User[]>([]);
  private _currentUser = store<User | null>(null);
  private _currentUserSettings = store<UserSettings | null>(null);
  // #endregion

  // #region PUBLIC PROPERTIES

  get name() {
    return 'UserService';
  }

  /** Current user */
  get currentUser() {
    return this._currentUser.value;
  }

  /** Readable store of current user */
  get $currentUser() {
    return this._currentUser.readable;
  }

  /** Current user is guest */
  get isGuest() {
    return this.currentUser?.uuid === GUEST.uuid;
  }

  /** Current user settings */
  get currentUserSettings() {
    return this._currentUserSettings.value;
  }

  /** Readable store of current user settings */
  get $currentUserSettings() {
    return this._currentUserSettings;
  }

  // #endregion

  // #region PUBLIC METHODS

  async init() {
    // Load from DB
    await this._loadFromDB();

    // Load current user
    this._loadCurrentUser();

    // Load current user settings
    await this._loadCurrentUserSettings();
  }

  /** Save user to local DB and memory */
  async save(item: User) {
    const db = await useDB();
    await db.put('users', item);
    this._users.update((prev) => prev.concat(item));
  }

  /** Delete user from local DB and memory */
  async delete(item: Pick<User, 'uuid'>) {
    const db = await useDB();
    await db.delete('users', item.uuid);
    this._users.update((prev) => prev.filter(({ uuid }) => uuid !== item.uuid));
  }

  /** Set current user */
  async setCurrentUser(user: User) {
    currentUserIdStore.set(user.uuid);
    this._loadCurrentUser();
    await this._loadCurrentUserSettings();
  }

  /** @throws error, if no current user */
  getCurrentUser() {
    if (!this.currentUser) {
      throw new Error('No current user');
    }
    return this.currentUser;
  }

  /** @throws error if not current user */
  getCurrentUserSettings(): UserSettings {
    if (!this.currentUserSettings) {
      throw new Error('No current user settings');
    }
    return this.currentUserSettings;
  }

  /** Update sync number */
  async updateSyncNumber(value: number) {
    logger.debug('updateSyncNumber', { value });
    await this.updateSettings({ syncNumber: value });
  }

  /** Update user settings and optional save to DB */
  async updateSettings(settings: Partial<UserSettings>, saveToDB: boolean = true) {
    await this._updateSettingsInMemory(settings);
    if (saveToDB) {
      const user = this.getCurrentUser();
      if (this.currentUserSettings) {
        const db = await useDB();
        await db.put('userSettings', { ...this.currentUserSettings, owner: user.uuid });
      }
    }
  }

  /** Apply journal updates and optional save to DB */
  async applyChanges(changes: JournalItem[], saveToDB: boolean) {
    // TODO: journal changes
  }

  // #endregion

  // #region PRIVATE METHODS

  /** Load all user from local DB to memory */
  private async _loadFromDB() {
    const db = await useDB();
    const items = await db.getAll('users');

    this._users.set([GUEST, ...items]);
  }

  /* Update settings in memory */
  private async _updateSettingsInMemory(settings: Partial<UserSettings>) {
    this._currentUserSettings.update((prev) => {
      const newValue = { ...prev, ...settings } as UserSettings;
      logger.debug('Update user settings:', { prev, new: newValue });
      return newValue;
    });
  }

  /* Get current user from settings or use a guest */
  private _loadCurrentUser() {
    const uuid = currentUserIdStore.value;
    const user = this._users.value.find((x) => x.uuid === uuid);
    this._currentUser.set(user ?? GUEST);
    logger.debug('Current user:', this.currentUser?.login ?? this.currentUser?.uuid);
  }

  /* Load current user's settings from local DB to memory */
  private async _loadCurrentUserSettings() {
    if (!this.currentUser) {
      return;
    }
    const db = await useDB();
    const settings = await db.get('userSettings', this.currentUser.uuid);
    if (settings) {
      this._currentUserSettings.set(settings);
    }
  }

  // #endregion
}

export const userService = new UserService();

export const currentUserStore = userService.$currentUser;
