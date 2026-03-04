import {
  keepPreviousData,
  useInfiniteQuery,
  type InfiniteData,
} from '@tanstack/react-query';
import type {
  SortOption,
  FetchResponse,
  CursorData,
} from '../types/psychologist';
import { fetchPsychologists } from '../api';
import { TIME } from '../../../../shared/constants/time';
import { PSYCHOLOGISTS_PER_PAGE } from '../../../../shared/constants/psychologist';

export function usePsychologistsInfinite(
  sort: SortOption,
  pageSize: number = PSYCHOLOGISTS_PER_PAGE
) {
  return useInfiniteQuery<
    FetchResponse,
    Error,
    InfiniteData<FetchResponse>,
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
