import { ApiError } from '$lib/api';
import { db } from '$lib/server';
import { checkStringParameter } from '$lib/utils';
import { encryptRsa } from '$lib/utils/crypto';

export type LoginRequestData = {
  login: string;
};

export async function login(data: LoginRequestData) {
  const login = checkStringParameter(data.login, 'login');

  const user = await db.user.findFirst({ where: { email: login } });

  if (!user) {
    throw new ApiError(404, 'USER_NOT_FOUND', `User with login "${login}" not found`);
  }

  let token = await db.accessToken.findFirst({
    where: { AND: { userId: user.uuid, invalidated: false } },
  });
  if (!token) {
    token = await db.accessToken.create({
      data: {
        value: crypto.randomUUID(),
        userId: user.uuid,
      },
    });
  }

  const publicKey = JSON.parse(user.publicKey) as JsonWebKey;
  const encryptedToken = await encryptRsa(publicKey, token.value);

  return { user, encryptedToken };
}

export type LoginResponseData = Awaited<ReturnType<typeof login>>;
