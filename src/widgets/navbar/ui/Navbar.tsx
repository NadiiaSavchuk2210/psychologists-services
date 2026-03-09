import { NavLink } from 'react-router-dom';
import css from './Navbar.module.css';
import { ROUTES } from '../../../app/router/routesConfig';
import clsx from 'clsx';

const navLinks = [
  { to: ROUTES.HOME, label: "Home" },
  { to: ROUTES.PSYCHOLOGISTS, label: "Psychologists" },
  { to: ROUTES.FAVORITES, label: "Favorites" },
];

interface Props {
  closeMenu?: () => void;
  isMobileMenu?: boolean;
}


const Navbar = ({ closeMenu, isMobileMenu }: Props) => {
  return (
    <nav className={clsx(css["nav"], isMobileMenu && css["mobile-menu-nav"])}>
      <ul className={clsx(css["nav-list"], isMobileMenu && css["mobile-menu-nav-list"])}>
        {navLinks.map(({ to, label }) =>
        (<li key={to} className={clsx(css["nav-item"], isMobileMenu && css["mobile-menu-nav-item"])}>
          <NavLink
            to={to}
            onClick={closeMenu}
            className={({ isActive }) =>
              clsx(
                isMobileMenu ? css["mobile-menu-nav-link"] : css["nav-link"],
                isActive && css.active
              )
            }
          >
            {label}
          </NavLink>
        </li>)
        )
        }
      </ul>
    </nav>

  );
};

export default Navbar;
