import type { User } from 'firebase/auth';

export const getUserName = (user: User | null) => {
  if (!user) return 'User';
  return user.displayName || user.email?.split('@')[0] || 'User';
};
