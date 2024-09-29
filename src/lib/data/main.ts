import { v4 as uuid } from 'uuid';

import { Logger } from '$lib/utils/logger';

import { journalService, type JournalSubscriber } from './journal';
import { userService } from './users';
import { tripsService } from './trips';

type Service = JournalSubscriber & {
  init: () => Promise<void>;
};

const logger = new Logger('MainService', { disabled: false, color: '#00cc55' });

class MainService {
  private _id: string;
  private _called = false;

  constructor() {
    this._id = uuid();
  }

  async init() {
    // eslint-disable-next-line no-console
    console.debug('%cMain service ID:', 'color: red', this._id, { called: this._called });

    if (this._called) return;

    this._called = true;

    await this.initServices();
  }

  async initServices() {
    // $initialized.set(false);

    // await settingsService.init();
    await userService.init();

    const services: Service[] = [
      tripsService,
      // add other services here
    ];

    logger.log(`Initialise ${services.length} services to load data from local DB`);
    logger.debug('Services:', [...services.map((service) => service.name)]);
    await Promise.all(services.map((service) => service.init()));

    services.concat(userService).forEach((service) => journalService.addSubscriber(service));

    logger.log('Initialise journal service');
    await journalService.init();

    // $initialized.set(true);
  }

  reset() {}
}

export const mainService = new MainService();
