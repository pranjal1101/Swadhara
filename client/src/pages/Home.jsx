import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t, tDynamic } = useLanguage();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and products in parallel
        const [catsRes, prodsRes] = await Promise.all([
          axios.get('/api/products/categories'),
          axios.get('/api/products')
        ]);
        
        if (catsRes.data.success) {
          setCategories(catsRes.data.data);
        }
        if (prodsRes.data.success) {
          // Display up to 4 items on the homepage
          setProducts(prodsRes.data.data.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-wrapper">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{t('heroTitle')}</h1>
            <p className="hero-subtitle">{t('heroSubtitle')}</p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary">
                {t('ctaStartLearning')}
              </Link>
              <Link to="/marketplace" className="btn btn-secondary">
                {t('ctaExploreMarketplace')}
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1524295981997-ec4f4e30424d?q=80&w=700&auto=format&fit=crop" 
              alt="Artisan sewing close up"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* 2. Learn -> Make -> Earn Editorial Section */}
      <section className="three-steps-section">
        <div className="container">
          <h2 className="section-title text-center">{t('sectionThreeStepsTitle')}</h2>
          <div className="steps-flow-grid">
            <div className="step-card">
              <span className="step-number">01</span>
              <h3 className="step-title">{t('navLearn')}</h3>
              <p className="step-desc">{t('stepLearnText')}</p>
            </div>
            <div className="step-card">
              <span className="step-number">02</span>
              <h3 className="step-title">{t('stepMakeTitle')}</h3>
              <p className="step-desc">{t('stepMakeText')}</p>
            </div>
            <div className="step-card">
              <span className="step-number">03</span>
              <h3 className="step-title">{t('stepEarnTitle')}</h3>
              <p className="step-desc">{t('stepEarnText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Skill Categories Directories */}
      <section className="home-categories-section">
        <div className="container">
          <h2 className="section-title">{t('sectionCategoriesTitle')}</h2>
          <div className="categories-flex-grid">
            {categories.map((cat) => (
              <div 
                key={cat._id} 
                className="category-visual-card"
                onClick={() => navigate(`/courses?category=${cat.slug}`)}
              >
                <div className="category-img-container">
                  <img src={cat.image} alt={tDynamic(cat.name)} className="category-img" />
                </div>
                <div className="category-label-banner">
                  <span className="category-name-label">{tDynamic(cat.name)}</span>
                  <svg className="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curated Marketplace Section */}
      <section className="home-marketplace-section">
        <div className="container">
          <div className="section-header-flex">
            <h2>{t('sectionMarketplaceTitle')}</h2>
            <Link to="/marketplace" className="view-all-link">
              {t('ctaExploreMarketplace')} &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-4">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="card skeleton-card" style={{ height: '320px' }}>
                  <div className="skeleton" style={{ height: '180px', width: '100%' }}></div>
                  <div className="card-body">
                    <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '12px' }}></div>
                    <div className="skeleton" style={{ height: '16px', width: '40%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="empty-showcase">{t('noData')}</div>
          ) : (
            <div className="grid grid-4">
              {products.map((product) => (
                <div 
                  key={product._id} 
                  className="card product-card-hover"
                  onClick={() => navigate(`/products/${product._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-card-img-wrapper">
                    <img 
                      src={product.images && product.images[0]} 
                      alt={product.name} 
                      className="product-card-img"
                    />
                  </div>
                  <div className="card-body">
                    <span className="badge" style={{ marginBottom: '8px', fontSize: '0.65rem' }}>
                      {tDynamic(product.category?.name)}
                    </span>
                    <h3 className="product-card-title" style={{ fontSize: '1.05rem', marginBottom: '4px' }}>
                      {product.name}
                    </h3>
                    <p className="product-card-seller" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>
                      {t('seller')}: {product.seller?.name}
                    </p>
                    <div className="product-card-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="product-card-price" style={{ fontWeight: '600', color: 'var(--primary)' }}>
                        ₹{product.price}
                      </span>
                      {product.stock > 0 ? (
                        <span className="stock-indicator green-dot">{t('stock')}</span>
                      ) : (
                        <span className="stock-indicator red-dot">{t('outOfStock')}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Understated CTA */}
      <section className="final-cta-section">
        <div className="container text-center">
          <h2>{t('sectionCTATitle')}</h2>
          <p style={{ maxWidth: '500px', margin: '0 auto 24px' }}>{t('sectionCTASubtitle')}</p>
          <Link to="/register" className="btn btn-primary">
            {t('navRegister')}
          </Link>
        </div>
      </section>
    </div>
  );
}
