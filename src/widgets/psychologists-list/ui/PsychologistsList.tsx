import { useCallback, useState } from 'react';
import { PsychologistCard, type Psychologist } from '@entities/psychologist';

interface Props {
  psychologists: Psychologist[];
}

const PsychologistsList = ({ psychologists }: Props) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleCard = useCallback((id: string) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  }, []);

  return (
    <>
      {psychologists.map(psychologist => (
        <li key={psychologist.id}>
          <PsychologistCard
            psychologist={psychologist}
            isExpanded={expandedIds.includes(psychologist.id)}
            onToggle={() => toggleCard(psychologist.id)}
          />
        </li>
      ))}
    </>
  );
};

export default PsychologistsList;
