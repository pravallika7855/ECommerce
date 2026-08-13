import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Account from './pages/Account';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

/**
 * Main App Component
 * Configures React Router routes and CartContext Provider wrapper
 */
const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Main Layout routes with Navbar & Footer */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:category" element={<CategoryProducts />} />
            <Route path="cart" element={<Cart />} />
            
            {/* Nested Profile Routes */}
            <Route path="profile" element={<Profile />}>
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
