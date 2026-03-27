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
  classField = '',
  classInputWrapper = '',
}: AppointmentTimeFieldProps) {
  const { t } = useAppointmentTranslation();

  const handleChange = (time: string) => {
    if (time !== field.value) {
      field.onChange(time);
      close();
    }
  };

  return (
    <div ref={containerRef} className={css.timeFieldContainer}>
      <Input
        type="text"
        value={field.value || ''}
        readOnly
        placeholder={t('fields.timePlaceholder')}
        error={error}
        onClick={toggle}
        isTimePicker
        onIconClick={toggle}
        classInput={css.timeInput}
        classField={classField}
        classInputWrapper={classInputWrapper}
      />

      {isOpen && (
        <AppointmentTimePicker value={field.value} onChange={handleChange} />
      )}
    </div>
  );
}
