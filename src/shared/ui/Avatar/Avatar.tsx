import { getInitial } from '@shared/utils';
import css from './Avatar.module.css';

interface Props {
  reviewerName: string;
}

const Avatar = ({ reviewerName }: Props) => {
  return (
    <div className={css.avatar}>
      <span className={css.avatarLetter}>{getInitial(reviewerName)}</span>
    </div>
  );
};

export default Avatar;
