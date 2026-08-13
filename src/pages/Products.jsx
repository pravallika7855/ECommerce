import React, { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories } from '../services/api';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { AlertCircle, Filter } from 'lucide-react';

/**
 * Products Page Component
 * Fetches product list dynamically, manages live search, category filtering, and sorting state.
 */
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProductsAndCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsData, categoriesData] = await Promise.all([
          getProducts(100),
          getCategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load products page data:', err);
        setError(err.message || 'Error fetching products from server.');
      } finally {
        setLoading(false);
      }
    };

    loadProductsAndCategories();
  }, []);

  // Filter and sort products dynamically using useMemo
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 2. Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term)
      );
    }

    // 3. Apply sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortOption]);

  return (
    <div className="products-page">
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1>Explore All Products</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Showing {filteredAndSortedProducts.length} of {products.length} available items
          </p>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {/* Category Filter Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <button
          className={`btn-secondary ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
          style={{
            background: selectedCategory === 'all' ? 'var(--primary)' : 'var(--bg-card)',
            color: selectedCategory === 'all' ? 'white' : 'var(--text-main)',
            fontWeight: 600,
            whiteSpace: 'nowrap'
          }}
        >
          All Categories
        </button>
        {categories.slice(0, 10).map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat.slug)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: selectedCategory === cat.slug ? 'var(--primary)' : 'var(--bg-card)',
              color: selectedCategory === cat.slug ? 'white' : 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
              textTransform: 'capitalize'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Content Rendering States */}
      {loading ? (
        <Loading message="Loading products catalog from DummyJSON..." />
      ) : error ? (
        <div className="error-banner">
          <AlertCircle size={24} />
          <div>
            <strong>Error Loading Catalog:</strong>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <ProductList products={filteredAndSortedProducts} />
      )}
    </div>
  );
};

export default Products;
