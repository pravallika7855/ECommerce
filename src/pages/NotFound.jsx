import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

/**
 * NotFound Component (404 Page)
 * Displayed for invalid or non-existent routes
 */
const NotFound = () => {
  return (
    <div className="empty-state" style={{ margin: '3rem auto', maxWidth: '600px' }}>
      <div className="empty-state-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
        <AlertTriangle size={48} />
      </div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>404 Page Not Found</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">
        <Home size={18} />
        Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
