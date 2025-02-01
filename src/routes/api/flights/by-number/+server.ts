import { json } from '@sveltejs/kit';

import { withRequestHandlerMiddleware } from '$lib/server';
import { getFlightsByNumber, type GetFlightsByNumberRequest } from '$lib/server/api/flights/getFlightsByNumber';

import type { RequestHandler } from './$types';

export const POST = withRequestHandlerMiddleware<RequestHandler>(async ({ request }) => {
  const data: GetFlightsByNumberRequest = await request.json();
  const result = await getFlightsByNumber(data);
  return json(result);
});
