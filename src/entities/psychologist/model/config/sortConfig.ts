import { PRICE_LIMITS, SORT_OPTIONS } from '@shared/constants';

import type { SortConfig, SortOption } from '../types/psychologist-sort';

export const SORT_CONFIG: Record<SortOption, SortConfig> = {
  [SORT_OPTIONS.ALL]: {
    labelKey: 'all',
    order: 'asc',
  },
  [SORT_OPTIONS.A_Z]: {
    labelKey: 'a_z',
    order: 'asc',
  },
  [SORT_OPTIONS.Z_A]: {
    labelKey: 'z_a',
    order: 'desc',
  },
  [SORT_OPTIONS.POPULAR]: {
    labelKey: 'popular',
    order: 'asc',
  },
  [SORT_OPTIONS.NOT_POPULAR]: {
    labelKey: 'not_popular',
    order: 'desc',
  },
  [SORT_OPTIONS.CHEAP]: {
    labelKey: 'cheap',
    order: 'asc',
    filter: (price: number) => price < PRICE_LIMITS.EXPENSIVE_MIN,
  },
  [SORT_OPTIONS.EXPENSIVE]: {
    labelKey: 'expensive',
    order: 'desc',
    filter: (price: number) => price > PRICE_LIMITS.EXPENSIVE_MIN,
  },
};
