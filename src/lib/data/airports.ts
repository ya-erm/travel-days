import { derived } from 'svelte/store';

import { activeLocale, type Locales } from '$lib/translate';

import { cities, type City } from './cities';
import { countries, type Country } from './countries';
import data from './raw/airports.json';
import dataRu from './raw/airports.ru.json';

export type Airport = {
  id: string;
  code: string;
  name: string;
  city?: City;
  country?: Country;
  timeZone: string;
  coordinates: { lat: number; lon: number };
};

const ruNames = dataRu.reduce(
  (acc, city) => {
    acc[city.code] = city.name;
    return acc;
  },
  {} as Record<string, string | null>,
);

const translateName = (code: string, name: string, locale: Locales) => {
  switch (locale) {
    case 'ru-RU':
      return ruNames[code] ?? name;
    default:
      return name;
  }
};

export const airports = derived([activeLocale, countries, cities], ([locale, countries, cities]) => {
  return data.map(
    (airport): Airport => ({
      id: airport.code,
      code: airport.code,
      name: translateName(airport.code, airport.name, locale),
      city: cities.find((city) => city.code === airport.city_code),
      country: countries.find((country) => country.code === airport.country_code),
      timeZone: airport.time_zone,
      coordinates: airport.coordinates,
    }),
  );
});
