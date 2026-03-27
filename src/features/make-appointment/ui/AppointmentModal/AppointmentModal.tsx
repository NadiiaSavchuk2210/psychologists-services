import { useAppointmentTranslation } from '@shared/hooks';
import { useModalStore } from '@shared/lib/store/modalStore';
import Modal from '@shared/ui/Modal/Modal';

import AppointmentForm from '../AppointmentForm/AppointmentForm';
import AppointmentPsychologist from '../AppointmentPsychologist/AppointmentPsychologist';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function AppointmentModal({ isOpen, onOpenChange }: Props) {
  const { t } = useAppointmentTranslation();
  const { appointmentPsychologist: psychologist } = useModalStore();

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={t('title')}
      description={t('subtitle')}
      modalClassName="appointmentModal"
    >
      <Modal.Body>
        <AppointmentPsychologist psychologist={psychologist} />
        <AppointmentForm
          psychologistName={psychologist?.displayName ?? ''}
          onOpenChange={onOpenChange}
        />
      </Modal.Body>
    </Modal>
  );
}
