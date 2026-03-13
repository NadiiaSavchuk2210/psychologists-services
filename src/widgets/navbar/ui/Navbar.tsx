import { NavLink } from 'react-router-dom';
import css from './Navbar.module.css';
import clsx from 'clsx';
import { ROUTES } from '@app/router/routesConfig';
import { useNavbarTranslation } from '@shared/hooks';

interface Props {
  closeMenu?: () => void;
  isMobileMenu?: boolean;
}

const navLinks = [
  { to: ROUTES.HOME, label: 'home' },
  { to: ROUTES.PSYCHOLOGISTS, label: 'psychologists' },
  { to: ROUTES.FAVORITES, label: 'favorites' },
];

const Navbar = ({ closeMenu, isMobileMenu }: Props) => {
  const { t } = useNavbarTranslation();

  return (
    <nav className={clsx(css['nav'], isMobileMenu && css['mobile-menu-nav'])}>
      <ul
        className={clsx(
          css['nav-list'],
          isMobileMenu && css['mobile-menu-nav-list']
        )}
      >
        {navLinks.map(({ to, label }) => (
          <li
            key={to}
            className={clsx(
              css['nav-item'],
              isMobileMenu && css['mobile-menu-nav-item']
            )}
          >
            <NavLink
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                clsx(
                  isMobileMenu ? css['mobile-menu-nav-link'] : css['nav-link'],
                  isActive && css.active
                )
              }
            >
              {t(label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
