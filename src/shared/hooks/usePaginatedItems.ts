import { useMemo, useState } from 'react';

export const usePaginatedItems = <T>(items: T[], pageSize: number) => {
  const [page, setPage] = useState(1);

  const visibleItems = useMemo(() => {
    return items.slice(0, page * pageSize);
  }, [items, page, pageSize]);

  const hasMore = visibleItems.length < items.length;

  const resetPagination = () => setPage(1);
  const loadMore = () => setPage(prev => prev + 1);

  return {
    page,
    visibleItems,
    hasMore,
    loadMore,
    resetPagination,
  };
};
