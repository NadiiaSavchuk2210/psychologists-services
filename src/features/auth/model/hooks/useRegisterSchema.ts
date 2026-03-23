import type { RegisterFormData } from '@features/auth/types/types';
import { useValidationTranslation } from '@shared/hooks';
import { useMemo } from 'react';
import * as yup from 'yup';

export const useRegisterSchema = (): yup.ObjectSchema<RegisterFormData> => {
  const { t: tV } = useValidationTranslation();

  return useMemo(
    () =>
      yup.object({
        name: yup
          .string()
          .required(tV('required', { field: tV('fields.name') })),
        email: yup
          .string()
          .email(tV('invalid_email'))
          .required(tV('required', { field: tV('fields.email') })),
        password: yup
          .string()
          .min(6, tV('min', { field: tV('fields.password'), min: 6 }))
          .required(tV('required', { field: tV('fields.password') })),
      }),
    [tV]
  );
};
