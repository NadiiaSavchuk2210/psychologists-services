import type { Psychologist } from '@entities/psychologist/model/types/psychologist';
import FallbackImg from '../../../../assets/images/psychologist-fallback.png';
import css from './PsychologistAvatar.module.css';

interface Props {
  psychologist: Psychologist;
}

const PsychologistAvatar = ({ psychologist }: Props) => {
  return (
    <div className={css.avatarContainer}>
      <img
        className={css.avatar}
        src={psychologist.avatar_url ?? FallbackImg}
        alt={psychologist.name}
        width={96}
      />
      <span className={css.avatarOnlineIndicator}></span>
    </div>
  );
};

export default PsychologistAvatar;
