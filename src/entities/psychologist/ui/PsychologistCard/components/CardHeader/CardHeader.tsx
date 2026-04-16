import type { PsychologistUI } from '@entities/psychologist/model/types/psychologist';
import PsychologistAvatar from '@entities/psychologist/ui/PsychologistAvatar/PsychologistAvatar';
import { FavoriteButton } from '@features/favorites';
import { usePsychologistsTranslation } from '@shared/hooks';
import { useModalStore } from '@shared/lib/store/modalStore';

import css from './CardHeader.module.css';
import BadgesList from '../BadgesList/BadgesList';
import CardDetails from '../CardDetails/CardDetails';
import CardTrigger from '../CardTrigger/CardTrigger';
import PriceInfo from '../PriceInfo/PriceInfo';
import Rating from '../Rating/Rating';

interface Props {
  psychologist: PsychologistUI;
  detailsId: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const CardHeader = ({
  psychologist,
  detailsId,
  isExpanded,
  onToggle,
}: Props) => {
  const { t } = usePsychologistsTranslation();
  const { displayName, displayAbout } = psychologist;

  const { openAppointment } = useModalStore();

  return (
    <>
      <div className={css.header}>
        <div className={css.headerAvatar}>
          <PsychologistAvatar psychologist={psychologist} />
        </div>

        <div className={css.headerContent}>
          <div className={css.top}>
            <div className={css.titleContainer}>
              <p className={css.category}>{t('psychologist')}</p>
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

          <CardTrigger
            detailsId={detailsId}
            isExpanded={isExpanded}
            onToggle={onToggle}
          />
          <CardDetails
            detailsId={detailsId}
            onAppointmentOpen={() => openAppointment(psychologist)}
            isExpanded={isExpanded}
            psychologist={psychologist}
          />
        </div>
      </div>
    </>
  );
};

export default CardHeader;
