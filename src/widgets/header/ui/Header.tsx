import clsx from 'clsx';
import css from './Header.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { Navbar } from '@widgets/navbar';
import { Icon } from '@shared/ui';
import { AuthNavigation } from '@features/auth-navigation';
import { MobileMenu } from '@widgets/mobile-menu';
import { useDisclosure } from '@shared/hooks/useDisclosure';
import { LoginModal } from '@features/auth/login';
import { RegisterModal } from '@features/auth/register';
import { useCommonTranslation } from '@shared/hooks';

const Header = () => {
  const { t } = useCommonTranslation();

  const loginModal = useDisclosure();
  const registerModal = useDisclosure();

  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={css.header}>
      <div className={clsx('container', css['header-container'])}>
        <Link
          className={css['header-logo']}
          to="/"
          aria-label={t('homeLink')}
          onClick={closeMenu}
        >
          <span className={css['header-logo-accent']}>psychologists.</span>
          services
        </Link>

        {!isMobile && (
          <>
            <Navbar />
            <AuthNavigation
              openLogin={loginModal.onOpen}
              openRegister={registerModal.onOpen}
            />
          </>
        )}

        {isMobile && (
          <button
            className={css['burger-btn']}
            type="button"
            onClick={openMenu}
          >
            <Icon
              name="icon-burger"
              className={css['burger-icon']}
              width={24}
              height={24}
              aria-label={t('openMenu')}
            />
          </button>
        )}
      </div>

      {isMobile && (
        <MobileMenu
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          openLogin={loginModal.onOpen}
          openRegister={registerModal.onOpen}
        />
      )}

      <LoginModal
        isOpen={loginModal.isOpen}
        onOpenChange={loginModal.onClose}
      />
      <RegisterModal
        isOpen={registerModal.isOpen}
        onOpenChange={registerModal.onClose}
      />
    </header>
  );
};

export default Header;
