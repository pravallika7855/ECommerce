import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

/**
 * MainLayout Component
 * Main app wrapper containing Navbar, active route page content via Outlet, and Footer.
 */
const MainLayout = () => {
  const { toastMessage } = useCart();

  return (
    <div className="layout-container">
      {/* Toast notification overlay */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle size={20} style={{ color: 'var(--accent)' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
