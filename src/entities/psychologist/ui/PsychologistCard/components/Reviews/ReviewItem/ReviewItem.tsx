import type { ReviewUI } from '@entities/psychologist/model/types/psychologist-review';

import css from './ReviewItem.module.css';
import Avatar from '../../Avatar/Avatar';
import Rating from '../../Rating/Rating';

interface Props {
  review: ReviewUI;
}

const ReviewItem = ({ review }: Props) => {
  const { displayReviewer, displayComment } = review;

  return (
    <li className={css.review}>
      <div className={css.reviewHeader}>
        <Avatar reviewerName={displayReviewer} />

        <div className={css.reviewRatingContainer}>
          <h4 className={css.reviewerName}>{displayReviewer}</h4>
          <Rating isReviewItem review={review} />
        </div>
      </div>

      <p className={css.reviewText}>{displayComment}</p>
    </li>
  );
};

export default ReviewItem;
