import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@shared/lib/config/firebase/auth';
import { useAuthStore } from '@shared/lib/store/authStore';
import { Loader } from '@shared/ui';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <Loader />;
  return children;
};
