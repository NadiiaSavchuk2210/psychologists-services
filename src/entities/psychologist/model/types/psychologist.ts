export type Lang = 'en' | 'ua';

export interface ReviewDTO {
  reviewer: string;
  reviewer_ua: string;
  rating: number;
  comment: Record<Lang, string>;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface PsychologistDTO {
  id: string;
  name: string;
  name_ua: string;
  avatar_url: string;
  experience: string;
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  specialization_ua: string;
  about: string;
  about_ua: string;
  initial_consultation: string;
  reviews: ReviewDTO[];
}

export interface Psychologist {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  about: string;
  initial_consultation: string;
  reviews: Review[];
}

// API & Sorting

export type CursorValue = string | number;

export interface CursorData {
  value: CursorValue;
  id: string;
}

export interface FetchResponseDTO {
  items: PsychologistDTO[];
  nextCursor: CursorData | null;
  hasMore: boolean;
}

export interface FetchResponse {
  items: Psychologist[];
  nextCursor: CursorData | null;
}

export type SortOption =
  | 'A to Z'
  | 'Z to A'
  | 'Less than 10$'
  | 'Greater than 10$'
  | 'Popular'
  | 'Not popular'
  | 'Show all';

export type SortableKeys = 'name' | 'name_ua' | 'rating' | 'price_per_hour';
