import { redirect } from 'react-router-dom';
import { ROUTES } from '../routesConfig';
import { useAuthStore } from '@shared/lib/store/authStore';

export async function requireAuth() {
  const { isAuthenticated } = useAuthStore.getState();

  if (!isAuthenticated) {
    throw redirect(ROUTES.HOME);
  }

  return null;
}
