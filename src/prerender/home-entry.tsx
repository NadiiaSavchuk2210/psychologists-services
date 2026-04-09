import { renderToString } from 'react-dom/server';

import '@shared/lib/i18n/i18n';

import HomePrerender from './HomePrerender';

export const renderHome = () => renderToString(<HomePrerender />);
