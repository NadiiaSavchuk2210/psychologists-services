import type { PsychologistUI } from '@entities/psychologist';
import type { Review } from '@entities/psychologist/model/types/psychologist-review';
import { usePsychologistsTranslation } from '@shared/hooks';
import Icon from '@shared/ui/Icon/Icon';

import css from './Rating.module.css';

type PsychologistItem = {
  psychologist: PsychologistUI;
  isReviewItem?: false;
};

type ReviewItem = {
  review: Review;
  isReviewItem: true;
};

type Props = PsychologistItem | ReviewItem;

const Rating = (props: Props) => {
  const { t } = usePsychologistsTranslation();

  return (
    <div className={css.rating}>
      <Icon
        className={css.ratingIcon}
        name="icon-star"
        width={16}
        height={16}
      />

      {!props.isReviewItem ? (
        <span className={css.ratingText}>
          {t('rating', { rating: props.psychologist.rating })}
        </span>
      ) : (
        <span className={css.ratingNumber}>{props.review.rating}</span>
      )}
    </div>
  );
};

export default Rating;
