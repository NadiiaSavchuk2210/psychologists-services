import { HOME_PAGE_URL, OG_IMAGE } from '../../shared/constants/metadata';
import { PsychologistSkeleton, type SortOption } from '@entities/psychologist';
import { useMemo, useRef, useState } from 'react';
import { PSYCHOLOGISTS_PER_PAGE } from '@shared/constants/psychologist-api';
import PsychologistsList from '@widgets/psychologists-list/ui/PsychologistsList';
import { useLocalizedPsychologists } from '@entities/psychologist/model/hooks/useLocalizedPsychologists';
import css from './PsychologistsPage.module.css';
import {
  usePsychologistsTranslation,
  useScrollToNewItem,
  useScrollToTopOnLanguageChange,
} from '@shared/hooks';
import { Button, EmptyState, ErrorMessage } from '@shared/ui';
import {
  PRICE_LIMITS,
  SORT_OPTIONS,
} from '@shared/constants/psychologist-sort';
import FilterSelect from '@features/psychologists-sort/ui/FilterSelect/FilterSelect';
import clsx from 'clsx';
import { useMetaTags } from '@shared/hooks/useMetaTags';
import AppointmentModal from '@features/make-appointment/ui/AppointmentModal/AppointmentModal';
import { useModalStore } from '@shared/lib/store/modalStore';

const PsychologistsPage = () => {
  const { isAppointmentOpen, closeAppointment } = useModalStore();

  const [activeSort, setActiveSort] = useState<SortOption>(
    SORT_OPTIONS.ALL as SortOption
  );

  const { t, i18n } = usePsychologistsTranslation();
  const TOP_OFFSET = 220;

  useMetaTags({
    t,
    i18n,
    ogImage: `${HOME_PAGE_URL}/${OG_IMAGE}`,
    ogUrl: HOME_PAGE_URL,
    canonicalUrl: HOME_PAGE_URL,
  });

  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useLocalizedPsychologists(activeSort);

  const isReady = !isLoading && !error;

  const psychologists = data?.pages.flatMap(p => p.items) ?? [];

  const filtered = useMemo(() => {
    switch (activeSort) {
      case SORT_OPTIONS.CHEAP:
        return psychologists.filter(
          p => p.price_per_hour < PRICE_LIMITS.CHEAP_MAX
        );

      case SORT_OPTIONS.EXPENSIVE:
        return psychologists.filter(
          p => p.price_per_hour >= PRICE_LIMITS.EXPENSIVE_MIN
        );

      default:
        return psychologists;
    }
  }, [psychologists, activeSort]);

  const listRef = useRef<HTMLUListElement>(null);
  useScrollToNewItem(listRef, filtered.length, TOP_OFFSET, [i18n.language]);
  useScrollToTopOnLanguageChange(i18n);

  return (
    <>
      <main className={css.main}>
        <h1 className="visually-hidden">{t('title')}</h1>

        <FilterSelect activeSort={activeSort} onChange={setActiveSort} />

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
            <PsychologistsList ref={listRef} psychologists={filtered} />
            {hasNextPage && (
              <Button
                className={css.btnLoadMore}
                onClick={() => fetchNextPage()}
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

export default PsychologistsPage;
