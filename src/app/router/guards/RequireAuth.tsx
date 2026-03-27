import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '@shared/lib/store/authStore';
import { Loader } from '@shared/ui';

import { ROUTES } from '../routesConfig';

interface Props {
  children?: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.HOME}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children ?? <Outlet />;
};

export default RequireAuth;
