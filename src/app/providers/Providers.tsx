import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthProvider } from './auth/AuthProvider';
import { queryClient } from './queryClient/queryClient';
import { ThemeProvider } from './theme';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
  }, [i18n.language, i18n.resolvedLanguage]);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
