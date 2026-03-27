import { Link } from 'react-router-dom';

import { useErrorTranslation } from '@shared/hooks';
import { useMetaTags } from '@shared/hooks/useMetaTags';

import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const { t, i18n } = useErrorTranslation();

  useMetaTags({
    t,
    i18n,
    path: 'error',
  });

  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.code}>Error</div>
        <p className={styles.text}>{t('title')}</p>
        <p className={styles.text}>{t('text')}</p>
        <Link to="/" className={styles.button}>
          {t('buttonGoHome')}
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
