import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './theme';
import { queryClient } from './queryClient/queryClient';
import { AuthProvider } from './auth/AuthProvider';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
