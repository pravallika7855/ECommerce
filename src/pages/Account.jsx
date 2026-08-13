import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Check } from 'lucide-react';

/**
 * Account Page Component (Nested Profile Sub-route)
 * User personal details management form
 */
const Account = () => {
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Springfield',
    city: 'Springfield',
    zipCode: '97477'
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="account-subpage">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Account Details</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Update your profile personal information and delivery address.</p>

      {saved && (
        <div className="toast-notification" style={{ position: 'static', marginBottom: '1.5rem' }}>
          <Check size={18} /> Account details saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>ZIP / Postal Code</label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '2rem' }}>
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Account;
