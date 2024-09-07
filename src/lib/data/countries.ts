import { activeLocale } from '$lib/translate';
import { derived } from 'svelte/store';
import data from './raw/countries.json';
import dataRu from './raw/countries.ru.json';

export type Country = {
  code: string;
  name: string;
  alias?: string[];
};

export const countries = derived(activeLocale, (locale) => {
  switch (locale) {
    case 'ru-RU':
      return dataRu as Country[];
    default:
      return data as Country[];
  }
});
