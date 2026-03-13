import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Providers from './app/providers/Providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'modern-normalize';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './styles/index.css';
import './shared/lib/i18n/i18n.ts';
import App from '@app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Providers>
  </StrictMode>
);
