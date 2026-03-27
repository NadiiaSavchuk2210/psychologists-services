import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useState, forwardRef } from 'react';

import { PsychologistCard, type PsychologistUI } from '@entities/psychologist';

import css from './PsychologistsList.module.css';

interface Props {
  psychologists: PsychologistUI[];
}

const PsychologistsList = forwardRef<HTMLUListElement, Props>(
  ({ psychologists = [] }, ref) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const toggleCard = useCallback((id: string) => {
      setExpandedIds(prev =>
        prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
      );
    }, []);

    return (
      <ul ref={ref} className={css.psychologistsList}>
        <AnimatePresence>
          {psychologists.map(psychologist => (
            <motion.li
              key={psychologist.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <PsychologistCard
                psychologist={psychologist}
                isExpanded={expandedIds.includes(psychologist.id)}
                onToggle={() => toggleCard(psychologist.id)}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    );
  }
);

PsychologistsList.displayName = 'PsychologistsList';
export default PsychologistsList;
