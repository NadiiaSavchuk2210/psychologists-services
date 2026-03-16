import type { Review } from '@entities/psychologist';
import css from './ReviewItem.module.css';
import Avatar from '@shared/ui/Avatar/Avatar';
import Rating from '@shared/ui/Rating/Rating';

interface Props {
  review: Review;
}

const ReviewItem = ({ review }: Props) => {
  return (
    <li className={css.review}>
      <div className={css.reviewHeader}>
        <Avatar reviewerName={review.reviewer} />

        <div className={css.reviewRatingContainer}>
          <h4 className={css.reviewerName}>{review.reviewer}</h4>
          <Rating isReviewItem review={review} />
        </div>
      </div>

      <p className={css.reviewText}>{review.comment}</p>
    </li>
  );
};

export default ReviewItem;
