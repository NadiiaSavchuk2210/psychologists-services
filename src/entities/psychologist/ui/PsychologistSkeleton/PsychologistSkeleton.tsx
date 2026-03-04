const PsychologistSkeleton = () => (
  <div
    style={{
      padding: '25px',
      border: '1px solid #e9ecef',
      borderRadius: '16px',
      background: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      marginBottom: '20px',
    }}
  >
    <div
      className="skeleton-line"
      style={{ width: '60%', height: '24px', marginBottom: '15px' }}
    />

    <div style={{ display: 'flex', gap: '20px' }}>
      <div
        className="skeleton-line"
        style={{ width: '80px', height: '18px' }}
      />
      <div
        className="skeleton-line"
        style={{ width: '60px', height: '18px' }}
      />
      <div
        className="skeleton-line"
        style={{ width: '120px', height: '18px' }}
      />
    </div>

    <style>{`
      .skeleton-line {
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        border-radius: 4px;
        background-size: 200% 100%;
        animation: shimmer 1.5s linear infinite;
      }

      @keyframes shimmer {
        to { background-position-x: -200%; }
      }
    `}</style>
  </div>
);

export default PsychologistSkeleton;
