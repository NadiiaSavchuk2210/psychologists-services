import { Suspense, lazy } from 'react';

import { Loader } from '@shared/ui';

const LoginModal = lazy(
  () => import('@features/auth/login/ui/LoginModal/LoginModal')
);
const RegisterModal = lazy(
  () => import('@features/auth/register/ui/RegisterModal/RegisterModal')
);

interface HeaderAuthModalsProps {
  isLoginOpen: boolean;
  closeLogin: () => void;
  isRegisterOpen: boolean;
  closeRegister: () => void;
}

const HeaderAuthModals = ({
  isLoginOpen,
  closeLogin,
  isRegisterOpen,
  closeRegister,
}: HeaderAuthModalsProps) => {
  if (!isLoginOpen && !isRegisterOpen) {
    return null;
  }

  return (
    <Suspense fallback={<Loader />}>
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpenChange={closeLogin} />}
      {isRegisterOpen && (
        <RegisterModal isOpen={isRegisterOpen} onOpenChange={closeRegister} />
      )}
    </Suspense>
  );
};

export default HeaderAuthModals;
