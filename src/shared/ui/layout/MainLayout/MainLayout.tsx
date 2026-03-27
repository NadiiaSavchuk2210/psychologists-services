import { Outlet } from 'react-router-dom';

import { ThemeSwitcher } from '@features/theme-switcher';
import LanguageSwitcher from '@shared/ui/LanguageSwitcher/LanguageSwitcher';
import Toast from '@shared/ui/Toast/Toast';
import { Header } from '@widgets/header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />

      <ThemeSwitcher />
      <LanguageSwitcher />
      <Toast />
    </>
  );
};

export default MainLayout;
