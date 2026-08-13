import React from 'react';
import { Package, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Orders Page Component (Nested Profile Sub-route)
 * Displays list of past user orders
 */
const Orders = () => {
  const mockOrders = [
    {
      id: 'ORD-98421',
      date: '2026-08-10',
      total: 149.95,
      status: 'Delivered',
      items: [
        { title: 'Essence Mascara Lash Princess', price: 9.99, qty: 2 },
        { title: 'Eyeshadow Palette with Mirror', price: 19.99, qty: 1 }
      ]
    },
    {
      id: 'ORD-76219',
      date: '2026-07-28',
      total: 89.00,
      status: 'Shipped',
      items: [
        { title: 'Powder Canister Premium', price: 89.00, qty: 1 }
      ]
    }
  ];

  return (
    <div className="orders-subpage">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Your Orders</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {mockOrders.map((order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              background: 'var(--bg-main)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{order.id}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.75rem' }}>Placed on {order.date}</span>
              </div>
              <span
                style={{
                  background: order.status === 'Delivered' ? '#d1fae5' : '#e0e7ff',
                  color: order.status === 'Delivered' ? '#065f46' : 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                {order.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem' }}>
                  <span>{item.qty}x {item.title}</span>
                  <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)' }}>
              <span style={{ fontWeight: 700 }}>Total Paid: ${order.total.toFixed(2)}</span>
              <button className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
