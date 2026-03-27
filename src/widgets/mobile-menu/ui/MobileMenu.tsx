import clsx from 'clsx';

import { AuthNavigation } from '@features/auth-navigation';
import { useCommonTranslation } from '@shared/hooks';
import { Icon } from '@shared/ui';
import { Navbar } from '@widgets/navbar';

import css from './MobileMenu.module.css';

interface Props {
  isMenuOpen: boolean;
  closeMenu: () => void;
  openLogin: () => void;
  openRegister: () => void;
}

const MobileMenu = ({
  isMenuOpen,
  closeMenu,
  openLogin,
  openRegister,
}: Props) => {
  const { t } = useCommonTranslation();

  return (
    <div
      className={clsx(css['mobile-menu'], isMenuOpen && css.open)}
      role="dialog"
      aria-modal="true"
    >
      <div className={clsx('container', css['mobile-menu-container'])}>
        <button
          className={css['mobile-menu-close']}
          type="button"
          onClick={closeMenu}
          aria-label={t('closeMenu')}
        >
          <Icon
            className={css['mobile-menu-close-icon']}
            name="icon-close"
            width={16}
            height={16}
          />
        </button>
        <Navbar isMobileMenu={true} closeMenu={closeMenu} />

        <AuthNavigation openLogin={openLogin} openRegister={openRegister} />
      </div>
    </div>
  );
};

export default MobileMenu;
