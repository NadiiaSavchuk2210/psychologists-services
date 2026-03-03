import { Outlet } from 'react-router-dom';
import Navbar from '../../features/navbar/ui/Navbar';
import ThemeSwitcher from '../../features/theme-switcher/ui/ThemeSwitcher';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />

      <ThemeSwitcher />
    </>
  );
};

export default MainLayout;
