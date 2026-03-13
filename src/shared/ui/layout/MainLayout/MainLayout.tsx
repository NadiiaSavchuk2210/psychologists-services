import { Outlet } from 'react-router-dom';
import { Header } from '@widgets/header';
import { ThemeSwitcher } from '@features/theme-switcher';
import LanguageSwitcher from '@shared/ui/LanguageSwitcher/LanguageSwitcher';
import Toast from '@shared/ui/Toast/Toast';
import Providers from '@app/providers/Providers';

const MainLayout = () => {
  return (
    <Providers>
      <Header />
      <Outlet />

      <ThemeSwitcher />
      <LanguageSwitcher />
      <Toast />
    </Providers>
  );
};

export default MainLayout;
