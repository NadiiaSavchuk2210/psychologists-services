import { useMetaTags } from '@shared/hooks/useMetaTags';
import { HOME_PAGE_URL, OG_IMAGE } from '../../shared/constants/metadata';
import HomeHero from '../../widgets/home-hero/ui/HomeHero';
import { useHomeTranslation } from '@shared/hooks';

const HomePage = () => {
  const { t, i18n } = useHomeTranslation();

  useMetaTags({
    t,
    i18n,
    titleKey: 'meta.title',
    descriptionKey: 'meta.description',
    ogTitleKey: 'meta.ogTitle',
    ogDescriptionKey: 'meta.ogDescription',
    ogImage: `${HOME_PAGE_URL}/${OG_IMAGE}`,
    ogUrl: HOME_PAGE_URL,
    canonicalUrl: HOME_PAGE_URL,
  });
  return (
    <main>
      <HomeHero />
    </main>
  );
};

export default HomePage;
