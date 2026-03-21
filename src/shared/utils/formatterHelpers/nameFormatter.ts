export const getInitial = (name: string) => {
  if (!name || typeof name !== 'string') return '';
  return name.slice(0, 1).toUpperCase();
};
