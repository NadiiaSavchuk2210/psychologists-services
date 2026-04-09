import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import type { Lang, ILocales } from './types';

type LocaleModule = {
  default: unknown;
};

const localeModules = import.meta.glob<LocaleModule>('./locales/*/*.json', {
  eager: true,
});

const resources = Object.entries(localeModules).reduce<Record<Lang, Record<string, unknown>>>(
  (acc, [path, module]) => {
  const match = path.match(/\.\/locales\/(en|uk)\/([a-z-]+)\.json$/);

  if (!match) {
    return acc;
  }

  const [, language, namespace] = match;

  acc[language as Lang] ??= {};
  acc[language as Lang][namespace] = module.default as ILocales[keyof ILocales];

  return acc;
  },
  { en: {}, uk: {} }
);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
    load: 'languageOnly',
    ns: [
      'common',
      'a11y',
      'auth',
      'navbar',
      'validation',
      'home',
      'psychologists',
      'filters',
      'favorites',
      'not-found',
      'error',
      'appointment',
    ],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
