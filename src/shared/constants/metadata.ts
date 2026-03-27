export const SITE_NAME = 'Psychologists-Services';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const runtimeOrigin =
  typeof window !== 'undefined' ? window.location.origin : '';

export const HOME_PAGE_URL = trimTrailingSlash(
  import.meta.env.VITE_PUBLIC_APP_URL || runtimeOrigin || 'http://localhost:5173'
);

export const OG_IMAGE = 'psychologists-services-og.png';
