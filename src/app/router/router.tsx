import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import ErrorPage from '@pages/ErrorPage/ErrorPage';
import { MainLayout } from '@shared/ui';

import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';
import { ROUTES } from './routesConfig';

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [...publicRoutes, ...privateRoutes],
  },
];

export const router = createBrowserRouter(routes);
