import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * ProductCard Component
 * Reusable product card displaying individual product info fetched from API.
 * Receives `product` object via props.
 */
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const {
    id,
    title,
    category,
    price,
    rating,
    discountPercentage,
    stock,
    thumbnail,
    images
  } = product;

  // Calculate original price before discount
  const originalPrice = (price / (1 - (discountPercentage || 0) / 100)).toFixed(2);
  const imageSrc = thumbnail || images?.[0] || 'https://via.placeholder.com/300?text=No+Image';

  return (
    <div className="product-card">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <span className="product-badge-discount">-{Math.round(discountPercentage)}%</span>
      )}

      {/* Product Image */}
      <div className="product-card-image-wrap">
        <img src={imageSrc} alt={title} loading="lazy" />
      </div>

      {/* Product Information Body */}
      <div className="product-card-body">
        <span className="product-card-category">{category}</span>
        
        <Link to={`/products/${id}`}>
          <h3 className="product-card-title" title={title}>{title}</h3>
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <Star size={16} fill="#f59e0b" color="#f59e0b" />
          <span>{rating ? rating.toFixed(1) : '4.5'}</span>
          <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
            ({stock > 0 ? `${stock} in stock` : 'Out of stock'})
          </span>
        </div>

        {/* Card Footer with Price and Actions */}
        <div className="product-card-footer">
          <div className="product-card-price">
            <span className="price-current">${price.toFixed(2)}</span>
            {discountPercentage > 0 && (
              <span className="price-old">${originalPrice}</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/products/${id}`} className="btn-secondary" style={{ padding: '0.5rem 0.75rem' }} title="View Details">
              <Eye size={16} />
            </Link>
            <button
              className="btn-icon-cart"
              onClick={() => addToCart(product, 1)}
              disabled={stock === 0}
              title="Add to Cart"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
