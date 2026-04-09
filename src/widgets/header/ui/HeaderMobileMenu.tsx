import { Suspense, lazy } from 'react';

import { Loader } from '@shared/ui';

const MobileMenu = lazy(() => import('@widgets/mobile-menu/ui/MobileMenu'));

interface HeaderMobileMenuProps {
  menuId: string;
  isMenuOpen: boolean;
  closeMenu: () => void;
  openLogin: () => void;
  openRegister: () => void;
}

const HeaderMobileMenu = ({
  menuId,
  isMenuOpen,
  closeMenu,
  openLogin,
  openRegister,
}: HeaderMobileMenuProps) => {
  if (!isMenuOpen) {
    return null;
  }

  return (
    <Suspense fallback={<Loader />}>
      <MobileMenu
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        openLogin={openLogin}
        openRegister={openRegister}
      />
    </Suspense>
  );
};

export default HeaderMobileMenu;
