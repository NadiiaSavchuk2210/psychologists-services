import { useMemo } from 'react';

import { SORT_CONFIG } from '../config/sortConfig';
import type { SortOption } from '../types/psychologist-sort';

type WithPrice = {
  price_per_hour: number;
};

export const useFilteredPsychologistsBySort = <T extends WithPrice>(
  items: T[],
  sort: SortOption
) => {
  return useMemo(() => {
    const filter = SORT_CONFIG[sort].filter;

    return filter
      ? items.filter(item => filter(item.price_per_hour))
      : items;
  }, [items, sort]);
};
