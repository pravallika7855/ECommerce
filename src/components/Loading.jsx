import React from 'react';

/**
 * Loading Spinner Component
 * Used across pages while fetching data from DummyJSON API
 */
const Loading = ({ message = 'Loading products...' }) => {
  return (
    <div className="loading-wrapper">
      <div className="spinner" />
      <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{message}</p>
    </div>
  );
};

export default Loading;
