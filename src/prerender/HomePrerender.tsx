import { StaticRouter } from 'react-router-dom';

import { ThemeContext, type ThemeContextType } from '@app/providers/theme/theme.context';
import HomePage from '@pages/HomePage/HomePage';
import Header from '@widgets/header/ui/Header';

const themeContextValue: ThemeContextType = {
  theme: 'green',
  setTheme: () => undefined,
};

export const HomePrerender = () => {
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <StaticRouter location="/">
        <Header />
        <HomePage />
      </StaticRouter>
    </ThemeContext.Provider>
  );
};

export default HomePrerender;
