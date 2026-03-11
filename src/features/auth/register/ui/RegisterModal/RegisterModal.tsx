import Modal from '@shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const RegisterModal = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useTranslation('auth');

  return (
    <Modal
      open={isOpen}
      onOpenChange={isOpen => !isOpen && onOpenChange(false)}
      title={t('registerTitle')}
      description={t('registerDescription')}
    >
      <Modal.Body>
        <form>
          <input placeholder={t('registerEmailPlaceholder')} type="email" />
          <input
            placeholder={t('registerPasswordPlaceholder')}
            type="password"
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button>{t('registerButton')}</button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
