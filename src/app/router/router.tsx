import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ROUTES } from './routesConfig';
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import MainLayout from '../../layouts/MainLayout/MainLayout';

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [...publicRoutes, ...privateRoutes],
  },
];

export const router = createBrowserRouter(routes);
