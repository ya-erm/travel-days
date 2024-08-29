import type { Cookies } from '@sveltejs/kit';

import { ApiError } from '$lib/api';
import { db } from '$lib/server';

/**
 * Check session token
 * @returns user uuid
 * @throws error if token is not exists or invalidated
 */
export async function checkAuth(cookies: Cookies) {
  const session = cookies.get('session');

  if (session) {
    const token = await db.accessToken.findFirst({
      where: { value: session },
    });
    if (token && !token.invalidated) {
      return { uuid: token.userId };
    }
  }

  throw new ApiError(401, 'UNAUTHORIZED', 'You are not logged in');
}
