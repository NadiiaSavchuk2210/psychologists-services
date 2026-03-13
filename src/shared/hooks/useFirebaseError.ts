import { FirebaseError } from 'firebase/app';
import { getFirebaseErrorMap } from '@shared/lib/auth/errorMap';
import { useCommonTranslation } from './index';

type ErrorMessage = string;

export const useFirebaseError = () => {
  const { t: tCommon } = useCommonTranslation();
  const errorMap = getFirebaseErrorMap(tCommon);

  const getErrorMessage = (error: unknown): ErrorMessage => {
    if (error instanceof FirebaseError) {
      const key = error.code as keyof typeof errorMap;
      return errorMap[key] ?? errorMap.default;
    }

    return errorMap.default;
  };

  return { getErrorMessage };
};
