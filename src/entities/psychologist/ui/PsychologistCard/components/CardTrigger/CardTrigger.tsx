import { usePsychologistsTranslation } from '@shared/hooks';
import css from './CardTrigger.module.css';
interface Props {
  isExpanded: boolean;
  onToggle: () => void;
}

const CardTrigger = ({ isExpanded, onToggle }: Props) => {
  const { t } = usePsychologistsTranslation();

  return (
    <button className={css.trigger} type="button" onClick={onToggle}>
      {isExpanded ? t('collapse') : t('readMore')}
    </button>
  );
};

export default CardTrigger;
