import type { Lang } from '@shared/lib/i18n';

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
