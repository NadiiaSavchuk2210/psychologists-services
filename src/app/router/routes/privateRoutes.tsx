import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '../routesConfig';
import { lazy } from 'react';
import { requireAuth } from '../guards/requireAuth';
import { SuspenseWrapper } from '@shared/ui';

const FavoritesPage = lazy(() => import('@pages/FavoritesPage/FavoritesPage'));

const privateRoutes: RouteObject[] = [
  {
    path: ROUTES.FAVORITES,
    loader: requireAuth,
    element: SuspenseWrapper(<FavoritesPage />),
  },
];

export default privateRoutes;
