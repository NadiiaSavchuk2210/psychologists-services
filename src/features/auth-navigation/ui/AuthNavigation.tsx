import UserProfile from '@entities/user/ui/UserProfile/UserProfile';
import { Button } from '@shared/ui';

import css from './AuthNavigation.module.css';
import { useAuthNavigation } from './useAuthNavigation';

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
  const {
    tA,
    tCommon,
    isAuthenticated,
    loading,
    isLoggingOut,
    handleLogout,
    handleOpenLogin,
    handleOpenRegister,
  } = useAuthNavigation({
    openLogin,
    openRegister,
    onActionComplete,
  });

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
