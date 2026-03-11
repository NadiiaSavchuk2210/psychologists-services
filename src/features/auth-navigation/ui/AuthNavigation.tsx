import { Button } from '@shared/ui';
import { useAuthStore } from '@shared/lib/store/authStore';
import UserProfile from '@entities/user/ui/UserProfile/UserProfile';
import css from './AuthNavigation.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
  openLogin: () => void;
  openRegister: () => void;
}

const AuthNavigation = ({ openLogin, openRegister }: Props) => {
  const { t } = useTranslation('auth');
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <div className={css['auth-btns']}>
          <Button
            variant="outline"
            className={css['btn-login']}
            onClick={openLogin}
          >
            {t('login')}
          </Button>
          <Button
            variant="primary"
            className={css['btn-registration']}
            onClick={openRegister}
          >
            {t('register')}
          </Button>
        </div>
      ) : (
        <div className={css['auth-user']}>
          <UserProfile />
          <Button variant="outline" className={css['btn-logout']}>
            {t('logout')}
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthNavigation;
