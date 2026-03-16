import css from './Reviews.module.css';
import { ReviewItem } from '..';
import type { Psychologist } from '@entities/psychologist';

interface Props {
  psychologist: Psychologist;
}

const Reviews = ({ psychologist }: Props) => {
  const { reviews } = psychologist;

  return (
    <ul className={css.reviewsList}>
      {reviews.map(review => (
        <ReviewItem
          key={`${psychologist.id}-${review.reviewer}`}
          review={review}
        />
      ))}
    </ul>
  );
};

export default Reviews;
