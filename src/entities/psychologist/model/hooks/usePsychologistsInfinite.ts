import { useTranslation } from 'react-i18next';
import {
  useInfiniteQuery,
  keepPreviousData,
  type InfiniteData,
} from '@tanstack/react-query';

import { fetchPsychologists } from '../api/fetchPsychologists';
import { PSYCHOLOGISTS_PER_PAGE } from '@shared/constants/psychologist-api';
import { TIME } from '@shared/constants/time';

import type { SortOption } from '../types/psychologist-sort';
import type { CursorData, FetchResponseDTO } from '../types/psychologist-api';

export function usePsychologistsInfinite(
  sort: SortOption,
  pageSize: number = PSYCHOLOGISTS_PER_PAGE
) {
  const { i18n } = useTranslation();

  const lang =
    i18n.language.startsWith('uk') || i18n.language.startsWith('ua')
      ? 'ua'
      : 'en';

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
