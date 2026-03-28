import type { FieldError } from 'react-hook-form';

import css from './ErrorMessage.module.css';

interface Props {
  error?: FieldError;
  message?: string;
  id?: string;
  reserveSpace?: boolean;
}

const ErrorMessage = ({ error, message, id, reserveSpace = false }: Props) => {
  const text = error?.message || message;

  if (!text && !reserveSpace) return null;

  return (
    <p
      id={id}
      role={text ? 'alert' : undefined}
      aria-live={text ? 'polite' : undefined}
      className={css.error}
      data-empty={!text}
    >
      {text}
    </p>
  );
};

export default ErrorMessage;
