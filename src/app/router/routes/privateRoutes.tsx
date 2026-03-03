import type { RouteObject } from 'react-router-dom';
import SuspenseWrapper from '../../../shared/ui/SuspenseWrapper/SuspenseWrapper';
import { ROUTES } from '../routesConfig';
import { lazy } from 'react';
import { requireAuth } from '../guards/requireAuth';

const FavoritesPage = lazy(
  () => import('../../../pages/FavoritesPage/FavoritesPage')
);

const privateRoutes: RouteObject[] = [
  {
    path: ROUTES.FAVORITES,
    loader: requireAuth,
    element: SuspenseWrapper(<FavoritesPage />),
  },
];

export default privateRoutes;
