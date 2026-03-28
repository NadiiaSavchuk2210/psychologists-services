import clsx from 'clsx';
import { useId, useState } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { useA11yTranslation } from '@shared/hooks';

import css from './Input.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Icon from '../Icon/Icon';

interface Props extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  label?: string;
  hideLabel?: boolean;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  classInputWrapper?: string;
  classInput?: string;
  classField?: string;
  isTimePicker?: boolean;
  onIconClick?: () => void;
  iconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  rows?: number;
}

const Input = ({
  label,
  hideLabel = false,
  register,
  error,
  id,
  type = 'text',
  className = '',
  classInputWrapper = '',
  classInput = '',
  classField = '',
  isTimePicker = false,
  onIconClick,
  iconButtonProps,
  rows = 3,
  ...props
}: Props) => {
  const { t } = useA11yTranslation();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const describedBy = [props['aria-describedby'], error ? errorId : undefined]
    .filter(Boolean)
    .join(' ');

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
      className,
      error && css.inputError,
      isTextArea && css.textarea
    ),
    'aria-invalid': props['aria-invalid'] ?? !!error,
    'aria-describedby': describedBy || undefined,
    ...register,
    ...props,
  };

  return (
    <div className={clsx(css.field, classField)}>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(css.label, hideLabel && 'visually-hidden')}
        >
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
            aria-label={showPassword ? t('hidePassword') : t('showPassword')}
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
            aria-label={t('openTimePicker')}
            {...iconButtonProps}
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
