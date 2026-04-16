import { useEffect, useState } from 'react';

import type { Theme } from '@features/theme-switcher';

import { getStoredTheme, syncTheme } from './theme.storage';

export const useThemeState = () => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    syncTheme(theme);
  }, [theme]);

  return { theme, setTheme };
};
