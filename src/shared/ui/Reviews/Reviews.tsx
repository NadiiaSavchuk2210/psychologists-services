import css from './Reviews.module.css';
import { ReviewItem } from '..';
import type { PsychologistUI } from '@entities/psychologist';

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
