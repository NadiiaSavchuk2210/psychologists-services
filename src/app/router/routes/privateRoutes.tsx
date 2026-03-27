import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { SuspenseWrapper } from '@shared/ui';

import RequireAuth from '../guards/RequireAuth';
import { ROUTES } from '../routesConfig';

const FavoritesPage = lazy(() => import('@pages/FavoritesPage/FavoritesPage'));

const privateRoutes: RouteObject[] = [
  {
    path: ROUTES.FAVORITES,
    element: SuspenseWrapper(
      <RequireAuth>
        <FavoritesPage />
      </RequireAuth>
    ),
  },
];

export default privateRoutes;
