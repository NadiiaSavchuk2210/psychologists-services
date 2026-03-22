import Modal from '@shared/ui/Modal/Modal';
import { useAppointmentTranslation } from '@shared/hooks';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import AppointmentPsychologist from '../AppointmentPsychologist/AppointmentPsychologist';
import { useModalStore } from '@shared/lib/store/modalStore';

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
          psychologistName={psychologist?.name ?? ''}
          onOpenChange={onOpenChange}
        />
      </Modal.Body>
    </Modal>
  );
}
