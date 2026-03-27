import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useAppointmentMutation } from '@features/make-appointment/model/hooks/useAppointmentMutation';
import { useAppointmentSchema } from '@features/make-appointment/model/hooks/useAppointmentSchema';
import type {
  Appointment,
  AppointmentFormData,
} from '@features/make-appointment/model/types/appointment';
import { useAppointmentTranslation, useClickOutside, useDisclosure } from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';

const DEFAULT_VALUES: AppointmentFormData = {
  name: '',
  phoneNumber: '',
  meetingTime: '',
  email: '',
  comment: '',
};

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
  const timePickerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isTimePickerOpen,
    onClose: closeTimePicker,
    onToggle: toggleTimePicker,
  } = useDisclosure();

  const form = useForm<AppointmentFormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  });

  const {
    reset,
    formState: { isValid, touchedFields, isValidating },
  } = form;

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
            setTimeout(() => reset(DEFAULT_VALUES), 300);
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
