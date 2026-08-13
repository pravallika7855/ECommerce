import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../services/api';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import { ArrowLeft, AlertCircle } from 'lucide-react';

/**
 * CategoryProducts Page Component
 * Dynamically fetches products belonging to a specific category.
 * Reuses SearchBar and ProductList components without duplicating JSX.
 */
const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductsByCategory(category);
        setProducts(data);
      } catch (err) {
        console.error(`Error loading category "${category}":`, err);
        setError(err.message || 'Failed to fetch products for this category.');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  // Filter and sort category products
  const processedProducts = products
    .filter((p) =>
      searchTerm.trim() === ''
        ? true
        : p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const formattedCategoryTitle = category ? category.replace('-', ' ') : '';

  return (
    <div className="category-products-page">
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/categories" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem' }}>
          <ArrowLeft size={16} />
          All Categories
        </Link>
      </div>

      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ textTransform: 'capitalize' }}>{formattedCategoryTitle} Products</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Showing {processedProducts.length} items in {formattedCategoryTitle}
          </p>
        </div>
      </div>

      {/* Reusable Search & Sort Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {loading ? (
        <Loading message={`Loading ${formattedCategoryTitle} products...`} />
      ) : error ? (
        <div className="error-banner">
          <AlertCircle size={24} />
          <span>{error}</span>
        </div>
      ) : (
        /* Reusing ProductList & ProductCard */
        <ProductList products={processedProducts} />
      )}
    </div>
  );
};

export default CategoryProducts;
