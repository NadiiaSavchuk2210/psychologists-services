import { DB_FIELDS } from '@shared/constants';

export type SortablePsychologist = {
  name: string;
  name_ua: string;
  price_per_hour: number;
  rating: number;
};

export type PsychologistSortField =
  | 'name'
  | 'name_ua'
  | 'price_per_hour'
  | 'rating';

export type PsychologistServerSortField =
  | typeof DB_FIELDS.SORT_NAME_EN
  | typeof DB_FIELDS.SORT_NAME_EN_DESC
  | typeof DB_FIELDS.SORT_NAME_UA
  | typeof DB_FIELDS.SORT_NAME_UA_DESC
  | typeof DB_FIELDS.SORT_PRICE_ASC
  | typeof DB_FIELDS.SORT_PRICE_DESC
  | typeof DB_FIELDS.SORT_RATING_ASC
  | typeof DB_FIELDS.SORT_RATING_DESC;
