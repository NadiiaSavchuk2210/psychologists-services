import * as yup from 'yup';
import { useMemo } from 'react';
import { useAppointmentTranslation } from '@shared/hooks';
import { PHONE_REG_EXP } from '@shared/constants';

export const useAppointmentSchema = () => {
  const { t } = useAppointmentTranslation();

  return useMemo(
    () =>
      yup.object({
        name: yup
          .string()
          .min(2, t('validation.min', { field: t('fields.name'), min: 2 }))
          .required(t('validation.required', { field: t('fields.name') })),
        phoneNumber: yup
          .string()
          .matches(PHONE_REG_EXP, t('validation.invalidPhone'))
          .required(
            t('validation.required', { field: t('fields.phoneNumber') })
          ),
        email: yup
          .string()
          .email(t('validation.invalidEmail'))
          .required(t('validation.required', { field: t('fields.email') })),
        meetingTime: yup
          .string()
          .required(
            t('validation.required', { field: t('fields.meetingTime') })
          ),
        comment: yup
          .string()
          .min(5, t('validation.min', { field: t('fields.comment'), min: 5 }))
          .max(
            300,
            t('validation.max', { field: t('fields.comment'), max: 300 })
          )
          .required(t('validation.required', { field: t('fields.comment') })),
      }),
    [t]
  );
};
