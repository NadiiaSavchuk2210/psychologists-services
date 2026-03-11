import { Outlet } from 'react-router-dom';

import { LanguageSwitcher } from '@shared/ui/LanguageSwitcher/LanguageSwitcher';
import { Header } from '@widgets/header';
import { ThemeSwitcher } from '@features/theme-switcher';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />

      <ThemeSwitcher />
      <LanguageSwitcher />
    </>
  );
};

export default MainLayout;
