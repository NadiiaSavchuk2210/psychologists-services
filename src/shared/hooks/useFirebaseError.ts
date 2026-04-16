import { getFirebaseErrorMap } from '@shared/lib/auth/errorMap';

import { useCommonTranslation } from './index';

type ErrorMessage = string;

const isFirebaseError = (error: unknown): error is { code: string } =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof error.code === 'string';

export const useFirebaseError = () => {
  const { t: tCommon } = useCommonTranslation();
  const errorMap = getFirebaseErrorMap(tCommon);

  const getErrorMessage = (error: unknown): ErrorMessage => {
    if (isFirebaseError(error)) {
      const key = error.code as keyof typeof errorMap;
      return errorMap[key] ?? errorMap.default;
    }

    return errorMap.default;
  };

  return { getErrorMessage };
};
