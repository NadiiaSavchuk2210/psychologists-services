import { getFirebaseRtdb } from '@shared/api/firebaseRtdb';
import { DB_PATHS } from '@shared/constants';
import type { Lang } from '@shared/lib/i18n';

import {
  buildResponse,
  getNextOffsetCursor,
  getNextServerCursor,
  getNormalizedPsychologists,
  getServerSortedPsychologists,
  getStartIndex,
} from './fetchPsychologists.helpers';
import {
  filterPsychologistsBySort,
  getPsychologistPriceFilter,
  getPsychologistServerSortField,
  sortPsychologistsBySort,
  type PsychologistServerSortField,
} from '../lib/psychologistSort';
import type { CursorData, FetchResponseDTO } from '../types/psychologist-api';
import type { SortOption } from '../types/psychologist-sort';

const PSYCHOLOGISTS_PATH = DB_PATHS.PSYCHOLOGISTS;

const getServerPaginationParams = (
  cursor: CursorData | null,
  pageSize: number,
  sortField: PsychologistServerSortField
) => ({
  orderBy: JSON.stringify(sortField),
  ...(cursor ? { startAfter: JSON.stringify(cursor.value) } : {}),
  limitToFirst: String(pageSize + 1),
});

const fetchAllPsychologists = async (
  sort: SortOption,
  pageSize: number,
  cursor: CursorData | null,
  lang: Lang
): Promise<FetchResponseDTO> => {
  const { data } = await getFirebaseRtdb<unknown>(PSYCHOLOGISTS_PATH);
  const normalized = getNormalizedPsychologists(data);
  const sorted = sortPsychologistsBySort(
    filterPsychologistsBySort(normalized, sort),
    sort,
    lang
  );

  const startIndex = getStartIndex(cursor);
  const endIndex = startIndex + pageSize;
  const items = sorted.slice(startIndex, endIndex);
  const hasMore = endIndex < sorted.length;

  return buildResponse(items, getNextOffsetCursor(items, endIndex, hasMore), hasMore);
};

const fetchServerPaginatedPsychologists = async (
  sort: SortOption,
  pageSize: number,
  cursor: CursorData | null,
  lang: Lang
): Promise<FetchResponseDTO | null> => {
  const serverSortField = getPsychologistServerSortField(sort, lang);
  const { data, status } = await getFirebaseRtdb<unknown>(
    PSYCHOLOGISTS_PATH,
    getServerPaginationParams(cursor, pageSize, serverSortField),
    status => status === 200 || status === 400
  );

  if (status === 400) {
    return null;
  }

  const normalized = getServerSortedPsychologists(data, serverSortField);

  if (normalized === null) {
    return null;
  }

  const priceFilter = getPsychologistPriceFilter(sort);
  const filtered = priceFilter
    ? normalized.filter(({ item }) => priceFilter(item.price_per_hour))
    : normalized;
  const hasMore = filtered.length > pageSize;
  const visible = hasMore ? filtered.slice(0, pageSize) : filtered;

  return buildResponse(
    visible.map(({ item }) => item),
    getNextServerCursor(visible, hasMore),
    hasMore
  );
};

export const fetchPsychologists = async ({
  sort,
  pageSize,
  cursor,
  lang,
}: {
  sort: SortOption;
  pageSize: number;
  cursor: CursorData | null;
  lang: Lang;
}): Promise<FetchResponseDTO> => {
  const paginated = await fetchServerPaginatedPsychologists(
    sort,
    pageSize,
    cursor,
    lang
  );

  if (paginated) {
    return paginated;
  }

  return fetchAllPsychologists(sort, pageSize, cursor, lang);
};
