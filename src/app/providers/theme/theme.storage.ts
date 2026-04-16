import { THEMES, type Theme } from '@features/theme-switcher';

const STORAGE_KEY = 'app-theme';
const DEFAULT_THEME: Theme = 'green';

const isTheme = (value: string | null): value is Theme =>
  value !== null && value in THEMES;

export const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);

  return isTheme(savedTheme) ? savedTheme : DEFAULT_THEME;
};

export const syncTheme = (theme: Theme) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
};
