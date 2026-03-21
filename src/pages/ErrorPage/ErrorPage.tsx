import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import { useMetaTags } from '@shared/hooks/useMetaTags';
import { useErrorTranslation } from '@shared/hooks';
import { HOME_PAGE_URL, OG_IMAGE } from '@shared/constants/metadata';

const ErrorPage = () => {
  const { t, i18n } = useErrorTranslation();

  useMetaTags({
    t,
    i18n,
    titleKey: 'meta.title',
    descriptionKey: 'meta.description',
    ogTitleKey: 'meta.ogTitle',
    ogDescriptionKey: 'meta.ogDescription',
    ogImage: `${HOME_PAGE_URL}/${OG_IMAGE}`,
    ogUrl: `${HOME_PAGE_URL}/error`,
    canonicalUrl: `${HOME_PAGE_URL}/error`,
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
