import type { Lang } from '@shared/lib/i18n';

type LanguageState = {
  language: string;
  resolvedLanguage?: string;
};

export const getLang = (i18n: LanguageState): Lang => {
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

  return currentLanguage.startsWith('uk') || currentLanguage.startsWith('ua')
    ? 'uk'
    : 'en';
};
