import { useMemo } from 'react';

import { filterPsychologistsBySort } from '../lib/psychologistSort';
import type { SortOption } from '../types/psychologist-sort';

type WithPrice = {
  price_per_hour: number;
};

export const useFilteredPsychologistsBySort = <T extends WithPrice>(
  items: T[],
  sort: SortOption
) => {
  return useMemo(() => filterPsychologistsBySort(items, sort), [items, sort]);
};
