import type { Review, ReviewDTO } from './psychologist-review';

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
