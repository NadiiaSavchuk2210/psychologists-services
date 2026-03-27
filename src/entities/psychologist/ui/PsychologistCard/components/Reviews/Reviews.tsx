import type { PsychologistUI } from '@entities/psychologist';

import ReviewItem from './ReviewItem/ReviewItem';
import css from './Reviews.module.css';

interface Props {
  psychologist: PsychologistUI;
}

const Reviews = ({ psychologist }: Props) => {
  const { displayReviews } = psychologist;

  return (
    <ul className={css.reviewsList}>
      {displayReviews.map((review, index) => (
        <ReviewItem
          key={`${review.displayReviewer}-${review.rating}-${index}`}
          review={review}
        />
      ))}
    </ul>
  );
};

export default Reviews;
