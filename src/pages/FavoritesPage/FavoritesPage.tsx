import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';

import { PsychologistSkeleton, type SortOption } from '@entities/psychologist';
import { useFavoritesWithSorting } from '@features/favorites/model/hooks/useFavoritesWithSorting';
import AppointmentModal from '@features/make-appointment/ui/AppointmentModal/AppointmentModal';
import FilterSelect from '@features/psychologists-sort/ui/FilterSelect/FilterSelect';
import { HOME_PAGE_URL, OG_IMAGE } from '@shared/constants/metadata';
import { PSYCHOLOGISTS_PER_PAGE } from '@shared/constants/psychologist-api';
import {
  PRICE_LIMITS,
  SORT_OPTIONS,
} from '@shared/constants/psychologist-sort';
import {
  useFavoritesTranslation,
  useMetaTags,
  useScrollToNewItem,
  useScrollToTopOnLanguageChange,
} from '@shared/hooks';
import { useModalStore } from '@shared/lib/store/modalStore';
import { Button, EmptyState, ErrorMessage } from '@shared/ui';
import PsychologistsList from '@widgets/psychologists-list/ui/PsychologistsList';

import css from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const { isAppointmentOpen, closeAppointment } = useModalStore();

  const [activeSort, setActiveSort] = useState<SortOption>(
    SORT_OPTIONS.POPULAR
  );
  const [page, setPage] = useState(1);
  const { t, i18n } = useFavoritesTranslation();
  const TOP_OFFSET = 220;

  useMetaTags({
    t,
    i18n,
    titleKey: 'meta.title',
    descriptionKey: 'meta.description',
    ogTitleKey: 'meta.ogTitle',
    ogDescriptionKey: 'meta.ogDescription',
    ogImage: `${HOME_PAGE_URL}/${OG_IMAGE}`,
    ogUrl: `${HOME_PAGE_URL}/favorites`,
    canonicalUrl: `${HOME_PAGE_URL}/favorites`,
  });

  const {
    sorted: localizedFavorites,
    isLoading,
    error,
  } = useFavoritesWithSorting(activeSort);

  const isReady = !isLoading && !error;

  const filtered = useMemo(() => {
    switch (activeSort) {
      case SORT_OPTIONS.CHEAP:
        return localizedFavorites.filter(
          p => p.price_per_hour <= PRICE_LIMITS.CHEAP_MAX
        );
      case SORT_OPTIONS.EXPENSIVE:
        return localizedFavorites.filter(
          p => p.price_per_hour > PRICE_LIMITS.EXPENSIVE_MIN
        );
      default:
        return localizedFavorites;
    }
  }, [localizedFavorites, activeSort]);

  const listRef = useRef<HTMLUListElement>(null);
  const visibleItems = useMemo(() => {
    return filtered.slice(0, page * PSYCHOLOGISTS_PER_PAGE);
  }, [filtered, page]);

  useScrollToNewItem(listRef, visibleItems.length, TOP_OFFSET, [i18n.language]);
  useScrollToTopOnLanguageChange(i18n);

  const handleSortChange = (value: SortOption) => {
    setActiveSort(value);
    setPage(1);
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

            {page * PSYCHOLOGISTS_PER_PAGE < filtered.length && (
              <Button
                className={css.btnLoadMore}
                onClick={() => setPage(p => p + 1)}
              >
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

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onOpenChange={closeAppointment}
      />
    </>
  );
};

export default FavoritesPage;
