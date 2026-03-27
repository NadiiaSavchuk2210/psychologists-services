import { usePsychologistsTranslation } from '@shared/hooks';

import css from './CardTrigger.module.css';

interface Props {
  isExpanded: boolean;
  detailsId: string;
  onToggle: () => void;
}

const CardTrigger = ({ isExpanded, detailsId, onToggle }: Props) => {
  const { t } = usePsychologistsTranslation();

  return (
    <button
      className={css.trigger}
      type="button"
      aria-expanded={isExpanded}
      aria-controls={detailsId}
      onClick={onToggle}
    >
      {isExpanded ? t('collapse') : t('readMore')}
    </button>
  );
};

export default CardTrigger;
