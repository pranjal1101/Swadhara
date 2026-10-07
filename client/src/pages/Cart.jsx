import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';

export default function Cart() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Form states
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('swadhara_cart')) || [];
      setCartItems(cart);
      calculateTotal(cart);
    } catch (e) {
      setCartItems([]);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const handleQtyChange = (productId, change) => {
    const updated = cartItems.map((item) => {
      if (item.product === productId) {
        const newQty = item.quantity + change;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });

    setCartItems(updated);
    calculateTotal(updated);
    localStorage.setItem('swadhara_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleRemove = (productId) => {
    const filtered = cartItems.filter((item) => item.product !== productId);
    setCartItems(filtered);
    calculateTotal(filtered);
    localStorage.setItem('swadhara_cart', JSON.stringify(filtered));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (cartItems.length === 0) return;

    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity
      }));

      const shippingAddress = { street, city, state, zipCode, phone };

      const response = await axios.post('/api/orders', {
        items: orderItems,
        shippingAddress
      });

      if (response.data.success) {
        setSuccess(true);
        localStorage.removeItem('swadhara_cart');
        setCartItems([]);
        setTotal(0);
        window.dispatchEvent(new Event('cart-updated'));

        setTimeout(() => {
          navigate('/orders');
        }, 2500);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || 'Failed to place the order.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container section text-center" style={{ maxWidth: '600px' }}>
        <div className="card-pink-surface" style={{ padding: '48px 32px' }}>
          <CheckCircle2 size={48} style={{ color: '#2E6A34', marginBottom: '16px' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Order Placed Successfully!</h2>
          <p>Thank you for supporting Swadhara Makers. Redirecting to your order history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ marginBottom: '32px' }}>Your Shopping Bag</h1>

      {cartItems.length === 0 ? (
        <div className="empty-state-box">
          <p style={{ margin: '0 0 16px 0' }}>Your cart is empty.</p>
          <Link to="/marketplace" className="btn btn-rose">
            Explore Marketplace <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px' }}>
          {/* Cart Items List */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map((item) => (
                <div key={item.product} className="card-editorial" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                    <SafeImage src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 4px 0', color: 'var(--primary-dark)' }}>{item.name}</h3>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-light)', display: 'block', marginBottom: '10px' }}>
                      Maker: {item.sellerName}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {/* Quantity Selector */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: 'var(--border-radius-sm)', height: '36px', backgroundColor: '#FFFFFF' }}>
                        <button onClick={() => handleQtyChange(item.product, -1)} style={{ width: '32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Minus size={14} />
                        </button>
                        <span style={{ width: '32px', textAlign: 'center', fontWeight: '700', fontSize: '0.9rem' }}>{item.quantity}</span>
                        <button onClick={() => handleQtyChange(item.product, 1)} style={{ width: '32px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={14} />
                        </button>
                      </div>

                      <button onClick={() => handleRemove(item.product)} style={{ color: 'var(--error-text)', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-dark)', flexShrink: 0 }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '700', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              <span>Total Amount:</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Delivery Details Form */}
          <div className="card-pink-surface" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Delivery Details</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleCheckoutSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="street">Street Address</label>
                <input
                  type="text"
                  id="street"
                  className="input-field"
                  placeholder="House No, Building, Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">City / Town</label>
                <input
                  type="text"
                  id="city"
                  className="input-field"
                  placeholder="e.g. Jaipur"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  className="input-field"
                  placeholder="e.g. Rajasthan"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="zipCode">ZIP / Postal Code</label>
                <input
                  type="text"
                  id="zipCode"
                  className="input-field"
                  placeholder="e.g. 302001"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="input-field"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '20px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  Demo payment — no real money will be charged.
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-rose btn-lg"
                style={{ width: '100%', fontSize: '1.1rem', fontWeight: '700' }}
                disabled={loading}
              >
                {loading ? 'Processing payment...' : user ? `Pay ₹${total.toLocaleString('en-IN')}` : 'Sign In to Pay'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
