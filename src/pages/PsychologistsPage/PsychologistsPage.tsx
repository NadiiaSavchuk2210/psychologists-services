import clsx from 'clsx';
import { useRef, useState } from 'react';

import {
  PsychologistSkeleton,
  type SortOption,
  useFilteredPsychologistsBySort,
} from '@entities/psychologist';
import { useLocalizedPsychologists } from '@entities/psychologist/model/hooks/useLocalizedPsychologists';
import AppointmentModal from '@features/make-appointment/ui/AppointmentModal/AppointmentModal';
import FilterSelect from '@features/psychologists-sort/ui/FilterSelect/FilterSelect';
import { PSYCHOLOGISTS_PER_PAGE } from '@shared/constants/psychologist-api';
import { SORT_OPTIONS } from '@shared/constants/psychologist-sort';
import {
  useMetaTags,
  usePsychologistsTranslation,
  useScrollToNewItem,
  useScrollToTopOnLanguageChange,
} from '@shared/hooks';
import { useModalStore } from '@shared/lib/store/modalStore';
import { Button, EmptyState, ErrorMessage } from '@shared/ui';
import PsychologistsList from '@widgets/psychologists-list/ui/PsychologistsList';

import css from './PsychologistsPage.module.css';

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
    path: 'psychologists',
  });

  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useLocalizedPsychologists(activeSort);

  const isReady = !isLoading && !error;
  const psychologists = data?.pages.flatMap(page => page.items) ?? [];
  const filtered = useFilteredPsychologistsBySort(psychologists, activeSort);

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
