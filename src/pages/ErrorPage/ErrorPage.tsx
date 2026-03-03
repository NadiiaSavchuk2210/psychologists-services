import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <>
      <title>Server Error | Psychology Services</title>
      <meta
        name="description"
        content="Temporary server issue. Our team is resolving it. Contact support or try our psychologist directory."
      />
      <meta property="og:title" content="Service Temporarily Unavailable" />
      <meta
        property="og:description"
        content="Mental health services temporarily down. Return to find licensed therapists."
      />

      <main>
        <div className={styles.wrapper}>
          <div className={styles.code}>Error</div>

          <p className={styles.text}>
            An unexpected error occurred. Please try again later.
          </p>

          <Link to="/" className={styles.button}>
            Go back home
          </Link>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
