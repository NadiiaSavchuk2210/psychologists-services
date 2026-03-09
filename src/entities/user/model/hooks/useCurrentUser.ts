import { useAuthStore } from '../../../../shared/lib/store/authStore';

export const useCurrentUser = () => {
  const { user } = useAuthStore();
  return user;
};
