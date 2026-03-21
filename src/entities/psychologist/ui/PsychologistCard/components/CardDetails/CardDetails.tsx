import { motion } from 'framer-motion';
import css from './CardDetails.module.css';
import type { PsychologistUI } from '@entities/psychologist/model/types/psychologist';
import { usePsychologistsTranslation } from '@shared/hooks';
import Reviews from '@shared/ui/Reviews/Reviews';
import { Button } from '@shared/ui';

interface Props {
  isExpanded: boolean;
  psychologist: PsychologistUI;
}

const CardDetails = ({ isExpanded, psychologist }: Props) => {
  const { t } = usePsychologistsTranslation();

  return (
    <motion.div
      layout
      initial={false}
      animate={{ height: isExpanded ? 'auto' : 0 }}
      className={css.details}
    >
      <section className={css.section}>
        <h4 className="visually-hidden">{t('reviews')}</h4>
        <Reviews psychologist={psychologist} />
        <Button className={css.btnAppointment} type="button">
          {t('makeAppointment')}
        </Button>
      </section>
    </motion.div>
  );
};

export default CardDetails;
