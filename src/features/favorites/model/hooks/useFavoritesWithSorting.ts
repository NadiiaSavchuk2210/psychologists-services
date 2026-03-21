import { SORT_OPTIONS } from '@shared/constants/psychologist-sort';
import { useTranslation } from 'react-i18next';
import { useFavorites } from './useFavorites';
import type { SortOption } from '@entities/psychologist';
import { useMemo } from 'react';
import type { Lang } from '@shared/lib/i18n';
import { mapPsychologist } from '../../../../entities/psychologist/utils/mapPsychologist';
import { getLang } from '@shared/utils';

export const useFavoritesWithSorting = (sort: SortOption) => {
  const { favorites = [], isLoading, error } = useFavorites();
  const { i18n } = useTranslation();

  const lang: Lang = getLang(i18n);

  const sorted = useMemo(() => {
    if (!favorites.length) return [];

    const localized = favorites.map(p => mapPsychologist(p, lang));

    return [...localized].sort((a, b) => {
      switch (sort) {
        case SORT_OPTIONS.POPULAR:
          return b.rating - a.rating;

        case SORT_OPTIONS.NOT_POPULAR:
          return a.rating - b.rating;

        case SORT_OPTIONS.CHEAP:
          return a.price_per_hour - b.price_per_hour;

        case SORT_OPTIONS.EXPENSIVE:
          return b.price_per_hour - a.price_per_hour;

        case SORT_OPTIONS.A_Z:
          return a.name.localeCompare(b.name, lang);

        case SORT_OPTIONS.Z_A:
          return b.name.localeCompare(a.name, lang);

        default:
          return 0;
      }
    });
  }, [favorites, sort, lang]);

  return { sorted, isLoading, error };
};
