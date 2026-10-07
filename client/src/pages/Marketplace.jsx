import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, ShoppingBag, Heart, ArrowRight, Tag, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';

export default function Marketplace() {
  const { t, tDynamic } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFilter = searchParams.get('category') || '';
  const searchFilter = searchParams.get('search') || '';
  const sortFilter = searchParams.get('sort') || 'latest';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(searchFilter);

  useEffect(() => {
    setSearchText(searchFilter);
  }, [searchFilter]);

  useEffect(() => {
    const fetchMarketplaceData = async () => {
      setLoading(true);
      try {
        const categoriesUrl = '/api/products/categories';
        
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

  // Featured Creators Showcase (Panel 6 Reference)
  const featuredCreators = [
    { name: 'Meena Sharma', skill: 'Embroidery', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' },
    { name: 'Rani Devi', skill: 'Baking', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop' },
    { name: 'Puja Patel', skill: 'Crochet', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop' },
    { name: 'Neha Singh', skill: 'Jewellery', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' }
  ];

  return (
    <div className="container section">
      {/* HERO MARKETPLACE BANNER (Panel 6 Reference) */}
      <div style={{
        backgroundColor: 'var(--bg-pink-soft)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '40px 48px',
        marginBottom: '40px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '32px',
        alignItems: 'center',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div>
          <span className="eyebrow-pill">HANDMADE MARKETPLACE</span>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>
            Handmade with heart.
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Support real women creators. Discover authentic handmade apparel, home decor, jewellery, and craft products directly from Indian makers.
          </p>
          <button 
            onClick={() => updateFilters('sort', 'latest')} 
            className="btn btn-rose btn-lg"
          >
            Explore Collection <ArrowRight size={18} />
          </button>
        </div>

        <div style={{ borderRadius: 'var(--border-radius-md)', overflow: 'hidden', height: '260px', boxShadow: 'var(--shadow-card)', border: '2px solid #FFFFFF' }}>
          <SafeImage
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
            alt="Handmade collection"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* FEATURED CREATORS ROW (Panel 6 Reference) */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Featured Creators</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {featuredCreators.map((creator) => (
            <div 
              key={creator.name} 
              className="card-editorial"
              onClick={() => navigate('/profile')}
              style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
            >
              <img src={creator.img} alt={creator.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '0.98rem', color: 'var(--primary-dark)' }}>{creator.name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{creator.skill}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH AND CATEGORY FILTER BAR */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '20px 24px',
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-subtle)',
        marginBottom: '36px'
      }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px', flexGrow: 1, maxWidth: '500px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                className="input-field"
                placeholder={t('searchPlaceholder')}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ paddingLeft: '42px', height: '44px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Search
            </button>
          </form>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>
              Sort:
            </span>
            <select
              className="form-control"
              value={sortFilter}
              onChange={(e) => updateFilters('sort', e.target.value)}
              style={{ width: '180px', height: '44px' }}
            >
              <option value="latest">{t('sortLatest')}</option>
              <option value="price-asc">{t('sortPriceAsc')}</option>
              <option value="price-desc">{t('sortPriceDesc')}</option>
            </select>

            {(categoryFilter || searchFilter) && (
              <button className="btn btn-outline btn-sm" onClick={handleClearAll}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => updateFilters('category', '')}
            className={`btn btn-sm ${!categoryFilter ? 'btn-rose' : 'btn-ghost'}`}
            style={{ borderRadius: 'var(--border-radius-pill)' }}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => updateFilters('category', cat.slug)}
              className={`btn btn-sm ${categoryFilter === cat.slug ? 'btn-rose' : 'btn-ghost'}`}
              style={{ borderRadius: 'var(--border-radius-pill)' }}
            >
              {tDynamic(cat.name)}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      {loading ? (
        <div className="grid grid-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="skeleton" style={{ height: '300px' }}></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state-box">
          <p style={{ margin: '0 0 16px 0' }}>{t('noData')}</p>
          <button className="btn btn-primary btn-sm" onClick={handleClearAll}>
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="card-editorial"
              onClick={() => navigate(`/products/${product._id}`)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <SafeImage
                  src={product.images && product.images[0]}
                  alt={product.name}
                  category={product.category?.slug}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button 
                  onClick={(e) => { e.stopPropagation(); }} 
                  style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                  <Heart size={16} style={{ color: 'var(--primary-rose-dark)' }} />
                </button>
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span className="badge-tag" style={{ width: 'fit-content', marginBottom: '8px', fontSize: '0.72rem' }}>
                  {tDynamic(product.category?.name)}
                </span>
                
                <h3 style={{ fontSize: '1.05rem', margin: '0 0 4px 0', color: 'var(--primary-dark)' }}>
                  {product.name}
                </h3>
                
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '12px', display: 'block' }}>
                  Made by {product.seller?.name || 'Swadhara Maker'}
                </span>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
                    ₹{product.price}
                  </span>

                  {product.stock > 0 ? (
                    <span className="stock-in">In Stock</span>
                  ) : (
                    <span className="stock-out">Out of Stock</span>
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
