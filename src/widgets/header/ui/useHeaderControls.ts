import { useId, useState } from 'react';

import { useModalStore } from '@shared/lib/store/modalStore';

export const useHeaderControls = () => {
  const {
    isLoginOpen,
    closeLogin,
    isRegisterOpen,
    closeRegister,
    openLogin,
    openRegister,
  } = useModalStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = useId();

  return {
    isLoginOpen,
    closeLogin,
    isRegisterOpen,
    closeRegister,
    openLogin,
    openRegister,
    isMenuOpen,
    mobileMenuId,
    openMenu: () => setIsMenuOpen(true),
    closeMenu: () => setIsMenuOpen(false),
  };
};
