import type { Messages } from '$lib/translate';
import { readable } from 'svelte/store';
import { routes } from '../../routes';

export type MenuItem = {
  icon: string;
  title: Messages;
  path: string;
  exact?: boolean;
};

export const menu = readable<MenuItem[]>([
  {
    icon: 'mdi:format-list-bulleted',
    title: 'trips.title',
    path: routes.trips.path,
    exact: true,
  },
  {
    icon: 'mdi:plus',
    title: 'trips.add.title',
    path: routes['trips.add'].path,
  },
  {
    icon: 'mdi:cog-outline',
    title: 'settings.title',
    path: routes.settings.path,
  },
]);
