export const DB_PATHS = {
  PSYCHOLOGISTS: 'psychologists',
} as const;

export const DB_FIELDS = {
  PRICE: 'price_per_hour',
  RATING: 'rating',
  NAME: 'name',
} as const;

export const PRICE_LIMITS = {
  CHEAP_MAX: 9.99,
  EXPENSIVE_MIN: 10,
} as const;

export const SORT_OPTIONS = {
  ALL: 'Show all',
  A_Z: 'A to Z',
  Z_A: 'Z to A',
  CHEAP: 'Less than 10$',
  EXPENSIVE: 'Greater than 10$',
  POPULAR: 'Popular',
  NOT_POPULAR: 'Not popular',
} as const;

export const SORT_FIELD_MAP: Record<string, string> = {
  [SORT_OPTIONS.ALL]: DB_FIELDS.NAME,
  [SORT_OPTIONS.A_Z]: DB_FIELDS.NAME,
  [SORT_OPTIONS.Z_A]: DB_FIELDS.NAME,
  [SORT_OPTIONS.POPULAR]: DB_FIELDS.RATING,
  [SORT_OPTIONS.NOT_POPULAR]: DB_FIELDS.RATING,
  [SORT_OPTIONS.CHEAP]: DB_FIELDS.PRICE,
  [SORT_OPTIONS.EXPENSIVE]: DB_FIELDS.PRICE,
};

export const PSYCHOLOGISTS_PER_PAGE = 3;
