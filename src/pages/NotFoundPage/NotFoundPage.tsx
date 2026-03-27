import { Link } from 'react-router-dom';

import { HOME_PAGE_URL, OG_IMAGE } from '@shared/constants/metadata';
import { useNotFoundTranslation } from '@shared/hooks';
import { useMetaTags } from '@shared/hooks/useMetaTags';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const { t, i18n } = useNotFoundTranslation();

  useMetaTags({
    t,
    i18n,
    titleKey: 'meta.title',
    descriptionKey: 'meta.description',
    ogTitleKey: 'meta.ogTitle',
    ogDescriptionKey: 'meta.ogDescription',
    ogImage: `${HOME_PAGE_URL}/${OG_IMAGE}`,
    ogUrl: `${HOME_PAGE_URL}/404`,
    canonicalUrl: `${HOME_PAGE_URL}/404`,
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
