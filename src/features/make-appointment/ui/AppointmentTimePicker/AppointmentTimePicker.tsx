import { useEffect, useRef, useState } from 'react';

import { generateTimes } from '@features/make-appointment/utils/generateTimes';
import { useAppointmentTranslation } from '@shared/hooks';

import css from './AppointmentTimePicker.module.css';

interface Props {
  id: string;
  label: string;
  onChange?: (value: string) => void;
  onClose?: () => void;
  value: string;
}

const TIME_STEP_MINUTES = 30;
const INITIAL_SELECTED_INDEX = 0;
const SCROLL_SETTLE_DELAY_MS = 100;
const ALL_TIMES = generateTimes(TIME_STEP_MINUTES);

export default function AppointmentTimePicker({
  id,
  label,
  onChange,
  onClose,
  value,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const initialIndex = ALL_TIMES.indexOf(value);
    return initialIndex === -1 ? INITIAL_SELECTED_INDEX : initialIndex;
  });
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndexRef = useRef(INITIAL_SELECTED_INDEX);
  const { t } = useAppointmentTranslation();

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    itemRefs.current[selectedIndex]?.focus();
  }, [selectedIndex]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let closestIndex = 0;
        let closestOffset = Infinity;

        const containerCenter =
          container.scrollTop + container.clientHeight / 2;

        itemRefs.current.forEach((item, index) => {
          if (!item) return;
          const itemCenter = item.offsetTop + item.clientHeight / 2;
          const offset = Math.abs(containerCenter - itemCenter);
          if (offset < closestOffset) {
            closestOffset = offset;
            closestIndex = index;
          }
        });

        if (closestIndex !== selectedIndexRef.current) {
          setSelectedIndex(closestIndex);
        }
      }, SCROLL_SETTLE_DELAY_MS);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = (index: number) => {
    const time = ALL_TIMES[index];
    setSelectedIndex(index);
    onChange?.(time);
  };

  const focusItem = (index: number) => {
    const nextIndex = (index + ALL_TIMES.length) % ALL_TIMES.length;
    setSelectedIndex(nextIndex);
    itemRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusItem(index + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusItem(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        focusItem(ALL_TIMES.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        onClose?.();
        break;
    }
  };

  return (
    <div className={css.wrapper}>
      <p className={css.title}>{t('fields.meetingTime')}</p>

      <ul
        id={id}
        ref={listRef}
        className={css.list}
        role="listbox"
        aria-label={label}
      >
        {ALL_TIMES.map((time, index) => {
          const [hours, minutes] = time.split(':');
          return (
            <li key={time}>
              <button
                ref={el => {
                  itemRefs.current[index] = el;
                }}
                className={`${css.item} ${selectedIndex === index ? css.active : ''}`}
                type="button"
                role="option"
                aria-selected={selectedIndex === index}
                onClick={() => handleClick(index)}
                onKeyDown={event => handleKeyDown(event, index)}
              >
                <span className={css.hours}>{hours}</span>
                <span className={css.separator}>:</span>
                <span className={css.minutes}>{minutes}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={css.highlight} />
    </div>
  );
}
