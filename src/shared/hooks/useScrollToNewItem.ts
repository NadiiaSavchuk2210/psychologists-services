import { useLayoutEffect, useRef } from 'react';

export const useScrollToNewItem = <T extends HTMLElement>(
  listRef: React.RefObject<T | null>,
  itemsLength: number,
  topOffset: number = 0,
  deps: ReadonlyArray<unknown> = []
) => {
  const prevLengthRef = useRef(0);

  useLayoutEffect(() => {
    if (itemsLength > prevLengthRef.current && listRef.current) {
      const firstNewIndex = prevLengthRef.current;
      const element = listRef.current.children[firstNewIndex] as HTMLElement;

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    prevLengthRef.current = itemsLength;
  }, [itemsLength, listRef, topOffset, deps]);
};
