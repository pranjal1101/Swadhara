import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

import SafeImage from '../components/SafeImage';

export default function Marketplace() {
  const { t, tDynamic } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameters from URL
  const categoryFilter = searchParams.get('category') || '';
  const searchFilter = searchParams.get('search') || '';
  const sortFilter = searchParams.get('sort') || 'latest';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(searchFilter);

  useEffect(() => {
    // Keep local search input text in sync with URL filter
    setSearchText(searchFilter);
  }, [searchFilter]);

  useEffect(() => {
    const fetchMarketplaceData = async () => {
      setLoading(true);
      try {
        const categoriesUrl = '/api/products/categories';
        
        // Construct query parameters
        const params = new URLSearchParams();
        if (categoryFilter) params.append('category', categoryFilter);
        if (searchFilter) params.append('search', searchFilter);
        if (sortFilter) params.append('sort', sortFilter);

        const productsUrl = `/api/products?${params.toString()}`;

        const [catsRes, prodsRes] = await Promise.all([
          axios.get(categoriesUrl),
          axios.get(productsUrl)
        ]);

        if (catsRes.data.success) {
          setCategories(catsRes.data.data);
        }
        if (prodsRes.data.success) {
          setProducts(prodsRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching marketplace data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplaceData();
  }, [categoryFilter, searchFilter, sortFilter]);

  const updateFilters = (key, value) => {
    const currentParams = new URLSearchParams(searchParams);
    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
    setSearchParams(currentParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters('search', searchText);
  };

  const handleClearAll = () => {
    setSearchText('');
    setSearchParams({});
  };

  return (
    <div className="container section">
      <h1 className="marketplace-page-title" style={{ marginBottom: '24px' }}>
        {t('navMarketplace')}
      </h1>

      {/* Filter and Search Controls Row */}
      <div className="marketplace-controls-panel">
        <form onSubmit={handleSearchSubmit} className="search-form-group">
          <input
            type="text"
            className="form-control search-input"
            placeholder={t('searchPlaceholder')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm search-btn">
            Search
          </button>
        </form>

        <div className="filters-dropdowns-group">
          {/* Category Dropdown */}
          <div className="dropdown-wrapper">
            <select
              className="form-control filter-select"
              value={categoryFilter}
              onChange={(e) => updateFilters('category', e.target.value)}
              aria-label={t('category')}
            >
              <option value="">{t('allCategories')}</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {tDynamic(cat.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="dropdown-wrapper">
            <select
              className="form-control filter-select"
              value={sortFilter}
              onChange={(e) => updateFilters('sort', e.target.value)}
              aria-label={t('sortBy')}
            >
              <option value="latest">{t('sortLatest')}</option>
              <option value="price-asc">{t('sortPriceAsc')}</option>
              <option value="price-desc">{t('sortPriceDesc')}</option>
            </select>
          </div>

          {(categoryFilter || searchFilter) && (
            <button className="btn btn-outline btn-sm clear-filters-btn" onClick={handleClearAll}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="card skeleton-card" style={{ height: '320px' }}>
              <div className="skeleton" style={{ height: '180px', width: '100%' }}></div>
              <div className="card-body">
                <div className="skeleton" style={{ height: '20px', width: '75%', marginBottom: '12px' }}></div>
                <div className="skeleton" style={{ height: '16px', width: '40%' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state-box" style={{ padding: '64px 24px' }}>
          <p style={{ marginBottom: '16px' }}>{t('noData')}</p>
          <button className="btn btn-primary btn-sm" onClick={handleClearAll}>
            View All Products
          </button>
        </div>
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
                <SafeImage
                  src={product.images && product.images[0]}
                  alt={product.name}
                  category={product.category?.slug}
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
  );
}
