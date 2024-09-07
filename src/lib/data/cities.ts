import { derived } from 'svelte/store';

import { activeLocale, type Locales } from '$lib/translate';

import { countries, type Country } from './countries';
import data from './raw/cities.json';
import dataRu from './raw/cities.ru.json';

export type City = {
  code: string;
  name: string;
  country?: Country;
  timeZone: string;
  coordinates: { lat: number; lon: number };
};

const ruNames = dataRu.reduce(
  (acc, city) => {
    acc[city.code] = city.name;
    return acc;
  },
  {} as Record<string, string>,
);

const translateName = (code: string, name: string, locale: Locales) => {
  switch (locale) {
    case 'ru-RU':
      return ruNames[code];
    default:
      return name;
  }
};

export const cities = derived([activeLocale, countries], ([locale, countries]) => {
  return data.map(
    (city): City => ({
      code: city.code,
      name: translateName(city.code, city.name, locale),
      country: countries.find((country) => country.code === city.country_code),
      timeZone: city.time_zone,
      coordinates: city.coordinates,
    }),
  );
});
