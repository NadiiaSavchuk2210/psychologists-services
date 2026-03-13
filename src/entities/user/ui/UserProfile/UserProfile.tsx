import { Icon } from '@shared/ui';
import css from './UserProfile.module.css';
import { useAuthStore } from '@shared/lib/store/authStore';
import { getUserName } from '@entities/user/utils/getUserName';

const UserProfile = () => {
  const { user } = useAuthStore();
  const userName = getUserName(user);

  return (
    <div className={css.user}>
      <div className={css['user-avatar']}>
        <Icon
          name="icon-user"
          className={css['user-avatar-icon']}
          width={24}
          height={24}
        />
      </div>
      <p className={css['user-name']}>{userName}</p>
    </div>
  );
};

export default UserProfile;
