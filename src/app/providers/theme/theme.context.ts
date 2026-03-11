import { type Theme } from '@features/theme-switcher';
import { createContext } from 'react';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
