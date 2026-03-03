import { HOME_PAGE_URL, OG_IMAGE } from '../../shared/constants/constants';

const FavoritesPage = () => {
  return (
    <>
      <title>Your Favorite Psychologists | Compare & Book</title>
      <meta
        name="description"
        content="Manage saved therapists: compare ratings, prices, specializations. Quick booking from your personalized list."
      />
      <meta property="og:title" content="Saved Psychologists" />
      <meta
        property="og:description"
        content="Your curated list of favorite therapists for easy session scheduling and comparison."
      />
      <meta property="og:image" content={`${HOME_PAGE_URL}/${OG_IMAGE}`} />
      <meta property="og:url" content={HOME_PAGE_URL} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <main>
        <h1>FavoritesPage</h1>
      </main>
    </>
  );
};

export default FavoritesPage;
