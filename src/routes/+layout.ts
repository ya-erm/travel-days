import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { handleError } from '$lib/utils';

import { browser } from '$app/environment';
import { userService } from '$lib/data/users';
import { journalService } from '$lib/data/journal';
import { mainService } from '$lib/data/main';

dayjs.extend(utc);
dayjs.extend(timezone);

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
