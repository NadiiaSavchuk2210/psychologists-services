import { useMutation } from '@tanstack/react-query';
import { useAppointmentTranslation, useFirebaseError } from '@shared/hooks';
import { toastService } from '@shared/lib/toasts/toastService';
import { createAppointment } from '@features/make-appointment/api/appointmentApi';
import type { Appointment } from '../types/appointment';

interface AppointmentPayload {
  userId: string;
  data: Appointment;
}

export const useAppointmentMutation = () => {
  const { t } = useAppointmentTranslation();
  const { getErrorMessage } = useFirebaseError();

  return useMutation({
    mutationFn: async ({ userId, data }: AppointmentPayload) =>
      await createAppointment(userId, data),
    onSuccess: () => {
      toastService.appointmentSuccess(t);
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toastService.error(message || t('toasts.error'));
    },
  });
};
