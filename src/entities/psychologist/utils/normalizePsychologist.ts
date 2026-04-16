import { getOptimizedAvatarUrl } from './getOptimizedAvatarUrl';
import type { Psychologist } from '../model/types/psychologist';
import type { Review } from '../model/types/psychologist-review';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isString = (value: unknown): value is string => typeof value === 'string';

const isNumber = (value: unknown): value is number => typeof value === 'number';

const isReview = (value: unknown): value is Review => {
  if (!isRecord(value)) return false;

  return (
    isString(value.reviewer) &&
    isString(value.reviewer_ua) &&
    isNumber(value.rating) &&
    isString(value.comment) &&
    isString(value.comment_ua)
  );
};

export const normalizePsychologist = (
  value: unknown,
  fallbackId: string
): Psychologist | null => {
  if (!isRecord(value)) return null;

  if (
    !isString(value.name) ||
    !isString(value.name_ua) ||
    !isString(value.avatar_url) ||
    !isString(value.experience) ||
    !isNumber(value.price_per_hour) ||
    !isNumber(value.rating) ||
    !isString(value.license) ||
    !isString(value.specialization) ||
    !isString(value.specialization_ua) ||
    !isString(value.about) ||
    !isString(value.about_ua) ||
    !isString(value.initial_consultation) ||
    !Array.isArray(value.reviews) ||
    !value.reviews.every(isReview)
  ) {
    return null;
  }

  return {
    id: String(value.id ?? fallbackId),
    name: value.name,
    name_ua: value.name_ua,
    avatar_url: getOptimizedAvatarUrl(value.avatar_url),
    experience: value.experience,
    price_per_hour: value.price_per_hour,
    rating: value.rating,
    license: value.license,
    specialization: value.specialization,
    specialization_ua: value.specialization_ua,
    about: value.about,
    about_ua: value.about_ua,
    initial_consultation: value.initial_consultation,
    reviews: value.reviews,
  };
};
