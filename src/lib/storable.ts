import { browser } from '$app/environment';
import { store } from './store';

export const LS_PREFIX = 'td_';

/**
 * Writable store, synchronised with local storage
 * @param defaultValue - default value
 * @param name - name in local storage
 */
export function storable<T>(defaultValue: T, name: string) {
  if (!browser) {
    return store(defaultValue);
  }

  const json = localStorage?.getItem(`${LS_PREFIX}${name}`);
  const s = store(json ? (JSON.parse(json) as T) : defaultValue);
  s.subscribe((value) => localStorage?.setItem(`${LS_PREFIX}${name}`, JSON.stringify(value)));
  return s;
}
