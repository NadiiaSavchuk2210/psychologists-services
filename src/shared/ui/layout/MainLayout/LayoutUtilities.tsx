import { lazy, Suspense } from 'react';

const ThemeSwitcher = lazy(
  () => import('@features/theme-switcher/ui/ThemeSwitcher')
);
const LanguageSwitcher = lazy(
  () => import('@shared/ui/LanguageSwitcher/LanguageSwitcher')
);
const Toast = lazy(() => import('@shared/ui/Toast/Toast'));

const LayoutUtilities = () => {
  return (
    <Suspense fallback={null}>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <Toast />
    </Suspense>
  );
};

export default LayoutUtilities;
