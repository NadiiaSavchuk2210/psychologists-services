import { useEffect, useRef, useState } from 'react';
import css from './AppointmentTimePicker.module.css';
import { generateTimes } from '@features/make-appointment/utils/generateTimes';
import { useAppointmentTranslation } from '@shared/hooks';

interface Props {
  onChange?: (value: string) => void;
  value: string;
}

const ALL_TIMES = generateTimes(30);

export default function AppointmentTimePicker({ onChange, value }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const selectedIndexRef = useRef(0);
  const { t } = useAppointmentTranslation();

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    if (!value) return;
    const index = ALL_TIMES.indexOf(value);
    if (index !== -1 && index !== selectedIndexRef.current) {
      setSelectedIndex(index);
    }
  }, [value]);

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
      }, 100);
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

  return (
    <div className={css.wrapper}>
      <p className={css.title}>{t('fields.meetingTime')}</p>

      <ul ref={listRef} className={css.list}>
        {ALL_TIMES.map((time, index) => {
          const [hours, minutes] = time.split(':');
          return (
            <li
              key={time}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className={`${css.item} ${selectedIndex === index ? css.active : ''}`}
              onClick={() => handleClick(index)}
            >
              <span className={css.hours}>{hours}</span>
              <span className={css.separator}>:</span>
              <span className={css.minutes}>{minutes}</span>
            </li>
          );
        })}
      </ul>

      <div className={css.highlight} />
    </div>
  );
}
