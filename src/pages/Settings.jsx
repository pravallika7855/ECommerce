import React, { useState } from 'react';
import { Bell, Lock, Globe, Moon, Save } from 'lucide-react';

/**
 * Settings Page Component (Nested Profile Sub-route)
 * App & account preferences settings
 */
const Settings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="settings-subpage">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Preferences & Settings</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Manage your notification settings and display options.</p>

      {saved && (
        <div className="toast-notification" style={{ position: 'static', marginBottom: '1.5rem' }}>
          Preferences updated!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={18} color="var(--primary)" /> Email Notifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
              />
              <span>Order status update emails</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={promoAlerts}
                onChange={(e) => setPromoAlerts(e.target.checked)}
              />
              <span>Promotional discounts and newsletter updates</span>
            </label>
          </div>
        </div>

        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="var(--primary)" /> Currency & Region
          </h3>
          <div className="form-group" style={{ maxWidth: '300px' }}>
            <label>Preferred Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD ($ - US Dollar)</option>
              <option value="EUR">EUR (€ - Euro)</option>
              <option value="GBP">GBP (£ - British Pound)</option>
            </select>
          </div>
        </div>

        <div>
          <button type="submit" className="btn-primary">
            <Save size={18} />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
