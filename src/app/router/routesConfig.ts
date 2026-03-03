export const ROUTES = {
  HOME: '/',
  PSYCHOLOGISTS: '/psychologists',
  PSYCHOLOGIST_DETAILS: (id: number | string) => `/psychologists/${id}`,
  FAVORITES: '/favorites',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
