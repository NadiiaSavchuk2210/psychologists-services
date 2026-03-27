import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      wait: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
