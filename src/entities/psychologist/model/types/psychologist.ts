import type { Review, ReviewUI } from './psychologist-review';

export interface Psychologist {
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
  reviews: Review[];
}

export interface PsychologistUI extends Psychologist {
  displayName: string;
  displayExperience: string;
  displaySpecialization: string;
  displayAbout: string;
  displayInitialConsultation: string;
  displayReviews: ReviewUI[];
}
