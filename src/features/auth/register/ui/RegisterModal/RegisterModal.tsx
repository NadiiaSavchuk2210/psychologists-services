import { useAuthTranslation } from '@shared/hooks';
import Modal from '@shared/ui/Modal/Modal';

import RegisterForm from '../RegisterForm/RegisterForm';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const RegisterModal = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useAuthTranslation();

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={t('registerTitle')}
      description={t('registerDescription')}
    >
      <Modal.Body>
        <RegisterForm onOpenChange={onOpenChange} />
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
