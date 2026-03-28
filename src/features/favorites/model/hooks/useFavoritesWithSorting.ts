import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { SortOption } from '@entities/psychologist';
import { sortPsychologistsBySort } from '@entities/psychologist/model/lib/psychologistSort';
import { mapPsychologist } from '@entities/psychologist/utils/mapPsychologist';
import type { Lang } from '@shared/lib/i18n';
import { getLang } from '@shared/utils';

import { useFavorites } from './useFavorites';

export const useFavoritesWithSorting = (sort: SortOption) => {
  const { favorites = [], isLoading, error } = useFavorites();
  const { i18n } = useTranslation();

  const lang: Lang = getLang(i18n);

  const sorted = useMemo(() => {
    if (!favorites.length) return [];

    const localized = favorites.map(p => mapPsychologist(p, lang));

    return sortPsychologistsBySort(localized, sort, lang);
  }, [favorites, sort, lang]);

  return { sorted, isLoading, error };
};
