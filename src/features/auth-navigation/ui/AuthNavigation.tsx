import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { queryClient } from '@app/providers/queryClient/queryClient';
import { ROUTES } from '@app/router/routesConfig';
import UserProfile from '@entities/user/ui/UserProfile/UserProfile';
import { useAuthTranslation, useCommonTranslation } from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';
import { toastService } from '@shared/lib/toasts/toastService';
import { Button } from '@shared/ui';

import css from './AuthNavigation.module.css';

interface Props {
  openLogin: () => void;
  openRegister: () => void;
  onActionComplete?: () => void;
}

const AuthNavigation = ({
  openLogin,
  openRegister,
  onActionComplete,
}: Props) => {
  const navigate = useNavigate();
  const { t: tA } = useAuthTranslation();
  const { t: tCommon } = useCommonTranslation();
  const { isAuthenticated, loading, clearAuth } = useAuthStore();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    let getFirebaseErrorMap:
      | typeof import('@shared/lib/auth/errorMap').getFirebaseErrorMap
      | undefined;

    try {
      const [{ logoutUser }, errorMapModule] = await Promise.all([
        import('@features/auth/api/authApi'),
        import('@shared/lib/auth/errorMap'),
      ]);
      getFirebaseErrorMap = errorMapModule.getFirebaseErrorMap;

      await logoutUser();
      clearAuth();
      toastService.logoutSuccess(tA);
      queryClient.clear();
      navigate(ROUTES.HOME, { replace: true });
      onActionComplete?.();
    } catch (error) {
      const errorMap: Record<string, string> = getFirebaseErrorMap?.(tCommon) ?? {
        default: tCommon('error'),
      };
      const errorCode =
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        typeof error.code === 'string'
          ? error.code
          : 'default';

      toastService.error(errorMap[errorCode] ?? errorMap.default);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleOpenLogin = () => {
    openLogin();
    onActionComplete?.();
  };

  const handleOpenRegister = () => {
    openRegister();
    onActionComplete?.();
  };

  if (loading) {
    return (
      <div className={css['auth-skeleton']}>
        <div className={css['skeleton-avatar']} />
        <div className={css['skeleton-btn']} />
      </div>
    );
  }

  return (
    <>
      {!isAuthenticated ? (
        <div className={css['auth-btns']}>
          <Button
            variant="outline"
            className={css['btn-login']}
            onClick={handleOpenLogin}
          >
            {tA('login')}
          </Button>
          <Button
            variant="primary"
            className={css['btn-registration']}
            onClick={handleOpenRegister}
          >
            {tA('register')}
          </Button>
        </div>
      ) : (
        <div className={css['auth-user']}>
          <UserProfile />
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="outline"
            className={css['btn-logout']}
          >
            {isLoggingOut ? tCommon('loading') : tA('logout')}
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthNavigation;
