import clsx from 'clsx';

import type { PsychologistUI } from '@entities/psychologist/model/types/psychologist';

import css from './PsychologistAvatar.module.css';
import FallbackImg from '../../../../assets/images/psychologist-fallback.png';

interface Props {
  psychologist: PsychologistUI | null;
  isAppointment?: boolean;
  priority?: boolean;
}

const PsychologistAvatar = ({
  psychologist,
  isAppointment = false,
  priority = false,
}: Props) => {
  const isEager = isAppointment || priority;

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
        height={96}
        loading={isEager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
      {!isAppointment && <span className={css.avatarOnlineIndicator}></span>}
    </div>
  );
};

export default PsychologistAvatar;
