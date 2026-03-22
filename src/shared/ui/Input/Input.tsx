import { useId, useState } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Icon from '../Icon/Icon';
import css from './Input.module.css';

interface Props extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  classInputWrapper?: string;
  classInput?: string;
  classField?: string;
  isTimePicker?: boolean;
  onIconClick?: () => void;
  rows?: number;
}

const Input = ({
  label,
  register,
  error,
  id,
  type = 'text',
  classInputWrapper = '',
  classInput = '',
  classField = '',
  isTimePicker = false,
  onIconClick,
  rows = 3,
  ...props
}: Props) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const isPassword = type === 'password';
  const isTextArea = type === 'textarea';

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const inputType = isPassword && showPassword ? 'text' : type;

  const commonProps = {
    id: inputId,
    className: clsx(
      css.input,
      classInput,
      error && css.inputError,
      isTextArea && css.textarea
    ),
    'aria-invalid': !!error,
    'aria-describedby': error ? errorId : undefined,
    ...register,
    ...props,
  };

  return (
    <div className={clsx(css.field, classField)}>
      {label && (
        <label htmlFor={inputId} className={css.label}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          css.inputWrapper,
          classInputWrapper,
          isPassword && css.password,
          isTextArea && css.textAreaWrapper
        )}
      >
        {isTextArea ? (
          <textarea
            {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            rows={rows}
          />
        ) : (
          <input
            {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
            type={inputType}
          />
        )}

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

        {isTimePicker && (
          <button
            type="button"
            className={css.eyeButton}
            onClick={onIconClick}
            aria-label="Open time picker"
          >
            <Icon name="icon-clock" width={20} height={20} />
          </button>
        )}
      </div>

      <ErrorMessage id={errorId} error={error} />
    </div>
  );
};

export default Input;
