import { HOME_PAGE_URL, OG_IMAGE } from '../../shared/constants/metadata';
import { PsychologistSkeleton, type SortOption } from '@entities/psychologist';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PSYCHOLOGISTS_PER_PAGE } from '@shared/constants/psychologist-api';
import PsychologistsList from '@widgets/psychologists-list/ui/PsychologistsList';
import { useLocalizedPsychologists } from '@entities/psychologist/model/hooks/useLocalizedPsychologists';
import css from './PsychologistsPage.module.css';
import { usePsychologistsTranslation } from '@shared/hooks';
import { Button, ErrorMessage } from '@shared/ui';
import EmptyState from '@shared/EmptyState/EmptyState';
import { SORT_OPTIONS } from '@shared/constants/psychologist-sort';
import FilterSelect from '@features/psychologists-sort/FilterSelect';
import clsx from 'clsx';

const PsychologistsPage = () => {
  const [activeSort, setActiveSort] = useState<SortOption>(
    SORT_OPTIONS.ALL as SortOption
  );

  const { t } = usePsychologistsTranslation();

  const { data, fetchNextPage, hasNextPage, isLoading, error, isFetching } =
    useLocalizedPsychologists(activeSort);

  const psychologists = data?.pages.flatMap(p => p.items) ?? [];

  const prevLengthRef = useRef(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (psychologists.length > prevLengthRef.current && listRef.current) {
      const firstNewIndex = prevLengthRef.current;
      const element = listRef.current.children[firstNewIndex] as HTMLElement;
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    prevLengthRef.current = psychologists.length;
  }, [psychologists]);

  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

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
        <FilterSelect activeSort={activeSort} onChange={setActiveSort} />

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
        {!isLoading && !error && psychologists.length > 0 && (
          <section className={clsx(css.psychologists, 'container')}>
            <h2 className="visually-hidden">{t('listTitle')}</h2>
            <ul className={css.psychologistsList} ref={listRef}>
              <PsychologistsList psychologists={psychologists} />
              {hasNextPage && (
                <Button
                  className={css.btnLoadMore}
                  onClick={() => handleLoadMore()}
                >
                  {isFetching ? t('loadingMore') : t('loadMore')}
                </Button>
              )}
            </ul>
          </section>
        )}

        {/* EMPTY STATE */}
        {!psychologists.length && !isFetching && (
          <EmptyState
            title={t('emptyTitle')}
            description={t('emptyDescription')}
          />
        )}
      </main>
    </>
  );
};

export default PsychologistsPage;
