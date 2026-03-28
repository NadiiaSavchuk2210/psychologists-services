import { normalizePsychologist } from '../../utils/normalizePsychologist';
import type { PsychologistServerSortField } from '../lib/psychologistSort';
import type { Psychologist } from '../types/psychologist';
import type { CursorData, FetchResponseDTO } from '../types/psychologist-api';

type Entry = readonly [string, unknown];

export type ServerSortedPsychologist = {
  item: Psychologist;
  sortValue: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const toEntries = (data: unknown): Entry[] => {
  if (Array.isArray(data)) {
    return Array.from(data.entries()).map(([index, value]) => [String(index), value] as const);
  }

  if (isRecord(data)) {
    return Object.entries(data);
  }

  return [];
};

export const getStartIndex = (cursor: CursorData | null) => {
  if (!cursor) {
    return 0;
  }

  const startIndex = Number(cursor.value);

  return Number.isFinite(startIndex) && startIndex >= 0 ? startIndex : 0;
};

export const buildResponse = (
  items: Psychologist[],
  nextCursor: CursorData | null,
  hasMore: boolean
): FetchResponseDTO => ({
  items,
  nextCursor,
  hasMore,
});

export const getNormalizedPsychologists = (data: unknown) =>
  toEntries(data)
    .map(([key, value]) => normalizePsychologist(value, key))
    .filter((item): item is Psychologist => item !== null);

export const getNextOffsetCursor = (
  items: Psychologist[],
  endIndex: number,
  hasMore: boolean
): CursorData | null => {
  const last = items[items.length - 1];

  return hasMore && last
    ? {
        id: last.id,
        value: endIndex,
      }
    : null;
};

const getServerSortValue = (
  value: unknown,
  field: PsychologistServerSortField
) => {
  if (!isRecord(value)) {
    return null;
  }

  const sortValue = value[field];

  return typeof sortValue === 'string' ? sortValue : null;
};

export const getServerSortedPsychologists = (
  data: unknown,
  field: PsychologistServerSortField
): ServerSortedPsychologist[] | null => {
  const entries = toEntries(data);

  if (!entries.length) {
    return [];
  }

  const normalized = entries
    .map(([key, value]) => {
      const item = normalizePsychologist(value, key);
      const sortValue = getServerSortValue(value, field);

      return item && sortValue
        ? {
            item,
            sortValue,
          }
        : null;
    })
    .filter((item): item is ServerSortedPsychologist => item !== null);

  if (normalized.length !== entries.length) {
    return null;
  }

  return normalized.sort((left, right) => left.sortValue.localeCompare(right.sortValue));
};

export const getNextServerCursor = (
  items: ServerSortedPsychologist[],
  hasMore: boolean
): CursorData | null => {
  const last = items[items.length - 1];

  return hasMore && last
    ? {
        id: last.item.id,
        value: last.sortValue,
      }
    : null;
};
