import { useCallback, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import css from './PsychologistsList.module.css';
import { PsychologistCard, type Psychologist } from '@entities/psychologist';
import clsx from 'clsx';
import { usePsychologistsTranslation } from '@shared/hooks';

interface Props {
  psychologists: Psychologist[];
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const PsychologistsList = ({ psychologists }: Props) => {
  const { t } = usePsychologistsTranslation();
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleCard = useCallback((id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  }, []);

  return (
    <motion.section
      className={clsx(css.list, 'container')}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h2 className="visually-hidden">{t('listTitle')}</h2>

      <ul className={css.items}>
        {psychologists.map(psychologist => (
          <motion.li key={psychologist.id} variants={item} layout>
            <PsychologistCard
              psychologist={psychologist}
              isExpanded={expandedIds.includes(psychologist.id)}
              onToggle={() => toggleCard(psychologist.id)}
            />
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
};

export default PsychologistsList;
