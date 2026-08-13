import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, Home, Grid, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Navbar Component
 * Header navigation with brand logo, dynamic cart badge, active link indicator, and mobile toggle
 */
const Navbar = () => {
  const { totalQuantity } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="logo-icon">
            <ShoppingBag size={22} />
          </div>
          <span>NovaMarket</span>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Header Action Icons */}
        <div className="nav-actions">
          <Link to="/cart" className="icon-btn" title="View Cart">
            <ShoppingCart size={20} />
            {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </Link>

          <Link to="/profile/account" className="icon-btn" title="User Profile">
            <User size={20} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
