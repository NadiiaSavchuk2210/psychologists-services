import clsx from 'clsx';
import css from './MobileMenu.module.css';
import { Icon } from '@shared/ui';
import { Navbar } from '@widgets/navbar';
import { AuthNavigation } from '@features/auth-navigation';

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
  return (
    <div className={clsx(css['mobile-menu'], isMenuOpen && css.open)} data-menu>
      <div className={clsx('container', css['mobile-menu-container'])}>
        <button className={css['mobile-menu-close']} onClick={closeMenu}>
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
