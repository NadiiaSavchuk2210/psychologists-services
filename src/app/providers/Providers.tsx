import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './theme';
import { queryClient } from './queryClient/queryClient';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
