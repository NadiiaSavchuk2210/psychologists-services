import { DB_FIELDS, SORT_OPTIONS } from '@shared/constants';
import type { Lang } from '@shared/lib/i18n';

import type {
  PsychologistServerSortField,
  PsychologistSortField,
} from './psychologistSort.types';
import { SORT_CONFIG } from '../config/sortConfig';
import type { SortOption } from '../types/psychologist-sort';

export const getPsychologistSortMeta = (sort: SortOption, lang: Lang) => {
  const nameField: PsychologistSortField = lang === 'uk' ? 'name_ua' : 'name';

  switch (sort) {
    case SORT_OPTIONS.PRICE_LOW_HIGH:
    case SORT_OPTIONS.CHEAP:
      return { sortField: 'price_per_hour' as const, isDesc: false };

    case SORT_OPTIONS.PRICE_HIGH_LOW:
    case SORT_OPTIONS.EXPENSIVE:
      return { sortField: 'price_per_hour' as const, isDesc: true };

    case SORT_OPTIONS.POPULAR:
      return { sortField: 'rating' as const, isDesc: true };

    case SORT_OPTIONS.NOT_POPULAR:
      return { sortField: 'rating' as const, isDesc: false };

    case SORT_OPTIONS.Z_A:
      return { sortField: nameField, isDesc: true };

    case SORT_OPTIONS.ALL:
    case SORT_OPTIONS.A_Z:
    default:
      return { sortField: nameField, isDesc: false };
  }
};

export const getPsychologistServerSortField = (
  sort: SortOption,
  lang: Lang
): PsychologistServerSortField => {
  const nameAscField =
    lang === 'uk' ? DB_FIELDS.SORT_NAME_UA : DB_FIELDS.SORT_NAME_EN;
  const nameDescField =
    lang === 'uk' ? DB_FIELDS.SORT_NAME_UA_DESC : DB_FIELDS.SORT_NAME_EN_DESC;

  switch (sort) {
    case SORT_OPTIONS.Z_A:
      return nameDescField;

    case SORT_OPTIONS.PRICE_LOW_HIGH:
    case SORT_OPTIONS.CHEAP:
      return DB_FIELDS.SORT_PRICE_ASC;

    case SORT_OPTIONS.PRICE_HIGH_LOW:
    case SORT_OPTIONS.EXPENSIVE:
      return DB_FIELDS.SORT_PRICE_DESC;

    case SORT_OPTIONS.POPULAR:
      return DB_FIELDS.SORT_RATING_DESC;

    case SORT_OPTIONS.NOT_POPULAR:
      return DB_FIELDS.SORT_RATING_ASC;

    case SORT_OPTIONS.ALL:
    case SORT_OPTIONS.A_Z:
    default:
      return nameAscField;
  }
};

export const getPsychologistPriceFilter = (sort: SortOption) =>
  SORT_CONFIG[sort].filter;
