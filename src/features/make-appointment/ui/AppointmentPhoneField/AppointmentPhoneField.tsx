import clsx from 'clsx';
import {
  Controller,
  type Control,
  type FieldError,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import type { AppointmentFormData } from '@features/make-appointment/model/types/appointment';
import { useAppointmentTranslation } from '@shared/hooks';
import { Input } from '@shared/ui';

import css from './AppointmentPhoneField.module.css';

interface AppointmentPhoneFieldProps<
  TFieldValues extends FieldValues = AppointmentFormData,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  error?: FieldError;
  classInputWrapper?: string;
  classField?: string;
  className?: string;
}

export default function AppointmentPhoneField<
  TFieldValues extends FieldValues = AppointmentFormData,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  error,
  classInputWrapper = '',
  classField = '',
  className = 'appointment-form__input',
}: AppointmentPhoneFieldProps<TFieldValues, TName>) {
  const { t } = useAppointmentTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <PatternFormat
          {...field}
          value={field.value || ''}
          getInputRef={field.ref}
          allowEmptyFormatting={false}
          format="+38 (0##) ###-##-##"
          mask="_"
          customInput={Input}
          type="tel"
          label={t('fields.phoneNumber')}
          hideLabel
          placeholder={t('fields.phonePlaceholder')}
          error={error}
          autoComplete="tel"
          inputMode="tel"
          className={clsx(className, css.phoneInput)}
          classInputWrapper={classInputWrapper}
          classField={classField}
          onValueChange={values => {
            const newFormatted = values.formattedValue ?? '';
            if (newFormatted !== field.value && !newFormatted.includes('_')) {
              setTimeout(() => {
                field.onChange(newFormatted);
              }, 0);
            }
          }}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}
