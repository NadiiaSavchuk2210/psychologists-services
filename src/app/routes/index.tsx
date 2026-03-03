import { lazy, Suspense } from 'react';
import { ROUTES } from './routesConfig';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Loader from '../../shared/ui/Loader/Loader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const PsychologistsPage = lazy(
  () => import('../../pages/PsychologistsPage/PsychologistsPage')
);
const PsychologistDetailsPage = lazy(
  () => import('../../pages/PsychologistDetailsPage/PsychologistDetailsPage')
);
const FavoritesPage = lazy(
  () => import('../../pages/FavoritesPage/FavoritesPage')
);
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage')
);

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<Loader />}>{element}</Suspense>
);

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      {
        path: ROUTES.PSYCHOLOGISTS,
        children: [
          { index: true, element: withSuspense(<PsychologistsPage />) },
          { path: ':id', element: withSuspense(<PsychologistDetailsPage />) },
        ],
      },
      {
        path: ROUTES.FAVORITES,
        element: withSuspense(<FavoritesPage />),
      },
      { path: ROUTES.NOT_FOUND, element: withSuspense(<NotFoundPage />) },
    ],
  },
];

export const router = createBrowserRouter(routes);
