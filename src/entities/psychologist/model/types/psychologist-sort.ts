import type { SORT_OPTIONS } from '@shared/constants/psychologist-sort';
import type { IFiltersTranslations } from '@shared/lib/i18n';

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export type SortableKeys =
  | 'name'
  | 'name_ua'
  | 'rating'
  | 'price_per_hour'
  | 'sort_name_en'
  | 'sort_name_ua'
  | 'sort_price_asc'
  | 'sort_price_desc'
  | 'sort_rating_desc'
  | 'sort_rating_asc';

export type SortConfig = {
  labelKey: keyof IFiltersTranslations;
  field: SortableKeys;
  order?: 'asc' | 'desc';
  filter?: (value: any) => boolean;
};
