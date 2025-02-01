import { AVIATIONSTACK_API_KEY } from '$env/static/private';

import { FLIGHTS_MOCK } from './mock';
import type { AviationStackFlightsResponse } from './types';

export type GetFlightsByNumberRequest = {
  flightNumber: string;
};

const USE_FLIGHTS_MOCK = false;

export async function getFlightsByNumber(data: GetFlightsByNumberRequest) {
  const { flightNumber } = data;

  // eslint-disable-next-line no-console
  console.log('[getFlightsByNumber]', { flightNumber });

  if (USE_FLIGHTS_MOCK) {
    return FLIGHTS_MOCK;
  }

  // https://aviationstack.com/documentation#real_time_flights
  const url = new URL('https://api.aviationstack.com/v1/flights');
  url.searchParams.set('access_key', AVIATIONSTACK_API_KEY);
  url.searchParams.set('flight_iata', flightNumber);

  const response = await fetch(url);
  const json: AviationStackFlightsResponse = await response.json();

  return {
    items: json.data.map((item) => ({
      flightNumber: item.flight.iata,
      departure: {
        airport: item.departure.iata,
        time: item.departure.scheduled,
        timezone: item.departure.timezone,
      },
      arrival: {
        airport: item.arrival.iata,
        time: item.arrival.scheduled,
        timezone: item.arrival.timezone,
      },
      airline: {
        iata: item.airline.iata,
        name: item.airline.name,
      },
    })),
  };
}

export type GetJournalResponse = Awaited<ReturnType<typeof getFlightsByNumber>>;
