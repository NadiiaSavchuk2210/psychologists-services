import css from './CardHeader.module.css';
import { PriceInfo, Rating, Icon } from '@shared/ui';
import type { Psychologist } from '@entities/psychologist/model/types/psychologist';
import { usePsychologistsTranslation } from '@shared/hooks';

import clsx from 'clsx';
import BadgesList from '@shared/ui/BadgesList/BadgesList';
import PsychologistAvatar from '@entities/psychologist/ui/PsychologistAvatar/PsychologistAvatar';
import CardTrigger from '../CardTrigger/CardTrigger';
import CardDetails from '../CardDetails/CardDetails';

interface Props {
  psychologist: Psychologist;
  isExpanded: boolean;
  onToggle: () => void;
}

const CardHeader = ({ psychologist, isExpanded, onToggle }: Props) => {
  const campersFavorite: Psychologist[] = [];
  const isFavorite = campersFavorite.some(item => item.id === psychologist.id);

  const { t } = usePsychologistsTranslation();
  const { name } = psychologist;

  return (
    <div className={css.header}>
      <div className={css.headerAvatar}>
        <PsychologistAvatar psychologist={psychologist} />
      </div>

      <div className={css.headerContent}>
        <div className={css.top}>
          <div className={css.titleContainer}>
            <span className={css.category}>{t('psychologist')}</span>
            <h3 className={css.title}>{name}</h3>
          </div>

          <div className={css.detailsContainer}>
            <div className={css.infoContainer}>
              <Rating psychologist={psychologist} />
              <div className={css.divider}></div>
              <PriceInfo psychologist={psychologist} />
            </div>
            <button className={css.favoriteBtn}>
              <Icon
                className={clsx(css.favoriteIcon, isFavorite && css.isFavorite)}
                name="icon-heart"
                label="favorite"
                width={26}
                height={26}
              />
            </button>
          </div>
        </div>

        <div className={css.info}>
          <BadgesList psychologist={psychologist} />
          <p className={css.infoText}>{psychologist.about}</p>
        </div>

        <CardTrigger isExpanded={isExpanded} onToggle={onToggle} />

        <CardDetails isExpanded={isExpanded} psychologist={psychologist} />
      </div>
    </div>
  );
};

export default CardHeader;
