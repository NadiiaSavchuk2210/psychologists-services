import type { PsychologistUI } from '@entities/psychologist';
import PsychologistAvatar from '@entities/psychologist/ui/PsychologistAvatar/PsychologistAvatar';
import { useAppointmentTranslation } from '@shared/hooks';

import css from './AppointmentPsychologist.module.css';

interface Props {
  psychologist: PsychologistUI | null;
}

const AppointmentPsychologist = ({ psychologist }: Props) => {
  const { t } = useAppointmentTranslation();

  return (
    <div className={css['psychologist-info']}>
      <PsychologistAvatar isAppointment psychologist={psychologist} />

      <div className={css['psychologist-info__profile']}>
        <p className={css['psychologist-info__label']}>
          {t('yourPsychologist')}
        </p>
        <h3 className={css['psychologist-info__name']}>
          {psychologist?.displayName}
        </h3>
      </div>
    </div>
  );
};

export default AppointmentPsychologist;
