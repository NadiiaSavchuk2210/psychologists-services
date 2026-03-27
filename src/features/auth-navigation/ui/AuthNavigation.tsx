import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routesConfig';
import UserProfile from '@entities/user/ui/UserProfile/UserProfile';
import { useLogoutMutation } from '@features/auth/model/queries';
import { useAuthTranslation, useCommonTranslation } from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';
import { Button } from '@shared/ui';

import css from './AuthNavigation.module.css';




interface Props {
  openLogin: () => void;
  openRegister: () => void;
}

const AuthNavigation = ({ openLogin, openRegister }: Props) => {
  const navigate = useNavigate();
  const { t: tA } = useAuthTranslation();
  const { t: tCommon } = useCommonTranslation();
  const { isAuthenticated, loading } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate(ROUTES.HOME, { replace: true });
      },
    });
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
            onClick={openLogin}
          >
            {tA('login')}
          </Button>
          <Button
            variant="primary"
            className={css['btn-registration']}
            onClick={openRegister}
          >
            {tA('register')}
          </Button>
        </div>
      ) : (
        <div className={css['auth-user']}>
          <UserProfile />
          <Button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            variant="outline"
            className={css['btn-logout']}
          >
            {logoutMutation.isPending ? tCommon('loading') : tA('logout')}
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthNavigation;
