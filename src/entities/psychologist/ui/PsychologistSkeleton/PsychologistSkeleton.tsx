import clsx from 'clsx';

import css from './PsychologistSkeleton.module.css';

const PsychologistSkeleton = () => {
  return (
    <div className={clsx(css.skeletonCard, 'container')}>
      <div className={clsx(css.avatar, css.shimmer)} />

      <div className={css.content}>
        <div className={css.topRow}>
          <div className={css.nameRow}>
            <div className={clsx(css.shimmer, css.nameLine)} />
            <div className={clsx(css.shimmer, css.titleLine)} />
          </div>

          <div className={css.ratingRow}>
            <div className={clsx(css.shimmer, css.ratingBadge)} />
            <div className={clsx(css.shimmer, css.priceBadge)} />
          </div>
        </div>

        <div className={css.metaRow}>
          <div className={clsx(css.shimmer, css.specialtyLine)} />
          <div className={clsx(css.shimmer, css.consultLine)} />
        </div>

        <div className={css.description}>
          <div className={clsx(css.shimmer, css.descLine1)} />
          <div className={clsx(css.shimmer, css.descLine2)} />
        </div>

        <div className={clsx(css.shimmer, css.readMoreButton)} />
      </div>
    </div>
  );
};

export default PsychologistSkeleton;
