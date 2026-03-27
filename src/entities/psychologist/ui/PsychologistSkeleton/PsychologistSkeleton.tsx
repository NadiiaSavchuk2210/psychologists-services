import clsx from 'clsx';
import { motion, type Variants } from 'framer-motion';

import css from './PsychologistSkeleton.module.css';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const PsychologistSkeleton = () => {
  return (
    <motion.div
      className={clsx(css.skeletonCard, 'container')}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
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
    </motion.div>
  );
};

export default PsychologistSkeleton;
