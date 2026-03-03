import { HOME_PAGE_URL, OG_IMAGE } from '../../shared/constants/constants';

const PsychologistsPage = () => {
  return (
    <>
      <title>Psychologists Directory | Ratings, Reviews & Specialties</title>
      <meta
        name="description"
        content="Browse 50+ licensed psychologists by specialization: depression, relationships, anxiety. Filter by rating, price, experience."
      />
      <meta property="og:title" content="Find Top Psychologists Near You" />
      <meta
        property="og:description"
        content="Discover verified therapists with client reviews. Compare rates from $120/hour and book securely online."
      />
      <meta property="og:image" content={`${HOME_PAGE_URL}/${OG_IMAGE}`} />
      <meta property="og:url" content={HOME_PAGE_URL} />
      <meta name="twitter:card" content="summary_large_image" />

      <main>
        <h1>PsychologistsPage</h1>
      </main>
    </>
  );
};

export default PsychologistsPage;
