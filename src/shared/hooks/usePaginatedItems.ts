import { useMemo, useState } from 'react';

const INITIAL_PAGE = 1;

export const usePaginatedItems = <T>(items: T[], pageSize: number) => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const totalPages = Math.max(INITIAL_PAGE, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const visibleItems = useMemo(() => {
    return items.slice(0, currentPage * pageSize);
  }, [currentPage, items, pageSize]);

  const hasMore = visibleItems.length < items.length;

  const resetPagination = () => setPage(INITIAL_PAGE);
  const loadMore = () => setPage(prev => Math.min(prev + 1, totalPages));

  return {
    page: currentPage,
    visibleItems,
    hasMore,
    loadMore,
    resetPagination,
  };
};
