import type { SortOption } from '@entities/psychologist';
import { DB_FIELDS } from './psychologist-api';

export const PRICE_LIMITS = {
  CHEAP_MAX: 9.99,
  EXPENSIVE_MIN: 10,
} as const;

export const SORT_OPTIONS = {
  ALL: 'Show all',
  A_Z: 'A to Z',
  Z_A: 'Z to A',
  CHEAP: 'Less than 10$',
  EXPENSIVE: 'Greater than 10$',
  POPULAR: 'Popular',
  NOT_POPULAR: 'Not popular',
} as const;

export const SORT_FIELD_MAP: Record<string, string> = {
  [SORT_OPTIONS.ALL]: DB_FIELDS.NAME,
  [SORT_OPTIONS.A_Z]: 'sort_name_en',
  [SORT_OPTIONS.Z_A]: 'sort_name_ua',
  [SORT_OPTIONS.CHEAP]: 'sort_price_asc',
  [SORT_OPTIONS.EXPENSIVE]: 'sort_price_asc',
  [SORT_OPTIONS.POPULAR]: 'sort_rating_desc',
  [SORT_OPTIONS.NOT_POPULAR]: 'sort_rating_asc',
};

export const DEFAULT_SORT_OPTION: SortOption = SORT_OPTIONS.A_Z;
