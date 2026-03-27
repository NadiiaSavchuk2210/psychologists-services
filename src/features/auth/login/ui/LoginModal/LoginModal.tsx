import { useAuthTranslation } from '@shared/hooks';
import Modal from '@shared/ui/Modal/Modal';

import LoginForm from '../LoginForm/LoginForm';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const LoginModal = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useAuthTranslation();

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={t('loginTitle')}
      description={t('loginDescription')}
    >
      <Modal.Body>
        <LoginForm onOpenChange={onOpenChange} />
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
