import React from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Package, User, Settings as SettingsIcon } from 'lucide-react';

/**
 * Profile Parent Page Layout Component
 * Contains user summary sidebar, tab navigation links, and renders active child routes via <Outlet />.
 */
const Profile = () => {
  const location = useLocation();

  // If user navigates directly to /profile, redirect to /profile/account
  if (location.pathname === '/profile' || location.pathname === '/profile/') {
    return <Navigate to="/profile/account" replace />;
  }

  return (
    <div className="profile-page">
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>User Account & Settings</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your personal details, order history, and preferences</p>
        </div>
      </div>

      <div className="profile-layout">
        {/* Profile Navigation Sidebar */}
        <aside className="profile-sidebar">
          <div className="user-card-preview">
            <div className="avatar-bubble">JD</div>
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>Jane Doe</h3>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>jane.doe@example.com</span>
            </div>
          </div>

          <ul className="profile-nav-list">
            <li>
              <NavLink
                to="/profile/account"
                className={({ isActive }) => (isActive ? 'profile-nav-item active' : 'profile-nav-item')}
              >
                <User size={18} />
                Account Info
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) => (isActive ? 'profile-nav-item active' : 'profile-nav-item')}
              >
                <Package size={18} />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/settings"
                className={({ isActive }) => (isActive ? 'profile-nav-item active' : 'profile-nav-item')}
              >
                <SettingsIcon size={18} />
                Settings
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Nested Route Outlet Content */}
        <div className="profile-content-card">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
