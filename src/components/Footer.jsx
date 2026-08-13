import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

/**
 * Footer Component
 * Application footer with site links, copyright, and store guarantees
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Information */}
        <div className="footer-brand">
          <h3>
            <ShoppingBag size={24} style={{ color: 'var(--primary)' }} />
            NovaMarket
          </h3>
          <p>
            Your ultimate destination for modern shopping. Discover thousands of curated products from top categories with fast delivery and seamless checkout.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
          </ul>
        </div>

        {/* Account Links */}
        <div className="footer-column">
          <h4>Account</h4>
          <ul className="footer-links">
            <li><Link to="/profile/account">My Account</Link></li>
            <li><Link to="/profile/orders">Order History</Link></li>
            <li><Link to="/profile/settings">Settings</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-column">
          <h4>Customer Care</h4>
          <ul className="footer-links">
            <li><a href="#help">Help & FAQs</a></li>
            <li><a href="#shipping">Shipping Policy</a></li>
            <li><a href="#returns">Returns & Refunds</a></li>
            <li><a href="#contact">Contact Support</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NovaMarket Inc. Built with React & DummyJSON API.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          Made with <Heart size={14} fill="#ef4444" color="#ef4444" /> for modern web experiences.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
