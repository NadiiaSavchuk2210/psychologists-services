import clsx from 'clsx';
import { useId } from 'react';
import { type ControllerRenderProps, type FieldError } from 'react-hook-form';

import type { AppointmentFormData } from '@features/make-appointment/model/types/appointment';
import { useAppointmentTranslation } from '@shared/hooks';
import { Input } from '@shared/ui';

import css from './AppointmentTimeField.module.css';
import AppointmentTimePicker from '../AppointmentTimePicker/AppointmentTimePicker';

interface AppointmentTimeFieldProps {
  field: ControllerRenderProps<AppointmentFormData, 'meetingTime'>;
  error?: FieldError;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  className?: string;
  classField?: string;
  classInputWrapper?: string;
}

export default function AppointmentTimeField({
  field,
  error,
  containerRef,
  isOpen,
  toggle,
  close,
  className = '',
  classField = '',
  classInputWrapper = '',
}: AppointmentTimeFieldProps) {
  const { t } = useAppointmentTranslation();
  const inputId = useId();
  const pickerId = `${inputId}-picker`;

  const handleChange = (time: string) => {
    if (time !== field.value) {
      field.onChange(time);
      close();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isOpen) {
        toggle();
      }
    }
  };

  return (
    <div ref={containerRef} className={clsx(css.timeFieldContainer, className)}>
      <Input
        id={inputId}
        type="text"
        label={t('fields.meetingTime')}
        hideLabel
        value={field.value || ''}
        readOnly
        placeholder={t('fields.timePlaceholder')}
        error={error}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={pickerId}
        aria-haspopup="listbox"
        onClick={toggle}
        onKeyDown={handleKeyDown}
        onBlur={field.onBlur}
        isTimePicker
        onIconClick={toggle}
        iconButtonProps={{
          'aria-controls': pickerId,
          'aria-expanded': isOpen,
          'aria-haspopup': 'listbox',
        }}
        classInput={css.timeInput}
        classField={classField}
        classInputWrapper={classInputWrapper}
      />

      {isOpen && (
        <AppointmentTimePicker
          id={pickerId}
          label={t('fields.meetingTime')}
          value={field.value}
          onChange={handleChange}
          onClose={close}
        />
      )}
    </div>
  );
}
