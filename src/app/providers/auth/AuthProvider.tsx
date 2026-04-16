import { useEffect } from 'react';

import { ROUTES } from '@app/router/routesConfig';
import { useAuthStore } from '@shared/lib/store/authStore';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;
    const shouldDeferAuth = window.location.pathname !== ROUTES.FAVORITES;
    let idleCallbackId: number | undefined;
    let initTimeoutId: number | undefined;
    let loadTimeoutId: number | undefined;
    let hasStarted = false;
    const requestIdleCallback = window.requestIdleCallback?.bind(window);
    const cancelIdleCallback = window.cancelIdleCallback?.bind(window);

    const initializeAuth = () => {
      if (hasStarted) {
        return;
      }

      hasStarted = true;
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

    const scheduleDeferredAuth = () => {
      if (requestIdleCallback) {
        idleCallbackId = requestIdleCallback(() => {
          initializeAuth();
        }, { timeout: 4000 });
      } else {
        initTimeoutId = setTimeout(() => {
          initializeAuth();
        }, 1800);
      }
    };

    const handleWindowLoad = () => {
      if (loadTimeoutId !== undefined) {
        clearTimeout(loadTimeoutId);
      }

      scheduleDeferredAuth();
    };

    const handleUserIntent = () => {
      initializeAuth();
    };

    if (!shouldDeferAuth) {
      initializeAuth();
    } else if (document.readyState === 'complete') {
      window.addEventListener('pointerdown', handleUserIntent, { once: true });
      window.addEventListener('keydown', handleUserIntent, { once: true });
      scheduleDeferredAuth();
    } else {
      window.addEventListener('pointerdown', handleUserIntent, { once: true });
      window.addEventListener('keydown', handleUserIntent, { once: true });
      window.addEventListener('load', handleWindowLoad, { once: true });
      loadTimeoutId = setTimeout(handleWindowLoad, 3000);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('pointerdown', handleUserIntent);
      window.removeEventListener('keydown', handleUserIntent);
      window.removeEventListener('load', handleWindowLoad);
      if (idleCallbackId !== undefined && cancelIdleCallback) {
        cancelIdleCallback(idleCallbackId);
      }
      if (initTimeoutId !== undefined) {
        clearTimeout(initTimeoutId);
      }
      if (loadTimeoutId !== undefined) {
        clearTimeout(loadTimeoutId);
      }
      unsubscribe?.();
    };
  }, [clearAuth, setUser]);

  return children;
};
