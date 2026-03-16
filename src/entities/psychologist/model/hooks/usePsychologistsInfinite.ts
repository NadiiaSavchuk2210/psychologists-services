import {
  useInfiniteQuery,
  keepPreviousData,
  type InfiniteData,
} from '@tanstack/react-query';

import { fetchPsychologists } from '../api/fetchPsychologists';

import { PSYCHOLOGISTS_PER_PAGE } from '@shared/constants/psychologist';
import { TIME } from '@shared/constants/time';

import type {
  CursorData,
  FetchResponseDTO,
  SortOption,
} from '../types/psychologist';

export function usePsychologistsInfinite(
  sort: SortOption,
  pageSize: number = PSYCHOLOGISTS_PER_PAGE
) {
  return useInfiniteQuery<
    FetchResponseDTO,
    Error,
    InfiniteData<FetchResponseDTO>,
    [string, SortOption, number],
    CursorData | null
  >({
    queryKey: ['psychologists', sort, pageSize],

    queryFn: ({ pageParam }) =>
      fetchPsychologists({
        sort,
        pageSize,
        cursor: pageParam,
      }),

    initialPageParam: null,

    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,

    placeholderData: keepPreviousData,

    staleTime: TIME.MINUTE * 5,
  });
}
