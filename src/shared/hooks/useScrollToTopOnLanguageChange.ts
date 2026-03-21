import { useLayoutEffect } from 'react';
import i18next from 'i18next';

export const useScrollToTopOnLanguageChange = (i18n: typeof i18next) => {
  useLayoutEffect(() => {
    const handleLanguageChange = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);
};
