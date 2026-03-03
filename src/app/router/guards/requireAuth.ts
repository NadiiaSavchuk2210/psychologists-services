import { redirect } from 'react-router-dom';
import { ROUTES } from '../routesConfig';

export async function requireAuth() {
  const isAuthenticated = false; // TODO: ⏳ Temporary hardcoded value for testing. Replace with real auth check (localStorage/token/API)

  if (!isAuthenticated) {
    throw redirect(ROUTES.HOME);
  }

  return null;
}
