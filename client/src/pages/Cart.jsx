import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

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
        return { ...item, quantity: Math.max(1, newQty) }; // Min 1
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
      // Redirect to login, preservation of cart remains in localStorage
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (cartItems.length === 0) return;

    setLoading(true);

    try {
      // Map cartItems to fit backend requirements (product ID and quantity)
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
        // Clear cart
        localStorage.removeItem('swadhara_cart');
        setCartItems([]);
        setTotal(0);
        window.dispatchEvent(new Event('cart-updated'));
        
        // Redirect to orders page after 2.5 seconds
        setTimeout(() => {
          navigate('/orders');
        }, 2500);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || 'Failed to place the order. Please check stock levels.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container section text-center" style={{ maxWidth: '600px' }}>
        <div className="alert alert-success" style={{ padding: '36px' }}>
          <h2 style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '16px' }}>
            {t('orderSuccess')}
          </h2>
          <p>Thank you for supporting Swadhara Makers! You are being redirected to your order log...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 className="cart-page-title" style={{ marginBottom: '32px' }}>
        {t('cartTitle')}
      </h1>

      {cartItems.length === 0 ? (
        <div className="empty-state-box" style={{ padding: '64px 24px' }}>
          <p style={{ marginBottom: '20px' }}>{t('emptyCart')}</p>
          <Link to="/marketplace" className="btn btn-primary">
            {t('ctaExploreMarketplace')}
          </Link>
        </div>
      ) : (
        <div className="cart-checkout-layout">
          {/* Cart items list */}
          <div className="cart-items-column">
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.product} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.name}</h3>
                    <span className="cart-item-maker" style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      {t('seller')}: {item.sellerName}
                    </span>
                    <div className="cart-item-price-qty-row">
                      <span className="cart-item-unit-price">₹{item.price}</span>
                      
                      {/* Quantity change buttons */}
                      <div className="quantity-counter-widget btn-sm">
                        <button 
                          onClick={() => handleQtyChange(item.product, -1)} 
                          className="counter-btn"
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className="quantity-count-number">{item.quantity}</span>
                        <button 
                          onClick={() => handleQtyChange(item.product, 1)} 
                          className="counter-btn"
                          aria-label="Increase quantity"
                        >
                          &#43;
                        </button>
                      </div>

                      <button 
                        onClick={() => handleRemove(item.product)} 
                        className="cart-item-remove-btn"
                        title="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-subtotal">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-row" style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '600' }}>
              <span>{t('cartTotal')}:</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Checkout delivery details form */}
          <div className="checkout-form-column">
            <div className="sidebar-card">
              <h2 style={{ borderBottom: 'none', paddingBottom: 0, fontSize: '1.35rem', marginBottom: '20px' }}>
                {t('checkoutTitle')}
              </h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleCheckoutSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="street">{t('shippingStreet')}</label>
                  <input
                    type="text"
                    id="street"
                    className="form-control"
                    placeholder="House No, Building, Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="city">{t('shippingCity')}</label>
                  <input
                    type="text"
                    id="city"
                    className="form-control"
                    placeholder="e.g. Jaipur"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="state">{t('shippingState')}</label>
                  <input
                    type="text"
                    id="state"
                    className="form-control"
                    placeholder="e.g. Rajasthan"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="zipCode">{t('shippingZip')}</label>
                  <input
                    type="text"
                    id="zipCode"
                    className="form-control"
                    placeholder="e.g. 302001"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label" htmlFor="phone">{t('shippingPhone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  {loading ? t('loading') : user ? t('placeOrder') : 'Login to Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
