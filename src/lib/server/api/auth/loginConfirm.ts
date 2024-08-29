import { ApiError } from '$lib/api';
import { db } from '$lib/server';
import { checkStringParameter } from '$lib/utils';
import type { Cookies } from '@sveltejs/kit';

export type LoginConfirmRequestData = {
  uuid: string;
  token: string;
};

export async function loginConfirm(data: LoginConfirmRequestData, cookies: Cookies) {
  const uuid = checkStringParameter(data.uuid, 'uuid');
  const token = checkStringParameter(data.token, 'token');

  const accessToken = await db.accessToken.findFirst({ where: { value: token } });

  if (!accessToken || accessToken.userId !== uuid) {
    throw new ApiError(401, 'UNAUTHORIZED', `Token "${token}" for user "${uuid}" not found`);
  }

  cookies.set('session', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return true;
}

export type LoginConfirmResponseData = Awaited<ReturnType<typeof loginConfirm>>;
