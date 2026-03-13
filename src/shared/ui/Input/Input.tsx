import { useId, useState } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Icon from '../Icon/Icon';
import css from './Input.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

const Input = ({
  label,
  register,
  error,
  id,
  type = 'text',
  ...props
}: Props) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword && showPassword ? 'text' : type;

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className={css.field}>
      {label && (
        <label htmlFor={inputId} className={css.label}>
          {label}
        </label>
      )}

      <div className={clsx(css.inputWrapper, isPassword && css.password)}>
        <input
          id={inputId}
          type={inputType}
          className={clsx(css.input, error && css.inputError)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...register}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className={css.eyeButton}
            onClick={handleTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            aria-controls={inputId}
          >
            <Icon
              name={showPassword ? 'icon-eye' : 'icon-eye-off'}
              width={20}
              height={20}
            />
          </button>
        )}
      </div>

      <ErrorMessage id={errorId} error={error} />
    </div>
  );
};

export default Input;
