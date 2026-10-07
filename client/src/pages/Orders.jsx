import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Package, CheckCircle2, Clock, Truck, ArrowLeft, Eye, X, User, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';

export default function Orders() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/orders');
      if (response.data && response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load your order history. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'PENDING': return 1;
      case 'CONFIRMED': return 2;
      case 'DELIVERED': return 3;
      default: return 1;
    }
  };

  if (loading) {
    return (
      <div className="container section" style={{ maxWidth: '840px' }}>
        <div className="skeleton" style={{ height: '80px', width: '100%', marginBottom: '24px' }}></div>
        <div className="skeleton" style={{ height: '140px', width: '100%', marginBottom: '16px' }}></div>
        <div className="skeleton" style={{ height: '140px', width: '100%' }}></div>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: '880px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '2.2rem', color: 'var(--primary-dark)' }}>
            My Orders
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Track your purchases and view order status progress
          </p>
        </div>
        <Link to="/marketplace" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> Explore Marketplace
        </Link>
      </div>

      {error && <div className="alert alert-danger" style={{ marginBottom: '24px' }}>{error}</div>}

      {orders.length === 0 ? (
        <div className="empty-state-box" style={{ padding: '48px 24px', textCenter: 'center' }}>
          <Package size={48} style={{ color: 'var(--primary-rose-dark)', marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', color: 'var(--primary-dark)' }}>No Orders Placed Yet</h3>
          <p style={{ margin: '0 0 20px 0', color: 'var(--text-muted)' }}>
            Your purchased items will appear here after checkout.
          </p>
          <Link to="/marketplace" className="btn btn-rose btn-md">
            Browse Handmade Creations
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map((order) => {
            const orderNum = order.orderNumber || `SWD-${order._id.substring(order._id.length - 6).toUpperCase()}`;
            const firstItem = order.items && order.items[0];
            const product = firstItem?.product;
            const sellerName = product?.seller?.name || 'Meena Sharma';
            const productImage = product?.images?.[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop';

            return (
              <div key={order._id} className="card-editorial" style={{ padding: '24px' }}>
                {/* Order Top Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '14px'
                }}>
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary-dark)', display: 'block' }}>
                      Order #{orderNum}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      backgroundColor: '#E6F4EA',
                      color: '#137333',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: '1px solid #CEEAD6'
                    }}>
                      PAID
                    </span>

                    <span style={{
                      backgroundColor: order.status === 'DELIVERED' ? '#E6F4EA' : order.status === 'CONFIRMED' ? '#E8F0FE' : '#FEF7E0',
                      color: order.status === 'DELIVERED' ? '#137333' : order.status === 'CONFIRMED' ? '#1A73E8' : '#B06000',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items Body */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-subtle)' }}>
                    <SafeImage src={productImage} alt={product?.name || 'Product'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 4px 0', color: 'var(--primary-dark)' }}>
                      {product?.name || 'Handcrafted Item'}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      by <strong style={{ color: 'var(--primary-rose-dark)' }}>{sellerName}</strong>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      Qty: {firstItem?.quantity || 1} &bull; ₹{(firstItem?.price || order.totalAmount).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Total Amount</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Delivery to: {order.shippingAddress?.city}, {order.shippingAddress?.state}
                  </span>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Eye size={15} /> View Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="card-editorial" style={{
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            backgroundColor: '#FFFFFF',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={22} />
            </button>

            <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-rose-dark)', display: 'block', marginBottom: '4px' }}>
              Order Details
            </span>
            <h2 style={{ fontSize: '1.6rem', margin: '0 0 16px 0', color: 'var(--primary-dark)' }}>
              Order #{selectedOrder.orderNumber || `SWD-${selectedOrder._id.substring(selectedOrder._id.length - 6).toUpperCase()}`}
            </h2>

            {/* VISUAL STATUS PROGRESSION TRACKER */}
            <div style={{
              backgroundColor: 'var(--bg-pink-soft)',
              borderRadius: 'var(--border-radius-md)',
              padding: '24px 20px',
              marginBottom: '28px',
              border: '1px solid var(--border-subtle)'
            }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: 'var(--primary-dark)', textAlign: 'center' }}>
                Order Lifecycle Progression
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                {/* Step 1: PENDING */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: getStatusStepIndex(selectedOrder.status) >= 1 ? 'var(--primary-rose-dark)' : '#E0E0E0',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    marginBottom: '8px'
                  }}>
                    {getStatusStepIndex(selectedOrder.status) > 1 ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                  </div>
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: getStatusStepIndex(selectedOrder.status) === 1 ? '700' : '500',
                    color: getStatusStepIndex(selectedOrder.status) >= 1 ? 'var(--primary-dark)' : 'var(--text-muted)'
                  }}>
                    PENDING
                  </span>
                </div>

                {/* Connecting Line 1 */}
                <div style={{
                  height: '3px',
                  backgroundColor: getStatusStepIndex(selectedOrder.status) >= 2 ? 'var(--primary-rose-dark)' : '#E0E0E0',
                  flex: 1,
                  marginTop: '-24px'
                }}></div>

                {/* Step 2: CONFIRMED */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: getStatusStepIndex(selectedOrder.status) >= 2 ? 'var(--primary-rose-dark)' : '#E0E0E0',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    marginBottom: '8px'
                  }}>
                    {getStatusStepIndex(selectedOrder.status) > 2 ? <CheckCircle2 size={20} /> : <CheckCircle2 size={20} />}
                  </div>
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: getStatusStepIndex(selectedOrder.status) === 2 ? '700' : '500',
                    color: getStatusStepIndex(selectedOrder.status) >= 2 ? 'var(--primary-dark)' : 'var(--text-muted)'
                  }}>
                    CONFIRMED
                  </span>
                </div>

                {/* Connecting Line 2 */}
                <div style={{
                  height: '3px',
                  backgroundColor: getStatusStepIndex(selectedOrder.status) >= 3 ? 'var(--primary-rose-dark)' : '#E0E0E0',
                  flex: 1,
                  marginTop: '-24px'
                }}></div>

                {/* Step 3: DELIVERED */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: getStatusStepIndex(selectedOrder.status) >= 3 ? '#2E6A34' : '#E0E0E0',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    marginBottom: '8px'
                  }}>
                    <Truck size={20} />
                  </div>
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: getStatusStepIndex(selectedOrder.status) === 3 ? '700' : '500',
                    color: getStatusStepIndex(selectedOrder.status) >= 3 ? '#2E6A34' : 'var(--text-muted)'
                  }}>
                    DELIVERED
                  </span>
                </div>
              </div>
            </div>

            {/* Product Summary */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--primary-dark)' }}>Purchased Items</h4>
              {selectedOrder.items.map((item, idx) => {
                const prod = item.product;
                const img = prod?.images?.[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop';
                const seller = prod?.seller?.name || 'Meena Sharma';

                return (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    padding: '12px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--border-radius-sm)',
                    marginBottom: '10px'
                  }}>
                    <img src={img} alt={prod?.name || 'Item'} style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                    <div style={{ flexGrow: 1 }}>
                      <h5 style={{ margin: '0 0 2px 0', fontSize: '0.98rem', color: 'var(--primary-dark)' }}>{prod?.name || 'Creation'}</h5>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block' }}>
                        Seller: {seller} &bull; Qty: {item.quantity}
                      </span>
                    </div>
                    <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--primary-dark)' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Info Grid: Address & Payment */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#FAF8F9', padding: '16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  DELIVERY ADDRESS
                </span>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  {selectedOrder.shippingAddress?.street}<br />
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.zipCode}<br />
                  Phone: {selectedOrder.shippingAddress?.phone}
                </p>
              </div>

              <div style={{ backgroundColor: '#FAF8F9', padding: '16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  PAYMENT INFORMATION
                </span>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                  <div>Status: <strong style={{ color: '#137333' }}>PAID</strong></div>
                  <div>Method: Demo Payment</div>
                  <div>Total Paid: <strong style={{ color: 'var(--primary-dark)' }}>₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</strong></div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button onClick={() => setSelectedOrder(null)} className="btn btn-outline btn-md">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
