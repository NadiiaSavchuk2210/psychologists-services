import { HOME_PAGE_URL, OG_IMAGE } from '../../shared/constants/metadata';
import { PsychologistSkeleton, type SortOption } from '@entities/psychologist';
import { useState } from 'react';
import {
  PSYCHOLOGISTS_PER_PAGE,
  SORT_OPTIONS,
} from '@shared/constants/psychologist';
import PsychologistsList from '@widgets/psychologists-list/ui/PsychologistsList';
import { useLocalizedPsychologists } from '@entities/psychologist/model/hooks/useLocalizedPsychologists';
import css from './PsychologistsPage.module.css';
import { usePsychologistsTranslation } from '@shared/hooks';
import { Button, ErrorMessage } from '@shared/ui';
import SortFilter from '@features/psychologists-sort/SortFilter';
import EmptyState from '@shared/EmptyState/EmptyState';

const PsychologistsPage = () => {
  const [activeSort, setActiveSort] = useState<SortOption>(
    SORT_OPTIONS.ALL as SortOption
  );

  const { t } = usePsychologistsTranslation();

  const { data, fetchNextPage, hasNextPage, isLoading, error, isFetching } =
    useLocalizedPsychologists(activeSort);

  const psychologists = data?.pages.flatMap(p => p.items) ?? [];

  if (!psychologists.length && !isFetching) {
    return (
      <EmptyState title={t('emptyTitle')} description={t('emptyDescription')} />
    );
  }

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
      <main className={css.main}>
        <h1 className="visually-hidden">{t('title')}</h1>

        {/* FILTERS */}
        <SortFilter activeSort={activeSort} onChange={setActiveSort} />

        {/* LOADING */}
        {isLoading && (
          <div className={css.loadingContainer}>
            {Array.from({ length: PSYCHOLOGISTS_PER_PAGE }).map((_, i) => (
              <PsychologistSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && <ErrorMessage message={error.message} />}

        {/* CONTENT */}
        {!isLoading && !error && (
          <>
            <PsychologistsList psychologists={psychologists} />

            {hasNextPage && (
              <Button
                className={css.btnLoadMore}
                onClick={() => fetchNextPage()}
              >
                {isFetching ? t('loadingMore') : t('loadMore')}
              </Button>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default PsychologistsPage;
