import { Outlet } from 'react-router-dom';

import { Header } from '@widgets/header';

const LayoutShell = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutShell;
