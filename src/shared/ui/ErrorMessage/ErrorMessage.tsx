import type { FieldError } from 'react-hook-form';
import css from './ErrorMessage.module.css';

interface Props {
  error?: FieldError;
  message?: string;
  id?: string;
}

const ErrorMessage = ({ error, message, id }: Props) => {
  const text = error?.message || message;

  if (!text) return null;

  return (
    <p id={id} role="alert" className={css.error}>
      {text}
    </p>
  );
};

export default ErrorMessage;
