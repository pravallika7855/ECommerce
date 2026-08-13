import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { getProducts, getCategories } from '../services/api';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';

/**
 * Home Page Component
 * Renders Hero banner, feature highlights, popular categories, and top featured products
 */
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch top products & categories in parallel
        const [productsData, categoriesData] = await Promise.all([
          getProducts(8),
          getCategories()
        ]);

        setFeaturedProducts(productsData.slice(0, 8));
        setCategories(categoriesData.slice(0, 6));
      } catch (err) {
        console.error('Error loading home data:', err);
        setError('Unable to load home page content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Discover Extraordinary <span>Products & Deals</span>
          </h1>
          <p>
            Explore high-quality items fetched directly from top categories worldwide. Enjoy seamless shopping, express shipping, and exclusive daily discounts.
          </p>
          <Link to="/products" className="btn-primary">
            <ShoppingBag size={20} />
            Shop Now
          </Link>
        </div>
        <div className="hero-image-box">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
            alt="E-commerce shopping bag showcase"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">
            <Truck size={28} />
          </div>
          <div>
            <h3>Fast Delivery</h3>
            <p>Express doorstep shipping on all orders over $50 worldwide.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3>Secure Payment</h3>
            <p>100% encrypted and safe payment processing options.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Award size={28} />
          </div>
          <div>
            <h3>Quality Guaranteed</h3>
            <p>Curated premium brands with hassle-free 30-day returns.</p>
          </div>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-header">
          <div>
            <h2>Popular Categories</h2>
            <p style={{ color: 'var(--text-muted)' }}>Browse products by top categories</p>
          </div>
          <Link to="/categories" className="view-all-link">
            View All Categories <ArrowRight size={18} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem' }}>
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/categories/${cat.slug}`}
              className="category-card"
              style={{ padding: '1.25rem 1rem' }}
            >
              <div className="category-icon-bubble" style={{ width: 50, height: 50, fontSize: '1.2rem' }}>
                🛍️
              </div>
              <h3 style={{ fontSize: '1rem', textTransform: 'capitalize' }}>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section>
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p style={{ color: 'var(--text-muted)' }}>Handpicked top choices for you</p>
          </div>
          <Link to="/products" className="view-all-link">
            View All Products <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <Loading message="Fetching featured products..." />
        ) : error ? (
          <div className="error-banner">{error}</div>
        ) : (
          <ProductList products={featuredProducts} />
        )}
      </section>
    </div>
  );
};

export default Home;
