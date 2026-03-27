import type { SortOption } from '@entities/psychologist';

export const PRICE_LIMITS = {
  CHEAP_MAX: 9.99,
  EXPENSIVE_MIN: 10,
} as const;

export const SORT_OPTIONS = {
  ALL: 'ALL',
  A_Z: 'A_Z',
  Z_A: 'Z_A',
  PRICE_LOW_HIGH: 'PRICE_LOW_HIGH',
  PRICE_HIGH_LOW: 'PRICE_HIGH_LOW',
  CHEAP: 'CHEAP',
  EXPENSIVE: 'EXPENSIVE',
  POPULAR: 'POPULAR',
  NOT_POPULAR: 'NOT_POPULAR',
} as const;

export const DEFAULT_SORT_OPTION: SortOption = SORT_OPTIONS.A_Z;
