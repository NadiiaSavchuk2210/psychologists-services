import { useLocation } from 'react-router-dom';

import { ROUTES } from '@app/router/routesConfig';

import DeferredLayoutUtilities from './DeferredLayoutUtilities';
import LayoutShell from './LayoutShell';
import LayoutUtilities from './LayoutUtilities';

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <>
      <LayoutShell />
      {isHomePage ? <DeferredLayoutUtilities /> : <LayoutUtilities />}
    </>
  );
};

export default MainLayout;
