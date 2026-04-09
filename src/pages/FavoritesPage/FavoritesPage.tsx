import clsx from 'clsx';
import { Suspense, lazy, useRef, useState } from 'react';

import {
  PsychologistSkeleton,
  type SortOption,
  useFilteredPsychologistsBySort,
} from '@entities/psychologist';
import { useFavoritesWithSorting } from '@features/favorites/model/hooks/useFavoritesWithSorting';
import FilterSelect from '@features/psychologists-sort/ui/FilterSelect/FilterSelect';
import { PSYCHOLOGISTS_PER_PAGE } from '@shared/constants/psychologist-api';
import { SORT_OPTIONS } from '@shared/constants/psychologist-sort';
import {
  useFavoritesTranslation,
  useMetaTags,
  usePaginatedItems,
  useScrollToNewItem,
  useScrollToTopOnLanguageChange,
} from '@shared/hooks';
import { useModalStore } from '@shared/lib/store/modalStore';
import { Button, EmptyState, ErrorMessage, Loader } from '@shared/ui';
import PsychologistsList from '@widgets/psychologists-list/ui/PsychologistsList';

import css from './FavoritesPage.module.css';

const AppointmentModal = lazy(
  () => import('@features/make-appointment/ui/AppointmentModal/AppointmentModal')
);

const FavoritesPage = () => {
  const { isAppointmentOpen, closeAppointment } = useModalStore();

  const [activeSort, setActiveSort] = useState<SortOption>(
    SORT_OPTIONS.POPULAR
  );
  const { t, i18n } = useFavoritesTranslation();
  const TOP_OFFSET = 220;

  useMetaTags({
    t,
    i18n,
    path: 'favorites',
  });

  const {
    sorted: localizedFavorites,
    isLoading,
    error,
  } = useFavoritesWithSorting(activeSort);

  const isReady = !isLoading && !error;
  const filtered = useFilteredPsychologistsBySort(
    localizedFavorites,
    activeSort
  );

  const listRef = useRef<HTMLUListElement>(null);
  const { visibleItems, hasMore, loadMore, resetPagination } =
    usePaginatedItems(filtered, PSYCHOLOGISTS_PER_PAGE);

  useScrollToNewItem(listRef, visibleItems.length, TOP_OFFSET, [i18n.language]);
  useScrollToTopOnLanguageChange(i18n);

  const handleSortChange = (value: SortOption) => {
    setActiveSort(value);
    resetPagination();
  };

  return (
    <>
      <main className={css.main}>
        <h1 className="visually-hidden">{t('title')}</h1>

        <FilterSelect activeSort={activeSort} onChange={handleSortChange} />

        {isLoading && (
          <div className={css.loadingContainer}>
            {Array.from({ length: PSYCHOLOGISTS_PER_PAGE }).map((_, i) => (
              <PsychologistSkeleton key={i} />
            ))}
          </div>
        )}

        {error && <ErrorMessage message={error.message} />}

        {isReady && filtered.length > 0 && (
          <section className={clsx(css.psychologists, 'container')}>
            <h2 className="visually-hidden">{t('listTitle')}</h2>
            <PsychologistsList ref={listRef} psychologists={visibleItems} />

            {hasMore && (
              <Button className={css.btnLoadMore} onClick={loadMore}>
                {isLoading ? t('loadingMore') : t('loadMore')}
              </Button>
            )}
          </section>
        )}

        {isReady && filtered.length === 0 && (
          <EmptyState
            title={t('emptyTitle')}
            description={t('emptyDescription')}
          />
        )}
      </main>

      {isAppointmentOpen && (
        <Suspense fallback={<Loader />}>
          <AppointmentModal
            isOpen={isAppointmentOpen}
            onOpenChange={closeAppointment}
          />
        </Suspense>
      )}
    </>
  );
};

export default FavoritesPage;
