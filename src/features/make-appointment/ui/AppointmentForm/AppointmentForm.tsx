import clsx from 'clsx';
import { Controller } from 'react-hook-form';

import { useAppointmentForm } from '@features/make-appointment/model/hooks/useAppointmentForm';
import { Button, Input } from '@shared/ui';

import css from './AppointmentForm.module.css';
import AppointmentPhoneField from '../AppointmentPhoneField/AppointmentPhoneField';
import AppointmentTimeField from '../AppointmentTimeField/AppointmentTimeField';

interface Props {
  onOpenChange: (isOpen: boolean) => void;
  psychologistName: string;
}

export default function AppointmentForm({
  onOpenChange,
  psychologistName,
}: Props) {
  const {
    t,
    form: {
      register,
      handleSubmit,
      control,
      formState: { errors },
    },
    onSubmit,
    isSubmitDisabled,
    isPending,
    timePickerRef,
    isTimePickerOpen,
    closeTimePicker,
    toggleTimePicker,
  } = useAppointmentForm({
    onOpenChange,
    psychologistName,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css['appointment-form']}
      noValidate
    >
      <div className={css['appointment-form__inputs']}>
        <Input
          type="text"
          label={t('fields.name')}
          hideLabel
          placeholder={t('fields.name')}
          register={register('name')}
          error={errors.name}
          autoComplete="name"
          className={clsx(css['appointment-form__input'])}
          reserveErrorSpace
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
              containerRef={timePickerRef}
              isOpen={isTimePickerOpen}
              toggle={toggleTimePicker}
              close={closeTimePicker}
              className={css['appointment-form__field-time']}
              classInputWrapper={css['appointment-form__input-time']}
            />
          )}
        />

        <Input
          type="email"
          label={t('fields.email')}
          hideLabel
          placeholder={t('fields.email')}
          register={register('email')}
          error={errors.email}
          className={css['appointment-form__input']}
          autoComplete="email"
          reserveErrorSpace
        />

        <Input
          type="textarea"
          label={t('fields.comment')}
          hideLabel
          placeholder={t('fields.comment')}
          register={register('comment')}
          error={errors.comment}
          className={css['appointment-form__input']}
          classField={css['appointment-form__field-comment']}
          classInputWrapper={css['appointment-form__input-comment']}
          reserveErrorSpace
        />
      </div>

      <Button
        className={css['appointment-form__btn']}
        type="submit"
        disabled={isSubmitDisabled || isPending}
      >
        {isPending ? t('fields.sending') : t('fields.submit')}
      </Button>
    </form>
  );
}
