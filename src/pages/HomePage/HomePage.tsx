import { useHomeTranslation } from '@shared/hooks';
import { useMetaTags } from '@shared/hooks/useMetaTags';

import HomeHero from '../../widgets/home-hero/ui/HomeHero';

const HomePage = () => {
  const { t, i18n } = useHomeTranslation();

  useMetaTags({
    t,
    i18n,
  });
  return (
    <main>
      <HomeHero />
    </main>
  );
};

export default HomePage;
