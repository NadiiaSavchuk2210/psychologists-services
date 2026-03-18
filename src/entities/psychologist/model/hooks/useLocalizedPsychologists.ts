import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePsychologistsInfinite } from './usePsychologistsInfinite';
import { mapPsychologist } from '@entities/psychologist/utils/mapPsychologist';
import type { Lang } from '@shared/lib/i18n';
import type { SortOption } from '../types/psychologist-sort';

export const useLocalizedPsychologists = (sort: SortOption) => {
  const { i18n } = useTranslation();
  const query = usePsychologistsInfinite(sort);

  const lang: Lang =
    i18n.language.startsWith('uk') || i18n.language.startsWith('ua')
      ? 'ua'
      : 'en';

  const localizedData = useMemo(() => {
    if (!query.data) return undefined;

    return {
      ...query.data,
      pages: query.data.pages.map(page => ({
        ...page,
        items: page.items.map(dto => mapPsychologist(dto, lang)),
      })),
    };
  }, [query.data, i18n.language, lang]);

  return {
    ...query,
    data: localizedData,
  };
};
