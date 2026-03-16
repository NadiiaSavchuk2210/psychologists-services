import {
  ref,
  get,
  query,
  orderByChild,
  startAfter,
  limitToFirst,
  endBefore,
  limitToLast,
} from 'firebase/database';

import { db } from '@shared/lib/config/firebase/database';

import {
  DB_PATHS,
  SORT_FIELD_MAP,
  SORT_OPTIONS,
} from '@shared/constants/psychologist';
import type {
  CursorData,
  FetchResponseDTO,
  PsychologistDTO,
} from '../types/psychologist';

export const fetchPsychologists = async ({
  sort,
  pageSize,
  cursor,
}: {
  sort: string;
  pageSize: number;
  cursor: CursorData | null;
}): Promise<FetchResponseDTO> => {
  const dbRef = ref(db, DB_PATHS.PSYCHOLOGISTS);
  const sortField = SORT_FIELD_MAP[sort];

  const isDescending =
    sort === SORT_OPTIONS.Z_A || sort === SORT_OPTIONS.POPULAR;

  let apiQuery;

  if (isDescending) {
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

  const items: PsychologistDTO[] = [];

  snapshot.forEach(child => {
    items.push({
      ...(child.val() as PsychologistDTO),
      id: child.key!,
    });
  });

  if (isDescending) items.reverse();

  let nextCursor: CursorData | null = null;

  if (items.length === pageSize) {
    const lastItem = items[items.length - 1];
    const value = lastItem[sortField as keyof PsychologistDTO];

    if (typeof value === 'string' || typeof value === 'number') {
      nextCursor = { value, id: lastItem.id! };
    }
  }

  return {
    items,
    nextCursor,
    hasMore: !!nextCursor,
  };
};
