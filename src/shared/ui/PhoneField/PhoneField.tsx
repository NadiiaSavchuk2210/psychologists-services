import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { Input } from '@shared/ui';
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import type { AppointmentFormData } from '@features/make-appointment/model/types/appointment';
import css from './PhoneField.module.css';
import clsx from 'clsx';

interface PhoneFieldProps<
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

export default function PhoneField<
  TFieldValues extends FieldValues = AppointmentFormData,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  error,
  classInputWrapper = '',
  classField = '',
  className = 'appointment-form__input',
}: PhoneFieldProps<TFieldValues, TName>) {
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
          placeholder="+380"
          error={error}
          className={clsx(css[className], css.phoneInput)}
          classInputWrapper={css[classInputWrapper]}
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
