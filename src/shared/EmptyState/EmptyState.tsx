import css from './EmptyState.module.css';

interface Props {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = 'Nothing found',
  description = 'There are no items to display.',
}: Props) => {
  return (
    <div className={css.empty}>
      <h3 className={css.title}>{title}</h3>
      {description && <p className={css.description}>{description}</p>}
    </div>
  );
};

export default EmptyState;
