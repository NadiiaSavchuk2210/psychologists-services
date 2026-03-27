import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppointmentMutation } from '@features/make-appointment/model/hooks/useAppointmentMutation';
import { useAppointmentSchema } from '@features/make-appointment/model/hooks/useAppointmentSchema';
import type {
  Appointment,
  AppointmentFormData,
} from '@features/make-appointment/model/types/appointment';
import { useAppointmentTranslation } from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';
import { Button, Input } from '@shared/ui';

import css from './AppointmentForm.module.css';
import AppointmentPhoneField from '../AppointmentPhoneField/AppointmentPhoneField';
import AppointmentTimeField from '../AppointmentTimeField/AppointmentTimeField';

interface Props {
  onOpenChange: (isOpen: boolean) => void;
  psychologistName: string;
}

const DEFAULT_VALUES: AppointmentFormData = {
  name: '',
  phoneNumber: '',
  meetingTime: '',
  email: '',
  comment: '',
};

export default function AppointmentForm({
  onOpenChange,
  psychologistName,
}: Props) {
  const { t } = useAppointmentTranslation();
  const { user } = useAuthStore();
  const appointmentMutation = useAppointmentMutation();
  const schema = useAppointmentSchema();

  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const timePickerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, touchedFields, isValidating },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: AppointmentFormData) => {
    if (!user) return;

    const appointmentData: Appointment = {
      ...data,
      psychologist: psychologistName,
    };

    appointmentMutation.mutate(
      { userId: user.uid, data: appointmentData },
      {
        onSuccess: () => {
          onOpenChange(false);
          setTimeout(() => reset(DEFAULT_VALUES), 300);
        },
      }
    );
  };

  const isButtonDisabled =
    Object.keys(touchedFields).length > 0 && (!isValid || isValidating);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target as Node)
      ) {
        setIsTimePickerOpen(false);
      }
    };

    if (isTimePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isTimePickerOpen]);

  const toggleTimePicker = () => setIsTimePickerOpen(prev => !prev);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css['appointment-form']}>
      <div className={css['appointment-form__inputs']}>
        <Input
          type="text"
          placeholder={t('fields.name')}
          register={register('name')}
          error={errors.name}
          className={clsx(css['appointment-form__input'])}
        />

        <AppointmentPhoneField
          control={control}
          name="phoneNumber"
          error={errors.phoneNumber}
          classInputWrapper={css['appointment-form__input-phone']}
          classField={css['appointment-form__field-phone']}
        />

        <Controller
          name="meetingTime"
          control={control}
          render={({ field }) => (
            <AppointmentTimeField
              field={field}
              error={errors.meetingTime}
              isOpen={isTimePickerOpen}
              toggle={toggleTimePicker}
              close={() => setIsTimePickerOpen(false)}
              classField={css['appointment-form__field-time']}
              classInputWrapper={css['appointment-form__input-time']}
            />
          )}
        />

        <Input
          type="email"
          placeholder={t('fields.email')}
          register={register('email')}
          error={errors.email}
          className={css['appointment-form__input']}
          autoComplete="email"
        />

        <Input
          type="textarea"
          placeholder={t('fields.comment')}
          register={register('comment')}
          error={errors.comment}
          className={css['appointment-form__input']}
          classField={css['appointment-form__field-comment']}
          classInputWrapper={css['appointment-form__input-comment']}
        />
      </div>

      <Button
        className={css['appointment-form__btn']}
        type="submit"
        disabled={isButtonDisabled || appointmentMutation.isPending}
      >
        {appointmentMutation.isPending
          ? t('fields.sending')
          : t('fields.submit')}
      </Button>
    </form>
  );
}
