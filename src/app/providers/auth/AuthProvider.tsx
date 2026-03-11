import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@shared/lib/config/firebase/auth';
import { useAuthStore } from '@shared/lib/store/authStore';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const setLoading = useAuthStore(state => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser, setLoading]);

  return children;
};
