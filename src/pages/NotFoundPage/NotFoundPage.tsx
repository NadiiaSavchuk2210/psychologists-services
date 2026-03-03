import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <>
      <title>Page Not Found | Psychology Services</title>
      <meta
        name="description"
        content="Page doesn't exist. Return to our psychologists directory or search for therapy services by specialization."
      />
      <meta property="og:title" content="404 - Page Not Found" />
      <meta
        property="og:description"
        content="Explore licensed psychologists for depression, anxiety, relationships and more."
      />

      <main>
        <div className={css.wrapper}>
          <div className={css.code}>404</div>

          <p className={css.text}>Page Not Found 🙃</p>

          <Link to="/" className={css.button}>
            Go back home
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
