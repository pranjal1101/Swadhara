import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to calculate cart items from localStorage
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

    // Listen for custom cart-updated events from other pages
    window.addEventListener('cart-updated', updateCartCount);
    // Listen for storage events (if open in multiple tabs)
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          Swadhara
        </Link>

        {/* Hamburger Menu Icon */}
        <button 
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-links-left">
            <Link to="/courses" className={`nav-link ${location.pathname.startsWith('/courses') ? 'active' : ''}`}>
              {t('navLearn')}
            </Link>
            <Link to="/marketplace" className={`nav-link ${location.pathname === '/marketplace' ? 'active' : ''}`}>
              {t('navMarketplace')}
            </Link>
          </div>

          <div className="nav-links-right">
            {/* Language Switchers */}
            <div className="language-selector">
              <button 
                onClick={() => changeLanguage('en')} 
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
              <button 
                onClick={() => changeLanguage('hi')} 
                className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
              >
                हिंदी
              </button>
              <button 
                onClick={() => changeLanguage('gu')} 
                className={`lang-btn ${language === 'gu' ? 'active' : ''}`}
              >
                ગુજરાતી
              </button>
            </div>

            {/* Shopping Cart */}
            <Link to="/cart" className="cart-badge-link" aria-label="View Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
            </Link>

            {/* User Session Links */}
            {user ? (
              <>
                <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  {t('navDashboard')}
                </Link>
                {user.role === 'seller' && (
                  <Link to="/seller" className="nav-link maker-panel-link">
                    {t('navSellerDashboard')}
                  </Link>
                )}
                <Link to="/profile" className="profile-icon-link" title={t('navProfile')}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="profile-name-text">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="btn-logout" title={t('navLogout')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link-login">
                  {t('navLogin')}
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm btn-get-started">
                  {t('navRegister')}
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
