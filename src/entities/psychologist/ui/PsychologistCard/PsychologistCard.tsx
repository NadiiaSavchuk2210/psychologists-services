import { memo, useEffect, useRef } from 'react';
import css from './PsychologistCard.module.css';

import CardHeader from './components/CardHeader/CardHeader';
import type { Psychologist } from '@entities/psychologist/model/types/psychologist';

interface Props {
  psychologist: Psychologist;
  isExpanded: boolean;
  onToggle: () => void;
}

const PsychologistCard = memo(
  ({ psychologist, isExpanded, onToggle }: Props) => {
    const ref = useRef<HTMLLIElement>(null);

    console.log(psychologist);

    useEffect(() => {
      if (isExpanded) {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, [isExpanded]);

    return (
      <article ref={ref} className={css.card}>
        <CardHeader
          psychologist={psychologist}
          isExpanded={isExpanded}
          onToggle={onToggle}
        />
      </article>
    );
  }
);

export default PsychologistCard;
