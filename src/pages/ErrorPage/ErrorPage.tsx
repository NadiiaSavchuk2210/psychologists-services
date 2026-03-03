import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.code}>Error</div>

      <p className={styles.text}>
        An unexpected error occurred. Please try again later.
      </p>

      <Link to="/" className={styles.button}>
        Go back home
      </Link>
    </div>
  );
}
