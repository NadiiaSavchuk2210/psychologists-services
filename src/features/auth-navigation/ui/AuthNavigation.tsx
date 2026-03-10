import UserProfile from '../../../entities/user/ui/UserProfile/UserProfile';
import { useAuthStore } from '../../../shared/lib/store/authStore';
import { Button } from '../../../shared/ui';
import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <div className={css['auth-btns']}>
      <Button variant="outline" className={css['btn-login']}>
        Log in
      </Button>
      <Button variant="primary" className={css['btn-registration']}>
        Registration
      </Button>
    </div>
  ) : (
    <div className={css['auth-user']}>
      <UserProfile />
      <Button variant="outline" className={css['btn-logout']}>
        Log out
      </Button>
    </div>
  );
};

export default AuthNavigation;
