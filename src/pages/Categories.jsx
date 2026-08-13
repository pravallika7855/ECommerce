import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Loading from '../components/Loading';
import { Layers, AlertCircle, ArrowRight } from 'lucide-react';

/**
 * Categories Page Component
 * Fetches product category list dynamically and renders grid of category cards
 */
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Failed to fetch categories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loading message="Loading product categories..." />;

  if (error) {
    return (
      <div className="error-banner">
        <AlertCircle size={24} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="categories-page">
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Product Categories</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Browse through all available product departments
          </p>
        </div>
      </div>

      <div className="categories-grid">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={`/categories/${cat.slug}`}
            className="category-card"
          >
            <div className="category-icon-bubble">
              <Layers size={28} />
            </div>
            <h3>{cat.name}</h3>
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--primary)',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              Explore Category <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
