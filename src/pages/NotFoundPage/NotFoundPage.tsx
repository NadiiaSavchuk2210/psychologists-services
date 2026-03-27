import { Link } from 'react-router-dom';

import { useNotFoundTranslation } from '@shared/hooks';
import { useMetaTags } from '@shared/hooks/useMetaTags';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const { t, i18n } = useNotFoundTranslation();

  useMetaTags({
    t,
    i18n,
    path: '404',
  });

  return (
    <main>
      <div className={css.wrapper}>
        <div className={css.code}>404</div>
        <p className={css.text}>{t('title')}</p>
        <p className={css.text}>{t('text')}</p>
        <Link to="/" className={css.button}>
          {t('buttonGoHome')}
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
