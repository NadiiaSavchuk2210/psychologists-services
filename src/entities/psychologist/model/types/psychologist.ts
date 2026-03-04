export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface PsychologistDTO {
  name: string;
  avatar_url: string;
  experience: string;
  reviews: Review[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
}

export interface Psychologist extends PsychologistDTO {
  id: string;
}

export interface CursorData {
  value: CursorValue;
  id: string;
}

export interface FetchResponse {
  items: Psychologist[];
  nextCursor: CursorData | null;
}

export type CursorValue = string | number;

export type SortOption =
  | 'A to Z'
  | 'Z to A'
  | 'Less than 10$'
  | 'Greater than 10$'
  | 'Popular'
  | 'Not popular'
  | 'Show all';

export type SortableKeys = 'name' | 'rating' | 'price_per_hour';
