import { useState } from 'react';
import { usePsychologistsInfinite } from '../../model/hooks/usePsychologists';
import type { SortOption } from '../../model/types/psychologist';
import PsychologistSkeleton from '../PsychologistSkeleton/PsychologistSkeleton';
import {
  PSYCHOLOGISTS_PER_PAGE,
  SORT_OPTIONS,
} from '../../../../shared/constants/psychologist';

const PsychologistsList = () => {
  const [activeSort, setActiveSort] = useState<SortOption>(
    SORT_OPTIONS.ALL as SortOption
  );
  const [pageSize, setPageSize] = useState(PSYCHOLOGISTS_PER_PAGE);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePsychologistsInfinite(activeSort, pageSize);

  const allPsychologists = data?.pages.flatMap(page => page.items) ?? [];

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Statistics */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        📊 Loaded: {allPsychologists.length} | Filter:{' '}
        <strong style={{ color: '#007bff' }}>{activeSort}</strong> | Page size:{' '}
        {pageSize}
      </div>

      {/* Page Size Selector */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label>Show per page: </label>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          style={{ padding: '8px 12px', marginLeft: '10px' }}
        >
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
        </select>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '30px',
        }}
      >
        {Object.values(SORT_OPTIONS).map(sortOption => (
          <button
            key={sortOption}
            onClick={() => setActiveSort(sortOption as SortOption)}
            style={{
              padding: '12px 24px',
              background: activeSort === sortOption ? '#007bff' : 'white',
              color: activeSort === sortOption ? 'white' : '#333',
              border: `2px solid ${activeSort === sortOption ? '#007bff' : '#dee2e6'}`,
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: activeSort === sortOption ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
            }}
          >
            {sortOption}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {/* INITIAL LOADING STATE */}
        {isLoading &&
          Array.from({ length: pageSize }).map((_, i) => (
            <PsychologistSkeleton key={`init-${i}`} />
          ))}

        {/* EMPTY STATE (No results found for specific filter) */}
        {!isLoading && !error && allPsychologists.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#fff',
              borderRadius: '16px',
              border: '2px dashed #dee2e6',
            }}
          >
            <span style={{ fontSize: '48px' }}>🔍</span>
            <h3 style={{ marginTop: '20px', color: '#333' }}>
              No psychologists found
            </h3>
            <p style={{ color: '#666' }}>
              We couldn't find anyone matching the{' '}
              <strong>"{activeSort}"</strong> criteria. Try adjusting your
              filters or price range.
            </p>
          </div>
        )}

        {/* DATA LIST */}
        <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
          {allPsychologists.map(p => (
            <div
              key={p.id}
              style={{
                padding: '25px',
                border: '1px solid #e9ecef',
                borderRadius: '16px',
                background: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>{p.name}</h3>
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  color: '#666',
                  flexWrap: 'wrap',
                }}
              >
                <span>💰 ${p.price_per_hour}/hr</span>
                <span>⭐ {p.rating.toFixed(2)}</span>
                {p.specialization && <span>🩺 {p.specialization}</span>}
              </div>
            </div>
          ))}

          {/* FETCHING NEXT PAGE (Bottom Skeletons) */}
          {isFetchingNextPage &&
            Array.from({ length: pageSize }).map((_, i) => (
              <PsychologistSkeleton key={`next-${i}`} />
            ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {hasNextPage && !isFetchingNextPage && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={() => fetchNextPage()}
              style={{
                padding: '12px 32px',
                cursor: 'pointer',
                borderRadius: '8px',
                border: 'none',
                background: '#007bff',
                color: 'white',
                fontWeight: '600',
              }}
            >
              📥 Load More
            </button>
          </div>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div
          style={{
            color: '#721c24',
            background: '#f8d7da',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          ❌ Error: {error.message}
        </div>
      )}
    </div>
  );
};

export default PsychologistsList;
