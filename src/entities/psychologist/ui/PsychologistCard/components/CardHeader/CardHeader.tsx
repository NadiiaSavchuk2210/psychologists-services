import css from './CardHeader.module.css';
import { PriceInfo, Rating } from '@shared/ui';
import type { PsychologistUI } from '@entities/psychologist/model/types/psychologist';
import { usePsychologistsTranslation } from '@shared/hooks';

import BadgesList from '@shared/ui/BadgesList/BadgesList';
import PsychologistAvatar from '@entities/psychologist/ui/PsychologistAvatar/PsychologistAvatar';
import CardTrigger from '../CardTrigger/CardTrigger';
import CardDetails from '../CardDetails/CardDetails';
import { FavoriteButton } from '@features/favorites';

interface Props {
  psychologist: PsychologistUI;
  isExpanded: boolean;
  onToggle: () => void;
}

const CardHeader = ({ psychologist, isExpanded, onToggle }: Props) => {
  const { t } = usePsychologistsTranslation();
  const { displayName, displayAbout } = psychologist;

  return (
    <div className={css.header}>
      <div className={css.headerAvatar}>
        <PsychologistAvatar psychologist={psychologist} />
      </div>

      <div className={css.headerContent}>
        <div className={css.top}>
          <div className={css.titleContainer}>
            <span className={css.category}>{t('psychologist')}</span>
            <h3 className={css.title}>{displayName}</h3>
          </div>

          <div className={css.detailsContainer}>
            <div className={css.infoContainer}>
              <Rating psychologist={psychologist} />
              <div className={css.divider}></div>
              <PriceInfo psychologist={psychologist} />
            </div>
            <FavoriteButton item={psychologist} />
          </div>
        </div>

        <div className={css.info}>
          <BadgesList psychologist={psychologist} />
          <p className={css.infoText}>{displayAbout}</p>
        </div>

        <CardTrigger isExpanded={isExpanded} onToggle={onToggle} />
        <CardDetails isExpanded={isExpanded} psychologist={psychologist} />
      </div>
    </div>
  );
};

export default CardHeader;
