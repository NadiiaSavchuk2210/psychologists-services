import clsx from 'clsx';

import type { PsychologistUI } from '@entities/psychologist/model/types/psychologist';

import css from './PsychologistAvatar.module.css';
import FallbackImg from '../../../../assets/images/psychologist-fallback.png';

interface Props {
  psychologist: PsychologistUI | null;
  isAppointment?: boolean;
}

const PsychologistAvatar = ({ psychologist, isAppointment = false }: Props) => {
  return (
    <div
      className={clsx(
        css.avatarContainer,
        isAppointment && css.appointmentAvatarContainer
      )}
    >
      <img
        className={clsx(css.avatar, isAppointment && css.appointmentAvatar)}
        src={psychologist?.avatar_url ?? FallbackImg}
        alt={psychologist?.name}
        width={96}
      />
      {!isAppointment && <span className={css.avatarOnlineIndicator}></span>}
    </div>
  );
};

export default PsychologistAvatar;
