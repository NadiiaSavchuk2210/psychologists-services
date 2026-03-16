import * as Dialog from '@radix-ui/react-dialog';
import css from './Modal.module.css';
import Icon from '../Icon/Icon';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  header?: React.ReactNode;
}

const Modal = ({
  open,
  onOpenChange,
  children,
  title = 'Modal',
  description = 'Modal dialog',
  header,
}: ModalProps) => {
  const { t } = useTranslation('a11y');

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={css.overlay} />
        <Dialog.Content className={css.modal}>
          <Dialog.Close
            className={css.closeButton}
            aria-label={t('modalClose')}
          >
            <Icon
              name="icon-close"
              className={css.closeIcon}
              width={32}
              height={32}
            />
          </Dialog.Close>

          {header ? (
            header
          ) : (
            <>
              <Dialog.Title className={css.title}>{title}</Dialog.Title>
              <Dialog.Description className={css.description}>
                {description}
              </Dialog.Description>
            </>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// Compound components
const Header = ({
  children,
  description,
}: {
  children: React.ReactNode;
  description?: React.ReactNode;
}) => (
  <div className={css.header}>
    <Dialog.Title className={css.title}>{children}</Dialog.Title>
    {description && (
      <Dialog.Description className={css.description}>
        {description}
      </Dialog.Description>
    )}
  </div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <Dialog.Title className={css.title}>{children}</Dialog.Title>
);

const Description = ({ children }: { children: React.ReactNode }) => (
  <Dialog.Description className={css.description}>
    {children}
  </Dialog.Description>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <div className={css.body}>{children}</div>
);

const Footer = ({ children }: { children: React.ReactNode }) => (
  <div className={css.footer}>{children}</div>
);

Modal.Header = Header;
Modal.Title = Title;
Modal.Description = Description;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
