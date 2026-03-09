import { Outlet } from 'react-router-dom';
import Header from '../../Header/Header';
import { ThemeSwitcher } from '../../../../features/theme-switcher';


const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />

      <ThemeSwitcher />
    </>
  );
};

export default MainLayout;
