import { useMemo } from 'react';
import * as yup from 'yup';

import type { LoginFormData } from '@features/auth/types/types';
import { useValidationTranslation } from '@shared/hooks';

export const useLoginSchema = (): yup.ObjectSchema<LoginFormData> => {
  const { t: tV } = useValidationTranslation();

  return useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email(tV('invalid_email'))
          .required(tV('required', { field: tV('fields.email') })),
        password: yup
          .string()
          .required(tV('required', { field: tV('fields.password') })),
      }),
    [tV]
  );
};
