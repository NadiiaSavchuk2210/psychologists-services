import type { Psychologist } from './psychologist';

export type CursorValue = string | number;

export interface CursorData {
  id: string;
  value: CursorValue;
}

export interface FetchResponseDTO {
  items: Psychologist[];
  nextCursor: CursorData | null;
  hasMore: boolean;
}

export interface FetchResponse {
  items: Psychologist[];
  nextCursor: CursorData | null;
}
