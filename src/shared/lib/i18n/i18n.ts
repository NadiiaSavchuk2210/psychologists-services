import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enA11y from './locales/en/a11y.json';
import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enFilters from './locales/en/filters.json';
import enHome from './locales/en/home.json';
import enNavbar from './locales/en/navbar.json';
import enPsychologists from './locales/en/psychologists.json';
import ukA11y from './locales/uk/a11y.json';
import ukAuth from './locales/uk/auth.json';
import ukCommon from './locales/uk/common.json';
import ukFilters from './locales/uk/filters.json';
import ukHome from './locales/uk/home.json';
import ukNavbar from './locales/uk/navbar.json';
import ukPsychologists from './locales/uk/psychologists.json';
import type { Lang, ILocales } from './types';

const resources: Record<Lang, Record<string, unknown>> = {
  en: {
    a11y: enA11y,
    auth: enAuth,
    common: enCommon,
    filters: enFilters,
    home: enHome,
    navbar: enNavbar,
    psychologists: enPsychologists,
  },
  uk: {
    a11y: ukA11y,
    auth: ukAuth,
    common: ukCommon,
    filters: ukFilters,
    home: ukHome,
    navbar: ukNavbar,
    psychologists: ukPsychologists,
  },
};

const localeBackend = {
  type: 'backend' as const,
  init: () => undefined,
  read: async (
    language: string,
    namespace: string,
    callback: (error: Error | null, data: unknown | false) => void
  ) => {
    try {
      const response = await fetch(`/locales/${language}/${namespace}.json`);

      if (!response.ok) {
        throw new Error(
          `Failed to load ${language}/${namespace}: ${response.status}`
        );
      }

      const data = (await response.json()) as ILocales[keyof ILocales];
      callback(null, data);
    } catch (error) {
      callback(error instanceof Error ? error : new Error('Locale load failed'), false);
    }
  },
};

i18n
  .use(localeBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    partialBundledLanguages: true,
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
