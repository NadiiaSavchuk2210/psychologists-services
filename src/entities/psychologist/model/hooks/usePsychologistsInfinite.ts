import {
  useInfiniteQuery,
  keepPreviousData,
  type InfiniteData,
} from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { PSYCHOLOGISTS_PER_PAGE, TIME } from '@shared/constants';
import type { Lang } from '@shared/lib/i18n';
import { getLang } from '@shared/utils';

import { fetchPsychologists } from '../api/fetchPsychologists';
import type { CursorData, FetchResponseDTO } from '../types/psychologist-api';
import type { SortOption } from '../types/psychologist-sort';

export function usePsychologistsInfinite(
  sort: SortOption,
  pageSize: number = PSYCHOLOGISTS_PER_PAGE
) {
  const { i18n } = useTranslation();

  const lang: Lang = getLang(i18n);

  return useInfiniteQuery<
    FetchResponseDTO,
    Error,
    InfiniteData<FetchResponseDTO>,
    [string, SortOption, number, string],
    CursorData | null
  >({
    queryKey: ['psychologists', sort, pageSize, lang],

    queryFn: ({ pageParam }) =>
      fetchPsychologists({
        sort,
        pageSize,
        cursor: pageParam,
        lang,
      }),

    initialPageParam: null,
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
    staleTime: TIME.MINUTE * 5,
  });
}
