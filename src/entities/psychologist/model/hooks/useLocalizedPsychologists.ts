import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePsychologistsInfinite } from './usePsychologistsInfinite';
import { mapPsychologist } from '@entities/psychologist/utils/mapPsychologist';
import type { Lang } from '@shared/lib/i18n';
import type { SortOption } from '../types/psychologist-sort';
import { getLang } from '@shared/utils';

export const useLocalizedPsychologists = (sort: SortOption) => {
  const { i18n } = useTranslation();

  const query = usePsychologistsInfinite(sort);

  const lang: Lang = getLang(i18n);

  const localizedData = useMemo(() => {
    if (!query.data) return undefined;

    return {
      ...query.data,
      pages: query.data.pages.map(page => ({
        ...page,
        items: page.items.map(dto => mapPsychologist(dto, lang)),
      })),
    };
  }, [query.data, lang]);

  return {
    ...query,
    data: localizedData,
  };
};
