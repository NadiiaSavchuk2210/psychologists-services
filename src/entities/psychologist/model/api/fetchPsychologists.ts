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
import { DB_FIELDS, DB_PATHS } from '@shared/constants/psychologist-api';
import { SORT_OPTIONS } from '@shared/constants/psychologist-sort';
import { SORT_CONFIG } from '../config/sortConfig';
import type { SortOption } from '../types/psychologist-sort';
import type { CursorData, FetchResponseDTO } from '../types/psychologist-api';
import type { PsychologistDTO } from '../types/psychologist';

export const fetchPsychologists = async ({
  sort,
  pageSize,
  cursor,
  lang,
}: {
  sort: string;
  pageSize: number;
  cursor: CursorData | null;
  lang: 'en' | 'ua';
}): Promise<FetchResponseDTO> => {
  const config = SORT_CONFIG[sort as SortOption];
  if (!config) throw new Error(`Unknown sort option: ${sort}`);

  let sortField = config.field;

  if (
    sort === SORT_OPTIONS.A_Z ||
    sort === SORT_OPTIONS.Z_A ||
    sort === SORT_OPTIONS.ALL
  ) {
    sortField = lang === 'ua' ? DB_FIELDS.SORT_NAME_UA : DB_FIELDS.SORT_NAME_EN;
  }

  const isDescending = config.order === 'desc';
  const dbRef = ref(db, DB_PATHS.PSYCHOLOGISTS);

  const fetchLimit = config.filter ? pageSize * 5 : pageSize;

  let apiQuery;
  if (isDescending) {
    apiQuery = query(
      dbRef,
      orderByChild(sortField),
      ...(cursor ? [endBefore(cursor.value, cursor.id)] : []),
      limitToLast(fetchLimit)
    );
  } else {
    apiQuery = query(
      dbRef,
      orderByChild(sortField),
      ...(cursor ? [startAfter(cursor.value, cursor.id)] : []),
      limitToFirst(fetchLimit)
    );
  }

  const snapshot = await get(apiQuery);
  const rawItems: PsychologistDTO[] = [];

  snapshot.forEach(child => {
    rawItems.push({ ...(child.val() as PsychologistDTO), id: child.key! });
  });

  if (isDescending) rawItems.reverse();

  const filteredItems = config.filter
    ? rawItems.filter(item => config.filter!(item.price_per_hour))
    : rawItems;

  const resultItems = filteredItems.slice(0, pageSize);

  let nextCursor: CursorData | null = null;
  if (rawItems.length >= fetchLimit) {
    const lastRawItem = rawItems[rawItems.length - 1];
    const cursorValue = lastRawItem[sortField as keyof PsychologistDTO];

    if (cursorValue !== undefined) {
      nextCursor = {
        value: cursorValue as string | number,
        id: lastRawItem.id,
      };
    }
  }

  return {
    items: resultItems,
    nextCursor,
    hasMore: !!nextCursor,
  };
};
