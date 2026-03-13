import 'react-i18next';
import type { ILocales } from './types';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: ILocales;
  }
}
