import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useAppointmentMutation } from '@features/make-appointment/model/hooks/useAppointmentMutation';
import { useAppointmentSchema } from '@features/make-appointment/model/hooks/useAppointmentSchema';
import type {
  Appointment,
  AppointmentFormData,
} from '@features/make-appointment/model/types/appointment';
import { useAppointmentTranslation, useClickOutside, useDisclosure } from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';
import {
  APPOINTMENT_DEFAULT_VALUES,
  useFormDraftStore,
} from '@shared/lib/store/formDraftStore';

export const useAppointmentForm = ({
  onOpenChange,
  psychologistName,
}: {
  onOpenChange: (isOpen: boolean) => void;
  psychologistName: string;
}) => {
  const { t } = useAppointmentTranslation();
  const { user } = useAuthStore();
  const appointmentMutation = useAppointmentMutation();
  const schema = useAppointmentSchema();
  const appointmentDraft = useFormDraftStore(state => state.appointment);
  const setAppointmentDraft = useFormDraftStore(state => state.setAppointment);
  const resetAppointmentDraft = useFormDraftStore(
    state => state.resetAppointment
  );
  const timePickerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isTimePickerOpen,
    onClose: closeTimePicker,
    onToggle: toggleTimePicker,
  } = useDisclosure();

  const form = useForm<AppointmentFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: appointmentDraft,
  });

  const {
    reset,
    control,
    formState: { isValid, touchedFields, isValidating },
  } = form;

  const watchedValues = useWatch({
    control,
  });

  useEffect(() => {
    setAppointmentDraft({
      name: watchedValues.name ?? '',
      phoneNumber: watchedValues.phoneNumber ?? '',
      meetingTime: watchedValues.meetingTime ?? '',
      email: watchedValues.email ?? '',
      comment: watchedValues.comment ?? '',
    });
  }, [
    setAppointmentDraft,
    watchedValues.comment,
    watchedValues.email,
    watchedValues.meetingTime,
    watchedValues.name,
    watchedValues.phoneNumber,
  ]);

  useClickOutside(timePickerRef, isTimePickerOpen, closeTimePicker);

  const onSubmit = useCallback(
    (data: AppointmentFormData) => {
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
            closeTimePicker();
            setTimeout(() => {
              reset(APPOINTMENT_DEFAULT_VALUES);
              resetAppointmentDraft();
            }, 300);
          },
        }
      );
    },
    [
      appointmentMutation,
      closeTimePicker,
      onOpenChange,
      psychologistName,
      reset,
      resetAppointmentDraft,
      user,
    ]
  );

  const isSubmitDisabled =
    Object.keys(touchedFields).length > 0 && (!isValid || isValidating);

  return {
    t,
    form,
    onSubmit,
    isSubmitDisabled,
    isPending: appointmentMutation.isPending,
    timePickerRef,
    isTimePickerOpen,
    closeTimePicker,
    toggleTimePicker,
  };
};
