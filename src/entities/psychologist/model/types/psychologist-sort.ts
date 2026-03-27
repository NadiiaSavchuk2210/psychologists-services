import type { SORT_OPTIONS } from '@shared/constants/psychologist-sort';
import type { IFiltersTranslations } from '@shared/lib/i18n';

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export type SortField = 'name' | 'rating' | 'price';

export type SortConfig = {
  labelKey: keyof IFiltersTranslations;
  order?: 'asc' | 'desc';
  filter?: (value: number) => boolean;
};
