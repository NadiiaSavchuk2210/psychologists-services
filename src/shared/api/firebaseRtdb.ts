import { http } from './http';

type QueryValue = string | number | boolean;

type QueryParams = Record<string, QueryValue>;

const buildUrl = (path: string) =>
  `${import.meta.env.VITE_FIREBASE_DATABASE_URL}/${path}.json`;

export const getFirebaseRtdb = async <T>(
  path: string,
  params?: QueryParams,
  validateStatus?: (status: number) => boolean
) => {
  const response = await http.get<T>(buildUrl(path), {
    params,
    validateStatus,
  });

  return response;
};
