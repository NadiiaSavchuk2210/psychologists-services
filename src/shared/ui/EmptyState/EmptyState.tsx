import clsx from 'clsx';

import css from './EmptyState.module.css';

interface Props {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: Props) => {
  return (
    <div className={clsx(css.empty, 'container')}>
      <h3 className={css.title}>{title}</h3>
      {description && <p className={css.description}>{description}</p>}
    </div>
  );
};

export default EmptyState;
