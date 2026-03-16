import css from './BadgesList.module.css';
import { Trans } from 'react-i18next';
import { usePsychologistsTranslation } from '@shared/hooks';
import type { Psychologist } from '@entities/psychologist';
import Badge from '../Badge/Badge';

interface Props {
  psychologist: Psychologist;
}

const BadgesList = ({ psychologist }: Props) => {
  const { t } = usePsychologistsTranslation();

  const badgeKeys = [
    'experience',
    'license',
    'specialization',
    'initialConsultation',
  ] as const;

  return (
    <ul className={css.badgesList}>
      {badgeKeys.map(key => (
        <li key={key} className={css.badgeItem}>
          <Badge>
            <Trans
              i18nKey={key}
              t={t}
              values={{
                experience: psychologist.experience,
                license: psychologist.license,
                specialization: psychologist.specialization,
                consultation: psychologist.initial_consultation,
              }}
              components={{
                label: <span className={css.badgeTitle} />,
                value: <span className={css.badgeValue} />,
              }}
            />
          </Badge>
        </li>
      ))}
    </ul>
  );
};

export default BadgesList;
