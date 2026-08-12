import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('swadhara_cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (e) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    window.addEventListener('storage', updateCartCount);
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleLanguageCycle = () => {
    if (language === 'en') {
      changeLanguage('hi');
    } else if (language === 'hi') {
      changeLanguage('gu');
    } else {
      changeLanguage('en');
    }
  };

  const getLanguageLabel = () => {
    if (language === 'en') return 'EN';
    if (language === 'hi') return 'हि';
    return 'ગુ';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Left Navigation Rail */}
      <aside className="desktop-sidebar-rail">
        {/* Top Branding Logo */}
        <div className="sidebar-logo-wrapper" onClick={() => navigate('/')}>
          <svg className="sidebar-logo-icon" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        {/* Middle Navigation Group */}
        <nav className="sidebar-nav-links">
          {/* Home Link */}
          <button 
            onClick={() => navigate('/')} 
            className={`sidebar-link-btn ${isActive('/') ? 'active' : ''}`}
            title="Home"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>

          {/* Learn Link */}
          <button 
            onClick={() => navigate('/courses')} 
            className={`sidebar-link-btn ${isActive('/courses') ? 'active' : ''}`}
            title={t('navLearn')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          </button>

          {/* Marketplace Link */}
          <button 
            onClick={() => navigate('/marketplace')} 
            className={`sidebar-link-btn ${isActive('/marketplace') ? 'active' : ''}`}
            title={t('navMarketplace')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </button>

          {/* Cart Link with Badge */}
          <button 
            onClick={() => navigate('/cart')} 
            className={`sidebar-link-btn cart-btn-relative ${isActive('/cart') ? 'active' : ''}`}
            title="Cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="sidebar-badge-count">{cartCount}</span>}
          </button>

          {/* Learner Dashboard Link (Only if logged in) */}
          {user && (
            <button 
              onClick={() => navigate('/dashboard')} 
              className={`sidebar-link-btn ${isActive('/dashboard') ? 'active' : ''}`}
              title={t('navDashboard')}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
            </button>
          )}

          {/* Maker Panel Link (Only if upgraded to seller) */}
          {user && user.role === 'seller' && (
            <button 
              onClick={() => navigate('/seller')} 
              className={`sidebar-link-btn maker-badge-link ${isActive('/seller') ? 'active' : ''}`}
              title={t('navSellerDashboard')}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          )}

          {/* Orders Link (Only if logged in) */}
          {user && (
            <button 
              onClick={() => navigate('/orders')} 
              className={`sidebar-link-btn ${isActive('/orders') ? 'active' : ''}`}
              title="Orders"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </button>
          )}
        </nav>

        {/* Bottom User/Utility Group */}
        <div className="sidebar-utility-footer">
          {/* Cycle Language Switcher Button */}
          <button 
            onClick={handleLanguageCycle} 
            className="sidebar-lang-cycle-btn"
            title="Switch Language"
          >
            {getLanguageLabel()}
          </button>

          {/* User Profile / Login Link */}
          {user ? (
            <div className="sidebar-user-avatar-group">
              <button 
                onClick={() => navigate('/profile')} 
                className={`sidebar-avatar-circle ${isActive('/profile') ? 'active' : ''}`}
                title={t('navProfile')}
              >
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </button>
              <button 
                onClick={handleLogout} 
                className="sidebar-logout-btn"
                title={t('navLogout')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className="sidebar-link-btn"
              title={t('navLogin')}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13 12H3" />
              </svg>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar & Mobile Top Bar */}
      <div className="mobile-only-header">
        <span className="mobile-logo-text" onClick={() => navigate('/')}>Swadhara</span>
        <div className="mobile-header-actions">
          <button onClick={handleLanguageCycle} className="mobile-lang-btn">
            {getLanguageLabel()}
          </button>
          {user && (
            <button onClick={handleLogout} className="mobile-logout-btn" title={t('navLogout')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <nav className="mobile-bottom-nav">
        <button 
          onClick={() => navigate('/')} 
          className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span className="mobile-nav-label">Home</span>
        </button>

        <button 
          onClick={() => navigate('/courses')} 
          className={`mobile-nav-item ${isActive('/courses') ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          </svg>
          <span className="mobile-nav-label">Learn</span>
        </button>

        <button 
          onClick={() => navigate('/marketplace')} 
          className={`mobile-nav-item ${isActive('/marketplace') ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
          <span className="mobile-nav-label">Market</span>
        </button>

        <button 
          onClick={() => navigate('/cart')} 
          className={`mobile-nav-item ${isActive('/cart') ? 'active' : ''}`}
        >
          <div style={{ position: 'relative' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            </svg>
            {cartCount > 0 && <span className="mobile-badge-count">{cartCount}</span>}
          </div>
          <span className="mobile-nav-label">Cart</span>
        </button>

        {user ? (
          <button 
            onClick={() => navigate('/profile')} 
            className={`mobile-nav-item ${isActive('/profile') ? 'active' : ''}`}
          >
            <div className="mobile-avatar-icon">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="mobile-avatar-img" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <span className="mobile-nav-label">Profile</span>
          </button>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className={`mobile-nav-item ${isActive('/login') ? 'active' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5" />
            </svg>
            <span className="mobile-nav-label">Login</span>
          </button>
        )}
      </nav>
    </>
  );
}
