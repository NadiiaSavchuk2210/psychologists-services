import {
  ref,
  get,
  query,
  orderByChild,
  startAfter,
  limitToFirst,
  endBefore,
  limitToLast,
  endAt,
  startAt,
} from 'firebase/database';
import { db } from '../../../shared/lib/firebase/database';
import type {
  Psychologist,
  PsychologistDTO,
  SortOption,
  CursorData,
  SortableKeys,
} from './types/psychologist';
import {
  DB_FIELDS,
  PRICE_LIMITS,
  SORT_OPTIONS,
  SORT_FIELD_MAP,
  DB_PATHS,
} from '../../../shared/constants/psychologist';

export const fetchPsychologists = async ({
  sort,
  pageSize,
  cursor,
}: {
  sort: SortOption;
  pageSize: number;
  cursor: CursorData | null;
}) => {
  const dbRef = ref(db, DB_PATHS.PSYCHOLOGISTS);
  const sortField = SORT_FIELD_MAP[sort] as SortableKeys;

  const isDescending =
    sort === SORT_OPTIONS.Z_A || sort === SORT_OPTIONS.POPULAR;
  const isPriceFilter =
    sort === SORT_OPTIONS.CHEAP || sort === SORT_OPTIONS.EXPENSIVE;

  let apiQuery;

  if (isPriceFilter) {
    const isCheap = sort === SORT_OPTIONS.CHEAP;
    apiQuery = query(
      dbRef,
      orderByChild(DB_FIELDS.PRICE),
      cursor
        ? startAfter(cursor.value, cursor.id)
        : isCheap
          ? endAt(PRICE_LIMITS.CHEAP_MAX)
          : startAt(PRICE_LIMITS.EXPENSIVE_MIN),
      limitToFirst(pageSize)
    );
  } else if (isDescending) {
    apiQuery = query(
      dbRef,
      orderByChild(sortField),
      ...(cursor ? [endBefore(cursor.value, cursor.id)] : []),
      limitToLast(pageSize)
    );
  } else {
    apiQuery = query(
      dbRef,
      orderByChild(sortField),
      ...(cursor ? [startAfter(cursor.value, cursor.id)] : []),
      limitToFirst(pageSize)
    );
  }

  const snapshot = await get(apiQuery);
  const items: Psychologist[] = [];

  snapshot.forEach(child => {
    items.push({ ...(child.val() as PsychologistDTO), id: child.key! });
  });

  if (isDescending) {
    items.reverse();
  }

  let nextCursor: CursorData | null = null;
  if (items.length === pageSize) {
    const lastItem = items[items.length - 1];
    const currentSortField = isPriceFilter ? DB_FIELDS.PRICE : sortField;
    const value = lastItem[currentSortField as keyof Psychologist];

    if (typeof value === 'string' || typeof value === 'number') {
      nextCursor = { value, id: lastItem.id };
    }
  }

  return { items, nextCursor, hasMore: !!nextCursor };
};
