import { memo, useEffect, useRef } from 'react';

import type { PsychologistUI } from '@entities/psychologist/model/types/psychologist';

import CardHeader from './components/CardHeader/CardHeader';
import css from './PsychologistCard.module.css';

interface Props {
  psychologist: PsychologistUI;
  isExpanded: boolean;
  isFavorite?: boolean;
  onToggle: () => void;
}

const PsychologistCard = memo(
  ({ psychologist, isExpanded, onToggle }: Props) => {
    const ref = useRef<HTMLElement>(null);

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

PsychologistCard.displayName = 'PsychologistCard';

export default PsychologistCard;
