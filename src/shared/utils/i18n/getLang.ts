import type { Lang } from '@shared/lib/i18n';

export const getLang = (i18n: any): Lang =>
  i18n.language.startsWith('uk') || i18n.language.startsWith('ua')
    ? 'ua'
    : 'en';
