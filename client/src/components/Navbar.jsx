import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Search, ShoppingBag, User, BookOpen, Compass, Layers, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

      <header className="top-header-bar">
        <div className="header-container">

          <div className="header-brand" onClick={() => navigate('/')}>
            <span className="header-brand-logo">Swadhara</span>
            <span className="header-brand-dot"></span>
          </div>

          <nav className="header-nav-links">
            <Link
              to="/courses"
              className={`header-nav-link ${isActive('/courses') ? 'active' : ''}`}
            >
              Learn
            </Link>

            <Link
              to={user?.role === 'seller' ? '/seller' : '/profile'}
              className={`header-nav-link ${isActive('/seller') ? 'active' : ''}`}
            >
              Create
            </Link>

            <Link
              to="/marketplace"
              className={`header-nav-link ${isActive('/marketplace') ? 'active' : ''}`}
            >
              Marketplace
            </Link>

            {user && (
              <Link
                to="/orders"
                className={`header-nav-link ${isActive('/orders') ? 'active' : ''}`}
              >
                My Orders
              </Link>
            )}

            <Link
              to={user ? '/dashboard' : '/login'}
              className={`header-nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              My Journey
            </Link>
          </nav>

          <div className="header-utility-actions">

            <button
              className="icon-action-btn"
              onClick={() => navigate('/courses')}
              title="Search Courses & Products"
            >
              <Search size={19} />
            </button>

            <button
              className="icon-action-btn"
              onClick={() => navigate('/cart')}
              title="Shopping Cart"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="header-badge-count">{cartCount}</span>}
            </button>

            <button
              onClick={handleLanguageCycle}
              className="lang-toggle-btn"
              title="Switch Language"
            >
              {getLanguageLabel()}
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => navigate('/profile')}
                  className="user-avatar-btn"
                  title={user.name}
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="icon-action-btn"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="btn btn-primary btn-sm btn-pill"
              >
                Sign In
              </button>
            )}

            <button
              className="icon-action-btn mobile-only-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none' }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <nav className="mobile-bottom-bar">
        <button
          onClick={() => navigate('/')}
          className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}
        >
          <Compass size={20} />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigate('/courses')}
          className={`mobile-nav-item ${isActive('/courses') ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          <span>Learn</span>
        </button>

        <button
          onClick={() => navigate('/marketplace')}
          className={`mobile-nav-item ${isActive('/marketplace') ? 'active' : ''}`}
        >
          <ShoppingBag size={20} />
          <span>Market</span>
        </button>

        <button
          onClick={() => navigate(user ? '/dashboard' : '/login')}
          className={`mobile-nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <Layers size={20} />
          <span>Journey</span>
        </button>

        <button
          onClick={() => navigate(user ? '/profile' : '/login')}
          className={`mobile-nav-item ${isActive('/profile') ? 'active' : ''}`}
        >
          <User size={20} />
          <span>{user ? 'Profile' : 'Login'}</span>
        </button>
      </nav>
    </>
  );
}
