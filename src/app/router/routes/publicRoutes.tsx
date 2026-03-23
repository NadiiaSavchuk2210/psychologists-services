import type { RouteObject } from 'react-router-dom';
import SuspenseWrapper from '@shared/ui/SuspenseWrapper/SuspenseWrapper';
import { lazy } from 'react';
import { ROUTES } from '../routesConfig';

const HomePage = lazy(() => import('@pages/HomePage/HomePage'));
const PsychologistsPage = lazy(
  () => import('@pages/PsychologistsPage/PsychologistsPage')
);

const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));

const publicRoutes: RouteObject[] = [
  { index: true, element: SuspenseWrapper(<HomePage />) },
  {
    path: ROUTES.PSYCHOLOGISTS,
    children: [
      { index: true, element: SuspenseWrapper(<PsychologistsPage />) },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: SuspenseWrapper(<NotFoundPage />) },
];

export default publicRoutes;
