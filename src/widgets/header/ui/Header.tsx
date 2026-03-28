import clsx from 'clsx';
import { Suspense, lazy, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import { AuthNavigation } from '@features/auth-navigation';
import { useCommonTranslation } from '@shared/hooks';
import { useModalStore } from '@shared/lib/store/modalStore';
import { Icon } from '@shared/ui';
import { MobileMenu } from '@widgets/mobile-menu';
import { Navbar } from '@widgets/navbar';

import css from './Header.module.css';

const LoginModal = lazy(
  () => import('@features/auth/login/ui/LoginModal/LoginModal')
);
const RegisterModal = lazy(
  () => import('@features/auth/register/ui/RegisterModal/RegisterModal')
);

const Header = () => {
  const { t } = useCommonTranslation();

  const {
    isLoginOpen,
    closeLogin,
    isRegisterOpen,
    closeRegister,
    openLogin,
    openRegister,
  } = useModalStore();

  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = useId();

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
            <AuthNavigation openLogin={openLogin} openRegister={openRegister} />
          </>
        )}

        {isMobile && (
          <button
            className={css['burger-btn']}
            type="button"
            onClick={openMenu}
            aria-label={t('openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls={mobileMenuId}
            aria-haspopup="dialog"
          >
            <Icon
              name="icon-burger"
              className={css['burger-icon']}
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

      {isMobile && (
        <MobileMenu
          menuId={mobileMenuId}
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          openLogin={openLogin}
          openRegister={openRegister}
        />
      )}

      {(isLoginOpen || isRegisterOpen) && (
        <Suspense fallback={null}>
          {isLoginOpen && (
            <LoginModal isOpen={isLoginOpen} onOpenChange={closeLogin} />
          )}
          {isRegisterOpen && (
            <RegisterModal
              isOpen={isRegisterOpen}
              onOpenChange={closeRegister}
            />
          )}
        </Suspense>
      )}
    </header>
  );
};

export default Header;
