import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ROUTES } from './routesConfig';
import { MainLayout } from '@shared/ui';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [...publicRoutes, ...privateRoutes],
  },
];

export const router = createBrowserRouter(routes);
