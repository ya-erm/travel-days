import type { Messages } from '$lib/translate';

type Route = {
  path: string;
  title: Messages;
};

type RouteKey =
  | 'root'
  | 'login'
  | 'logout'
  | 'register'
  | 'trips'
  | 'trips.add'
  | 'settings'
  | 'settings.language'
  | 'settings.import_export'
  | 'settings.logs'
  | 'uikit';

export const routes: { [key in RouteKey]: Route } = {
  root: {
    path: '/',
    title: 'app.title',
  },
  login: {
    path: '/login',
    title: 'auth.login.title',
  },
  logout: {
    path: '/logout',
    title: 'auth.logout.title',
  },
  register: {
    path: '/register',
    title: 'auth.register.title',
  },
  trips: {
    path: '/trips',
    title: 'trips.title',
  },
  'trips.add': {
    path: '/trips/add',
    title: 'trips.add.title',
  },
  settings: {
    path: '/settings',
    title: 'settings.title',
  },
  'settings.language': {
    path: '/settings/language',
    title: 'settings.select_language',
  },
  'settings.import_export': {
    path: '/settings/import-export',
    title: 'settings.import_export',
  },
  'settings.logs': {
    path: '/settings/logs',
    title: 'settings.logs',
  },
  uikit: {
    path: '/uikit',
    title: 'settings.uikit',
  },
};

export function findRoute(path: string) {
  return Object.values(routes).find((route) => route.path === path);
}

export function route(key: RouteKey) {
  return routes[key].path;
}
