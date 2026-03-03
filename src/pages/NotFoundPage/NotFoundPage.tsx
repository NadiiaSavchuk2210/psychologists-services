import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.wrapper}>
      <div className={css.code}>404</div>

      <p className={css.text}>Page Not Found 🙃</p>

      <Link to="/" className={css.button}>
        Go back home
      </Link>
    </div>
  );
}
