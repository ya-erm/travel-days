import { activeLocale, type Locales } from '$lib/translate';
import { derived } from 'svelte/store';
import data from './raw/countries.json';
import dataRu from './raw/countries.ru.json';

export type Country = {
  id: string;
  code: string;
  name: string;
  aliases?: string[];
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

export const countries = derived(activeLocale, (locale) => {
  return data.map(
    (country): Country => ({
      id: country.code,
      code: country.code,
      name: translateName(country.code, country.name, locale),
      aliases: [country.name].concat(country.alias ?? []),
    }),
  );
});
