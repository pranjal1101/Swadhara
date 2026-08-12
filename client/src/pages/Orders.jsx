import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function Orders() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Confirmed': return 'status-confirmed';
      case 'Shipped': return 'status-shipped';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '80px', width: '100%', marginBottom: '16px' }}></div>
        <div className="skeleton" style={{ height: '80px', width: '100%', marginBottom: '16px' }}></div>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: '800px' }}>
      <div className="orders-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="orders-page-title" style={{ margin: 0 }}>
          {t('orderHistory')}
        </h1>
        <Link to="/marketplace" className="btn btn-secondary btn-sm">
          &larr; Return to Market
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {orders.length === 0 ? (
        <div className="empty-state-box" style={{ padding: '64px 24px' }}>
          <p>Your orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list-wrapper">
          {orders.map((order) => (
            <div key={order._id} className="order-summary-card">
              {/* Order Header Summary */}
              <div className="order-summary-header">
                <div className="order-header-info">
                  <span className="order-id-label">Order ID: #{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                  <span className="order-date-text">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="order-header-status">
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="order-summary-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <div className="order-item-main">
                      <span className="order-item-name">{item.product ? item.product.name : 'Unknown Product'}</span>
                      <span className="order-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="order-item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Order Footer summary */}
              <div className="order-summary-footer">
                <div className="order-shipping-summary">
                  <span className="shipping-label">Ship to:</span>
                  <p className="shipping-address-text" style={{ fontSize: '0.85rem', color: 'var(--text-light)', margin: 0 }}>
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                  </p>
                </div>
                <div className="order-total-amount">
                  <span className="total-label">Total Paid:</span>
                  <span className="total-value">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
