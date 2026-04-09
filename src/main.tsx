import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

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
const canHydratePrerenderedHome =
  rootElement.hasChildNodes() &&
  window.location.pathname === '/' &&
  window.matchMedia('(min-width: 768px)').matches &&
  detectedLanguage === 'en';

if (canHydratePrerenderedHome) {
  hydrateRoot(rootElement, app);
} else {
  // Fall back to a client render when the prerendered markup may not match.
  rootElement.innerHTML = '';
  createRoot(rootElement).render(app);
}
