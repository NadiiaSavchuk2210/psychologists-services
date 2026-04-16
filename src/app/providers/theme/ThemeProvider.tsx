import { ThemeContext } from './theme.context';
import { useThemeState } from './useThemeState';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const { theme, setTheme } = useThemeState();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
