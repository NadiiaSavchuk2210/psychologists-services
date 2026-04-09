import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { AuthNavigation } from '@features/auth-navigation';
import { useCommonTranslation, useMediaQuery } from '@shared/hooks';
import { Icon } from '@shared/ui';
import { Navbar } from '@widgets/navbar';

import css from './Header.module.css';
import HeaderAuthModals from './HeaderAuthModals';
import HeaderMobileMenu from './HeaderMobileMenu';
import { useHeaderControls } from './useHeaderControls';

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

const Header = () => {
  const { t } = useCommonTranslation();
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const {
    isLoginOpen,
    closeLogin,
    isRegisterOpen,
    closeRegister,
    openLogin,
    openRegister,
    isMenuOpen,
    mobileMenuId,
    openMenu,
    closeMenu,
  } = useHeaderControls();

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
        <HeaderMobileMenu
          menuId={mobileMenuId}
          isMenuOpen={isMenuOpen}
          closeMenu={closeMenu}
          openLogin={openLogin}
          openRegister={openRegister}
        />
      )}

      <HeaderAuthModals
        isLoginOpen={isLoginOpen}
        closeLogin={closeLogin}
        isRegisterOpen={isRegisterOpen}
        closeRegister={closeRegister}
      />
    </header>
  );
};

export default Header;
