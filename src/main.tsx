import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@app/App';
import i18n from '@shared/lib/i18n/i18n';

import Providers from './app/providers/Providers';
import 'modern-normalize';
import './styles/fonts.css';
import './styles/index.css';

const rootElement = document.getElementById('root')!;
const app = (
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
const detectedLanguage = i18n.resolvedLanguage ?? i18n.language;
const hasPrerenderedHomeMarkup =
  rootElement.hasChildNodes() &&
  window.location.pathname === '/' &&
  detectedLanguage === 'en';

if (hasPrerenderedHomeMarkup || rootElement.hasChildNodes()) {
  rootElement.innerHTML = '';
}

createRoot(rootElement).render(app);
