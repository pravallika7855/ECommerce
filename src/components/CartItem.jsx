import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';

/**
 * CartItem Component
 * Renders individual product row inside the shopping cart.
 * Receives `item`, `onIncrease`, `onDecrease`, and `onRemove` via props.
 */
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  if (!item) return null;

  const { id, title, price, thumbnail, brand, quantity, stock } = item;
  const itemSubtotal = (price * quantity).toFixed(2);

  return (
    <div className="cart-item-card">
      {/* Product Image */}
      <div className="cart-item-img">
        <img src={thumbnail || 'https://via.placeholder.com/90'} alt={title} />
      </div>

      {/* Product Details */}
      <div className="cart-item-details">
        <Link to={`/products/${id}`}>
          <h4>{title}</h4>
        </Link>
        <p className="cart-item-brand">Brand: {brand || 'Generic'}</p>
        <span className="cart-item-price">${price.toFixed(2)} each</span>
      </div>

      {/* Quantity Stepper */}
      <div className="quantity-stepper">
        <button
          onClick={() => onDecrease(id)}
          disabled={quantity <= 1}
          title="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => onIncrease(id)}
          disabled={quantity >= stock}
          title="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Item Subtotal & Delete Action */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>${itemSubtotal}</span>
        <button
          className="cart-item-remove"
          onClick={() => onRemove(id)}
          title="Remove from cart"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
