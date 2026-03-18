export const DB_PATHS = {
  PSYCHOLOGISTS: 'psychologists',
} as const;

export const DB_FIELDS = {
  NAME: 'name',
  NAME_UA: 'name_ua',
  PRICE: 'price_per_hour',
  RATING: 'rating',
  SORT_NAME_EN: 'sort_name_en',
  SORT_NAME_UA: 'sort_name_ua',
  SORT_PRICE_ASC: 'sort_price_asc',
  SORT_PRICE_DESC: 'sort_price_desc',
  SORT_RATING_DESC: 'sort_rating_desc',
  SORT_RATING_ASC: 'sort_rating_asc',
} as const;

export const PSYCHOLOGISTS_PER_PAGE = 3;
