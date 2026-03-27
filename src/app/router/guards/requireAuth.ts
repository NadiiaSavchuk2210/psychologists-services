import { redirect } from 'react-router-dom';

import { useAuthStore } from '@shared/lib/store/authStore';

import { ROUTES } from '../routesConfig';

export async function requireAuth() {
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated) {
    throw redirect(ROUTES.HOME);
  }

  return null;
}
