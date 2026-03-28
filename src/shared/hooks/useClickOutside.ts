import { useEffect } from 'react';

const OUTSIDE_CLICK_EVENT = 'pointerdown';

export const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  isActive: boolean,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: Event) => {
      if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener(OUTSIDE_CLICK_EVENT, handleClickOutside);

    return () => {
      document.removeEventListener(OUTSIDE_CLICK_EVENT, handleClickOutside);
    };
  }, [isActive, onOutsideClick, ref]);
};
