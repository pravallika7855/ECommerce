import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowLeft, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

/**
 * Cart Page Component
 * Renders list of cart items, price summary breakdown, empty state, and checkout action
 */
const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalQuantity
  } = useCart();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const shippingCost = totalPrice > 100 || totalQuantity === 0 ? 0 : 9.99;
  const grandTotal = totalPrice + shippingCost;

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  // If Checkout complete success screen
  if (checkoutSuccess) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" style={{ background: 'var(--primary-light)', color: 'var(--accent)' }}>
          <CheckCircle2 size={48} />
        </div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase. Your items will be dispatched shortly.</p>
        <Link to="/products" className="btn-primary" onClick={() => setCheckoutSuccess(false)}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  // If Empty Cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <ShoppingBag size={44} />
        </div>
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added any items to your shopping cart yet.</p>
        <Link to="/products" className="btn-primary">
          <ArrowLeft size={18} />
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Your Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Review your {totalQuantity} item{totalQuantity > 1 ? 's' : ''} before checkout
          </p>
        </div>
        <button
          className="btn-secondary"
          onClick={clearCart}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444' }}
        >
          <Trash2 size={16} />
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Order Summary Panel */}
        <div className="order-summary-card">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items Subtotal ({totalQuantity})</span>
            <span style={{ fontWeight: 600 }}>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping Fee</span>
            <span>{shippingCost === 0 ? <strong style={{ color: 'var(--accent)' }}>FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            className="btn-primary"
            onClick={handleCheckout}
            style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '1rem' }}
          >
            Proceed to Checkout
          </button>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={14} /> 256-Bit SSL Encrypted Safe Checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
