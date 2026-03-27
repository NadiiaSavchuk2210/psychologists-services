import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { auth } from '@shared/lib/config/firebase/auth';
import { useAuthStore } from '@shared/lib/store/authStore';
import { Loader } from '@shared/ui';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { loading, setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return unsubscribe;
  }, [setUser]);

  if (loading) return <Loader />;
  return children;
};
