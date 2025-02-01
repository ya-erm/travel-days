import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { browser } from '$app/environment';

import { journalService } from '$lib/data/journal';
import { mainService } from '$lib/data/main';
import { userService } from '$lib/data/users';
import { handleError } from '$lib/utils';

dayjs.extend(timezone);
dayjs.extend(utc);

export const load = async () => {
  if (!browser) {
    return;
  }

  await mainService.init().catch(handleError);

  // sync for authorized users only
  if (!userService.isGuest) {
    void journalService.syncWithServer().catch(handleError);
  }
};
