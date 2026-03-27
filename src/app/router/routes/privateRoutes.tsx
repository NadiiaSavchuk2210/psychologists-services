import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { SuspenseWrapper } from '@shared/ui';

import { requireAuth } from '../guards/requireAuth';
import { ROUTES } from '../routesConfig';

const FavoritesPage = lazy(() => import('@pages/FavoritesPage/FavoritesPage'));

const privateRoutes: RouteObject[] = [
  {
    path: ROUTES.FAVORITES,
    loader: requireAuth,
    element: SuspenseWrapper(<FavoritesPage />),
  },
];

export default privateRoutes;
