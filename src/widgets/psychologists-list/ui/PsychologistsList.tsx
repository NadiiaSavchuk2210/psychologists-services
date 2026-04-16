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
        {psychologists.map(psychologist => (
          <li key={psychologist.id} className={css.listItem}>
            <PsychologistCard
              psychologist={psychologist}
              isExpanded={expandedIds.includes(psychologist.id)}
              onToggle={() => toggleCard(psychologist.id)}
            />
          </li>
        ))}
      </ul>
    );
  }
);

PsychologistsList.displayName = 'PsychologistsList';
export default PsychologistsList;
