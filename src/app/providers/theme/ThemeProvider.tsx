import { useEffect, useState } from 'react';

import type { Theme } from '@features/theme-switcher';

import { ThemeContext } from './theme.context';

const STORAGE_KEY = 'app-theme';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'green';
    }

    const savedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    return savedTheme ?? 'green';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
