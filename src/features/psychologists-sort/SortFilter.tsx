import type { SortOption } from '@entities/psychologist';
import css from './SortFilter.module.css';
import { SORT_OPTIONS } from '@shared/constants/psychologist';
import clsx from 'clsx';

interface Props {
  activeSort: SortOption;
  onChange: (sort: SortOption) => void;
}

const SortFilter = ({ activeSort, onChange }: Props) => {
  return (
    <div className={css.filters}>
      {Object.values(SORT_OPTIONS).map(sort => (
        <button
          key={sort}
          onClick={() => onChange(sort as SortOption)}
          className={clsx(css.btn, activeSort === sort && css.active)}
        >
          {sort}
        </button>
      ))}
    </div>
  );
};

export default SortFilter;
