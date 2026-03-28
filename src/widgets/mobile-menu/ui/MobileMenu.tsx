import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { useRef } from 'react';

import { AuthNavigation } from '@features/auth-navigation';
import { useCommonTranslation } from '@shared/hooks';
import { Icon } from '@shared/ui';
import { Navbar } from '@widgets/navbar';

import css from './MobileMenu.module.css';

interface Props {
  menuId: string;
  isMenuOpen: boolean;
  closeMenu: () => void;
  openLogin: () => void;
  openRegister: () => void;
}

const MobileMenu = ({
  menuId,
  isMenuOpen,
  closeMenu,
  openLogin,
  openRegister,
}: Props) => {
  const { t } = useCommonTranslation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog.Root
      open={isMenuOpen}
      onOpenChange={open => {
        if (!open) {
          closeMenu();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Content
          id={menuId}
          className={css['mobile-menu']}
          onOpenAutoFocus={event => {
            event.preventDefault();
            closeButtonRef.current?.focus();
          }}
        >
          <Dialog.Title className="visually-hidden">
            {t('navigationMenu')}
          </Dialog.Title>
          <Dialog.Description className="visually-hidden">
            {t('navigationMenu')}
          </Dialog.Description>

          <div className={clsx('container', css['mobile-menu-container'])}>
            <Dialog.Close asChild>
              <button
                ref={closeButtonRef}
                className={css['mobile-menu-close']}
                type="button"
                aria-label={t('closeMenu')}
              >
                <Icon
                  className={css['mobile-menu-close-icon']}
                  name="icon-close"
                  width={16}
                  height={16}
                />
              </button>
            </Dialog.Close>

            <Navbar isMobileMenu={true} closeMenu={closeMenu} />

            <AuthNavigation
              openLogin={openLogin}
              openRegister={openRegister}
              onActionComplete={closeMenu}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MobileMenu;
