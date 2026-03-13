import type { FieldError } from 'react-hook-form';
import css from './ErrorMessage.module.css';

interface Props {
  error?: FieldError;
  id?: string;
}

const ErrorMessage = ({ error, id }: Props) => {
  if (!error) return null;

  return (
    <p id={id} role="alert" className={css.error}>
      {error.message}
    </p>
  );
};

export default ErrorMessage;
