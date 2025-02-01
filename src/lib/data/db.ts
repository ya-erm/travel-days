import { openDB } from 'idb';
import type { DBSchema } from 'idb';

import { Logger } from '$lib/utils';

import type { JournalItem } from './journal';
import type { UserSettings } from './userSettings';
import type { User } from './users';
import type { TripDBO } from './trips';

export type WithOwner<T> = T & { owner: string };

export interface LocalDB extends DBSchema {
  users: {
    key: string;
    value: User;
  };
  userSettings: {
    key: string;
    value: WithOwner<UserSettings>;
    indexes: { 'by-owner': string };
  };
  journal: {
    key: string;
    value: WithOwner<JournalItem>;
    indexes: { 'by-owner': string };
  };
  trips: {
    key: string;
    value: WithOwner<TripDBO>;
    indexes: { 'by-owner': string };
  };
}

const CURRENT_VERSION = 4;

const logger = new Logger('useDB');

export async function useDB() {
  return await openDB<LocalDB>('travel-days', CURRENT_VERSION, {
    upgrade(db, oldVersion, newVersion) {
      logger.debug('Upgrading DB', { oldVersion, newVersion });

      function migration(version: number, description: string, action: () => void) {
        if (oldVersion < version && db.version >= version) {
          logger.debug(`Migration ${version}: ${description}`);
          action();
        }
      }

      migration(1, 'Creating journal store', () => {
        const objectStore = db.createObjectStore('journal', { keyPath: ['owner', 'order'] });
        objectStore.createIndex('by-owner', 'owner');
      });

      migration(2, 'Creating user store', () => {
        db.createObjectStore('users', { keyPath: 'uuid' });
      });

      migration(3, 'Creating user settings store', () => {
        db.createObjectStore('userSettings', { keyPath: 'owner' });
      });

      migration(4, 'Creating trips store', () => {
        const objectStore = db.createObjectStore('trips', { keyPath: 'id' });
        objectStore.createIndex('by-owner', 'owner');
      });
    },
  });
}
