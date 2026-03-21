import { SORT_OPTIONS } from '@shared/constants/psychologist-sort';
import type { Psychologist } from '../types/psychologist';
import type { CursorData, FetchResponseDTO } from '../types/psychologist-api';
import type { SortOption } from '../types/psychologist-sort';
import { rtdb } from '@shared/lib/config/firebase/database';
import { DB_PATHS } from '@shared/constants/psychologist-api';
import {
  query,
  orderByChild,
  startAfter,
  endBefore,
  limitToFirst,
  limitToLast,
  get,
  ref,
} from 'firebase/database';

export const fetchPsychologists = async ({
  sort,
  pageSize,
  cursor,
  lang,
}: {
  sort: SortOption;
  pageSize: number;
  cursor: CursorData | null;
  lang: 'en' | 'ua';
}): Promise<FetchResponseDTO> => {
  const dbRef = ref(rtdb, DB_PATHS.PSYCHOLOGISTS);

  let sortField = lang === 'ua' ? 'name_ua' : 'name';
  let isDesc = false;

  switch (sort) {
    case SORT_OPTIONS.POPULAR:
      sortField = 'rating';
      isDesc = true;
      break;

    case SORT_OPTIONS.NOT_POPULAR:
      sortField = 'rating';
      break;

    case SORT_OPTIONS.CHEAP:
      sortField = 'price_per_hour';
      break;

    case SORT_OPTIONS.EXPENSIVE:
      sortField = 'price_per_hour';
      isDesc = true;
      break;

    case SORT_OPTIONS.A_Z:
      sortField = lang === 'ua' ? 'name_ua' : 'name';
      break;

    case SORT_OPTIONS.Z_A:
      sortField = lang === 'ua' ? 'name_ua' : 'name';
      isDesc = true;
      break;
  }

  let apiQuery;

  if (!isDesc) {
    apiQuery = query(
      dbRef,
      orderByChild(sortField),
      ...(cursor ? [startAfter(cursor.value, cursor.id)] : []),
      limitToFirst(pageSize)
    );
  } else {
    apiQuery = query(
      dbRef,
      orderByChild(sortField),
      ...(cursor ? [endBefore(cursor.value, cursor.id)] : []),
      limitToLast(pageSize)
    );
  }

  const snapshot = await get(apiQuery);

  const items: Psychologist[] = [];

  snapshot.forEach(child => {
    items.push({
      ...(child.val() as Psychologist),
      id: child.key!,
    });
  });

  if (isDesc) items.reverse();

  const last = items[items.length - 1];

  const nextCursor = last
    ? {
        id: last.id,
        value: last[sortField as keyof Psychologist] as string | number,
      }
    : null;

  return {
    items,
    nextCursor,
    hasMore: items.length >= pageSize,
  };
};
