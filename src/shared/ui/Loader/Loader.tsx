import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <span className={css.spinner} aria-hidden="true" />
    </div>
  );
}
