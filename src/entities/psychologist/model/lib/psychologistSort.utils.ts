import type { Lang } from '@shared/lib/i18n';

import {
  getPsychologistPriceFilter,
  getPsychologistSortMeta,
} from './psychologistSort.meta';
import type { SortablePsychologist } from './psychologistSort.types';
import type { SortOption } from '../types/psychologist-sort';

export const filterPsychologistsBySort = <T extends { price_per_hour: number }>(
  items: T[],
  sort: SortOption
) => {
  const filter = getPsychologistPriceFilter(sort);

  return filter ? items.filter(item => filter(item.price_per_hour)) : items;
};

export const sortPsychologistsBySort = <T extends SortablePsychologist>(
  items: T[],
  sort: SortOption,
  lang: Lang
) => {
  const { sortField, isDesc } = getPsychologistSortMeta(sort, lang);

  return [...items].sort((a, b) => {
    const left = a[sortField];
    const right = b[sortField];

    if (typeof left === 'string' && typeof right === 'string') {
      return isDesc
        ? right.localeCompare(left, lang)
        : left.localeCompare(right, lang);
    }

    if (typeof left === 'number' && typeof right === 'number') {
      return isDesc ? right - left : left - right;
    }

    return 0;
  });
};
