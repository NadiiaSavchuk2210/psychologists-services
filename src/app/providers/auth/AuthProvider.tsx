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
    const shouldDeferAuth = window.location.pathname === '/';
    let idleCallbackId: number | undefined;
    let timeoutId: number | undefined;

    const initializeAuth = () => {
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
    };

    if (shouldDeferAuth && 'requestIdleCallback' in window) {
      idleCallbackId = window.requestIdleCallback(() => {
        initializeAuth();
      }, { timeout: 1500 });
    } else if (shouldDeferAuth) {
      timeoutId = window.setTimeout(() => {
        initializeAuth();
      }, 600);
    } else {
      initializeAuth();
    }

    return () => {
      isMounted = false;
      if (idleCallbackId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      unsubscribe?.();
    };
  }, [clearAuth, setUser]);

  return children;
};
