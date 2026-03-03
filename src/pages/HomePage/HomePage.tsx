import { HOME_PAGE_URL, OG_IMAGE } from '../../shared/constants/constants';

const HomePage = () => {
  return (
    <>
      <title>Psychologists & Therapy Services | Online & In-Person</title>
      <meta
        name="description"
        content="Find expert psychologists for stress, anxiety, depression, and relationship issues. Free initial consultations, easy online booking."
      />
      <meta
        property="og:title"
        content="Professional Psychology Help | Find Your Therapist"
      />
      <meta
        property="og:description"
        content="Access licensed therapists specializing in mental wellness. Start your journey to better mental health today."
      />
      <meta property="og:image" content={`${HOME_PAGE_URL}/${OG_IMAGE}`} />
      <meta property="og:url" content={HOME_PAGE_URL} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <main>
        <h1>HomePage</h1>
      </main>
    </>
  );
};

export default HomePage;
