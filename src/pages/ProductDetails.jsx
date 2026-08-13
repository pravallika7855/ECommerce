import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';
import { Star, ShoppingCart, ArrowLeft, Check, AlertCircle, Plus, Minus, Tag, ShieldCheck } from 'lucide-react';

/**
 * ProductDetails Page Component
 * Fetches product dynamically using useParams() ID and renders rich gallery + specs
 */
const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data);
        // Set initial primary image
        setSelectedImage(data.thumbnail || data.images?.[0] || '');
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message || 'Product details could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <Loading message="Fetching product details..." />;

  if (error || !product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
          <AlertCircle size={40} />
        </div>
        <h2>Product Not Found</h2>
        <p>{error || 'The requested product does not exist or has been removed.'}</p>
        <Link to="/products" className="btn-primary">
          <ArrowLeft size={18} />
          Back to Products
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    category,
    stock,
    images
  } = product;

  const originalPrice = (price / (1 - (discountPercentage || 0) / 100)).toFixed(2);
  const galleryImages = images && images.length > 0 ? images : [selectedImage];

  return (
    <div className="product-details-page">
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/products" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem' }}>
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </div>

      <div className="product-details-container">
        <div className="product-details-grid">
          {/* Left Column: Image Gallery */}
          <div className="gallery-container">
            <div className="main-image-frame">
              <img src={selectedImage} alt={title} />
            </div>

            {/* Thumbnail Selectors */}
            {galleryImages.length > 1 && (
              <div className="thumbnail-list">
                {galleryImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    className={`thumbnail-btn ${selectedImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${title} thumb ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Purchase */}
          <div className="details-info-section">
            <span className="product-card-category" style={{ fontSize: '0.85rem' }}>
              {category}
            </span>

            <h1>{title}</h1>

            {/* Rating and Stock Badges */}
            <div className="meta-badges">
              <div className="product-rating" style={{ fontSize: '1rem' }}>
                <Star size={18} fill="#f59e0b" color="#f59e0b" />
                <span>{rating ? rating.toFixed(1) : '4.5'}</span>
              </div>

              <span className={`stock-badge ${stock > 10 ? 'in-stock' : 'low-stock'}`}>
                {stock > 0 ? `${stock} units available` : 'Out of Stock'}
              </span>
            </div>

            {/* Price Box */}
            <div className="price-details-box">
              <span className="details-price-current">${price.toFixed(2)}</span>
              {discountPercentage > 0 && (
                <>
                  <span className="price-old" style={{ fontSize: '1.25rem' }}>${originalPrice}</span>
                  <span className="details-price-discount">SAVE {Math.round(discountPercentage)}%</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="details-description">{description}</p>

            {/* Product Specifications */}
            <div className="specifications-grid">
              <div className="spec-item">
                <span className="spec-label">Brand</span>
                <span className="spec-value">{brand || 'Generic'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Category</span>
                <span className="spec-value" style={{ textTransform: 'capitalize' }}>{category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Stock Status</span>
                <span className="spec-value">{stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Guarantee</span>
                <span className="spec-value">30-Day Money Back</span>
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="action-row">
              <div className="quantity-stepper">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => Math.min(stock || 99, prev + 1))}
                  disabled={quantity >= stock}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                className="btn-primary btn-accent"
                onClick={() => addToCart(product, quantity)}
                disabled={stock === 0}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <ShoppingCart size={20} />
                Add {quantity} to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
