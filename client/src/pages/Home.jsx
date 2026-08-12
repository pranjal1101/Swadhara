import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';

export default function Home() {
  const { user } = useAuth();
  const { t, tDynamic } = useLanguage();
  const navigate = useNavigate();

  // Data States
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledProgress, setEnrolledProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter Category State
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [catsRes, prodsRes, coursesRes] = await Promise.all([
          axios.get('/api/products/categories'),
          axios.get('/api/products'),
          axios.get('/api/courses')
        ]);

        if (catsRes.data.success) {
          setCategories(catsRes.data.data);
        }
        if (prodsRes.data.success) {
          setProducts(prodsRes.data.data);
        }
        if (coursesRes.data.success) {
          setCourses(coursesRes.data.data);
        }

        // Fetch user progress if authenticated
        if (user) {
          const progressRes = await axios.get('/api/courses/user/enrolled');
          if (progressRes.data.success) {
            setEnrolledProgress(progressRes.data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [user]);

  // Filter content cards by category
  const getFilteredContent = () => {
    let filteredCourses = courses;
    let filteredProducts = products;

    if (activeCategory !== 'all') {
      filteredCourses = courses.filter(
        c => c.category?.slug === activeCategory || c.category === activeCategory
      );
      filteredProducts = products.filter(
        p => p.category?.slug === activeCategory || p.category === activeCategory
      );
    }

    // Build mixed grid: interleaving 2 courses and 2 products
    const mixed = [];
    const maxItems = 4;
    let courseIdx = 0;
    let prodIdx = 0;

    for (let i = 0; i < maxItems; i++) {
      if (i % 2 === 0 && courseIdx < filteredCourses.length) {
        mixed.push({ type: 'learning', data: filteredCourses[courseIdx++] });
      } else if (prodIdx < filteredProducts.length) {
        mixed.push({ type: 'marketplace', data: filteredProducts[prodIdx++] });
      } else if (courseIdx < filteredCourses.length) {
        // Fallback if no products
        mixed.push({ type: 'learning', data: filteredCourses[courseIdx++] });
      }
    }

    return mixed;
  };

  const mixedCards = getFilteredContent();

  // Stats computation for right personal panel
  const getCreationsStats = () => {
    if (!user || user.role !== 'seller') {
      // Return default visual promo stats
      return { count: 3, value: 2450 };
    }
    const myProducts = products.filter(p => p.seller?._id === user._id || p.seller === user._id);
    const totalValue = myProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
    return { count: myProducts.length, value: totalValue };
  };

  const creationsStats = getCreationsStats();

  return (
    <div className="homepage-container-layout">
      {/* Middle/Main Content Area Column */}
      <div className="homepage-main-col">
        {/* Main Heading & Editorial Text */}
        <header className="homepage-main-header">
          <h1 className="editorial-main-heading">Learn. Create. Earn.</h1>
          <p className="editorial-subtitle-para">
            Learn practical skills, turn them into handmade creations, and share them with the world.
          </p>
        </header>

        {/* Categories Pills Navigation Row */}
        <div className="categories-pills-row">
          <button 
            onClick={() => setActiveCategory('all')} 
            className={`pill-btn ${activeCategory === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`pill-btn ${activeCategory === cat.slug ? 'active' : ''}`}
            >
              {tDynamic(cat.name)}
            </button>
          ))}
        </div>

        {/* Mixed Content Cards Grid */}
        {loading ? (
          <div className="mixed-content-cards-grid">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="card skeleton-card" style={{ height: '240px' }}>
                <div className="skeleton" style={{ height: '140px', width: '100%' }}></div>
                <div className="card-body">
                  <div className="skeleton" style={{ height: '20px', width: '70%' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : mixedCards.length === 0 ? (
          <div className="empty-state-box" style={{ padding: '64px 24px' }}>
            <p>{t('noData')}</p>
          </div>
        ) : (
          <div className="mixed-content-cards-grid">
            {mixedCards.map((item, idx) => {
              if (item.type === 'learning') {
                const course = item.data;
                const progressObj = enrolledProgress.find(p => p.course?._id === course._id);
                const percent = progressObj ? progressObj.percentage : 0;
                
                return (
                  <div 
                    key={`course-${course._id}-${idx}`}
                    className="home-card card-learning"
                    onClick={() => navigate(`/courses/${course._id}`)}
                  >
                    <div className="home-card-header">
                      <span className="card-type-tag label-learning">
                        <svg className="card-tag-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        Learning
                      </span>
                    </div>
                    <div className="home-card-body">
                      <h3 className="home-card-title">{tDynamic(course.title)}</h3>
                      <p className="home-card-meta">{course.level} &bull; {course.lessonsCount || 8} lessons</p>
                      
                      {/* Compact Progress tracker */}
                      {user && progressObj && (
                        <div className="card-progress-bar-container">
                          <div className="card-progress-track">
                            <div className="card-progress-fill" style={{ width: `${percent}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              } else {
                const product = item.data;
                return (
                  <div 
                    key={`product-${product._id}-${idx}`}
                    className="home-card card-marketplace"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <div className="home-card-header">
                      <span className="card-type-tag label-marketplace">Marketplace</span>
                      {product.stock > 0 ? (
                        <span className="home-card-stock-badge stock-in">In Stock</span>
                      ) : (
                        <span className="home-card-stock-badge stock-out">Out of Stock</span>
                      )}
                    </div>
                    <div className="home-card-body">
                      <h3 className="home-card-title">{product.name}</h3>
                      <p className="home-card-meta">₹{product.price} &bull; Handmade by {product.seller?.name || 'Maker'}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>

      {/* Right Personal Panel Sidebar Column */}
      <aside className="homepage-right-sidebar">
        {/* User profile header card */}
        <div className="sidebar-profile-card">
          <div className="profile-card-flex">
            <div className="profile-card-avatar" onClick={() => navigate('/profile')}>
              {user?.profileImage ? (
                <img src={user.profileImage} alt={user.name} />
              ) : (
                user?.name.charAt(0).toUpperCase() || 'G'
              )}
            </div>
            <div className="profile-card-details">
              <h2 className="profile-card-name" onClick={() => navigate('/profile')}>
                {user ? user.name : 'Welcome, Guest'}
              </h2>
              <span className="profile-card-label">
                {user ? (user.role === 'seller' ? 'Maker Account' : 'Learner Account') : 'Browse Mode'}
              </span>
            </div>
            <button 
              onClick={() => navigate(user ? '/profile' : '/login')} 
              className="profile-card-settings-btn"
              title="Profile Settings"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Section 1: My Swadhara Journey */}
        <div className="personal-hub-card">
          <h3 className="personal-hub-title">My Swadhara</h3>
          
          {user ? (
            <div className="personal-hub-metrics-list">
              {/* Enrolled Courses widget */}
              <div className="hub-metric-group">
                <span className="hub-metric-label">Learning</span>
                <div className="hub-progress-track">
                  <div 
                    className="hub-progress-fill" 
                    style={{ width: `${enrolledProgress.length > 0 ? (enrolledProgress.reduce((sum, p) => sum + p.percentage, 0) / enrolledProgress.length) : 0}%` }}
                  ></div>
                </div>
                <span className="hub-metric-sub">{enrolledProgress.length} courses in progress</span>
              </div>

              {/* Creations widget */}
              <div className="hub-metric-group" style={{ marginTop: '16px' }}>
                <span className="hub-metric-label">My Creations</span>
                <span className="hub-metric-sub" style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                  {creationsStats.count} products listed
                </span>
                <span className="hub-metric-sub">₹{creationsStats.value.toLocaleString()} total listed value</span>
              </div>
            </div>
          ) : (
            <div className="anon-hub-welcome">
              <p style={{ fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.4' }}>
                Create a Swadhara account to save your learning courses and list handmade items.
              </p>
              <Link to="/login" className="btn btn-primary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                Sign In to Start
              </Link>
            </div>
          )}
        </div>

        {/* Section 2: Compact My Marketplace showcase */}
        <div className="personal-hub-card">
          <h3 className="personal-hub-title">My Marketplace</h3>
          
          <div className="hub-marketplace-list">
            {products.slice(0, 2).map((prod) => (
              <div 
                key={`hub-prod-${prod._id}`}
                className="hub-product-row"
                onClick={() => navigate(`/products/${prod._id}`)}
              >
                <div className="hub-product-thumb-container">
                  <SafeImage src={prod.images?.[0]} alt={prod.name} category={prod.category?.slug} className="hub-product-thumb" />
                </div>
                <div className="hub-product-info">
                  <span className="hub-product-name">{prod.name}</span>
                  <span className="hub-product-price-stock">
                    ₹{prod.price} &bull; {prod.stock > 0 ? `${prod.stock} left` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link to="/marketplace" className="view-shop-link-arrow">
            View my shop &rarr;
          </Link>
        </div>
      </aside>
    </div>
  );
}
