import { useSyncExternalStore } from 'react';

const subscribe = (query: string, onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(query);

  mediaQuery.addEventListener('change', onStoreChange);

  return () => {
    mediaQuery.removeEventListener('change', onStoreChange);
  };
};

const getSnapshot = (query: string) => window.matchMedia(query).matches;

const getServerSnapshot = () => false;

export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    onStoreChange => subscribe(query, onStoreChange),
    () => getSnapshot(query),
    getServerSnapshot
  );
