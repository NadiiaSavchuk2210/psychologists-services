import {
  PRICE_LIMITS,
  SORT_OPTIONS,
} from '@shared/constants/psychologist-sort';
import { DB_FIELDS } from '@shared/constants/psychologist-api';
import type { SortConfig, SortOption } from '../types/psychologist-sort';

export const SORT_CONFIG: Record<SortOption, SortConfig> = {
  [SORT_OPTIONS.ALL]: {
    labelKey: 'all',
    field: DB_FIELDS.SORT_NAME_EN,
    order: 'asc',
  },
  [SORT_OPTIONS.A_Z]: {
    labelKey: 'a_z',
    field: DB_FIELDS.SORT_NAME_EN,
    order: 'asc',
  },
  [SORT_OPTIONS.Z_A]: {
    labelKey: 'z_a',
    field: DB_FIELDS.SORT_NAME_UA,
    order: 'desc',
  },
  [SORT_OPTIONS.POPULAR]: {
    labelKey: 'popular',
    field: DB_FIELDS.SORT_RATING_DESC,
    order: 'asc',
  },
  [SORT_OPTIONS.NOT_POPULAR]: {
    labelKey: 'not_popular',
    field: DB_FIELDS.SORT_RATING_ASC,
    order: 'asc',
  },
  [SORT_OPTIONS.CHEAP]: {
    labelKey: 'cheap',
    field: DB_FIELDS.SORT_PRICE_ASC,
    order: 'asc',
    filter: (price: number) => price < PRICE_LIMITS.EXPENSIVE_MIN,
  },
  [SORT_OPTIONS.EXPENSIVE]: {
    labelKey: 'expensive',
    field: DB_FIELDS.SORT_PRICE_ASC,
    order: 'desc',
    filter: (price: number) => price >= PRICE_LIMITS.EXPENSIVE_MIN,
  },
};
