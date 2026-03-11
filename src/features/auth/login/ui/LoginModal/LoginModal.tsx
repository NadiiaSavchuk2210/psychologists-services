import Modal from '@shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const LoginModal = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation('auth');

  return (
    <Modal
      open={isOpen}
      onOpenChange={isOpen => !isOpen && onOpenChange(false)}
      title={t('loginTitle')}
      description={t('loginDescription')}
    >
      <Modal.Body>
        <form>
          <input placeholder={t('loginEmailPlaceholder')} type="email" />
          <input placeholder={t('loginPasswordPlaceholder')} type="password" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button>{t('login')}</button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
