import { useEffect } from 'react';

import { useAuthStore } from '@shared/lib/store/authStore';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;

    void import('firebase/auth')
      .then(async ({ onAuthStateChanged, getAuth }) => {
        const { app } = await import('@shared/lib/config/firebase/config');

        if (!isMounted) {
          return;
        }

        unsubscribe = onAuthStateChanged(getAuth(app), user => {
          setUser(user);
        });
      })
      .catch(() => {
        if (isMounted) {
          clearAuth();
        }
      });

    return () => {
      isMounted = false;
      unsubscribe?.();
    };
  }, [clearAuth, setUser]);

  return children;
};
