import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@app/App';

import Providers from './app/providers/Providers';
import 'modern-normalize';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './styles/index.css';
import './shared/lib/i18n/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
