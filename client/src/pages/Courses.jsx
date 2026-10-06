import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';
import CourseRecommenderModal from '../components/CourseRecommenderModal';

export default function Courses() {
  const { t, tDynamic } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categorySlug = searchParams.get('category') || '';
  const difficultyFilter = searchParams.get('difficulty') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesUrl = '/api/products/categories';
        
        let queryParts = [];
        if (categorySlug) queryParts.push(`category=${encodeURIComponent(categorySlug)}`);
        if (difficultyFilter && difficultyFilter !== 'All') queryParts.push(`difficulty=${encodeURIComponent(difficultyFilter)}`);
        if (searchQuery) queryParts.push(`search=${encodeURIComponent(searchQuery)}`);

        const coursesUrl = queryParts.length > 0 
          ? `/api/courses?${queryParts.join('&')}` 
          : '/api/courses';

        const [catsRes, coursesRes] = await Promise.all([
          axios.get(categoriesUrl),
          axios.get(coursesUrl)
        ]);

        if (catsRes.data.success) {
          setCategories(catsRes.data.data);
        }
        if (coursesRes.data.success) {
          setCourses(coursesRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching courses page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, difficultyFilter, searchQuery]);

  const updateFilters = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        updated.set(key, newParams[key]);
      } else {
        updated.delete(key);
      }
    });
    setSearchParams(updated);
  };

  const handleCategorySelect = (slug) => {
    updateFilters({ category: slug });
  };

  const handleDifficultySelect = (diff) => {
    updateFilters({ difficulty: diff === 'All' ? '' : diff });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ search: searchInput });
  };

  const getDifficultyBadgeClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'badge-easy';
      case 'medium':
        return 'badge-medium';
      case 'hard':
        return 'badge-hard';
      default:
        return 'badge-easy';
    }
  };

  return (
    <div className="container section">
      {/* AI Course Recommender Modal */}
      <CourseRecommenderModal
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
      />

      <div className="courses-header-wrapper" style={{ marginBottom: '32px' }}>
        <h1 className="courses-page-title" style={{ marginBottom: '8px' }}>
          {t('navLearn')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px' }}>
          Explore 30 official Swadhara skill courses designed to help women learn practical crafts, tailoring, baking, and earning opportunities.
        </p>
      </div>

      {/* AI Course Recommender Promo Banner */}
      <div style={{
        backgroundColor: 'var(--card-pink)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ backgroundColor: 'var(--primary-dark)', color: '#fff', fontSize: '0.75rem', fontWeight: '700', padding: '2px 10px', borderRadius: '12px' }}>
              SWADHARA AI ✨
            </span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary-dark)', fontWeight: '700' }}>
              Not sure what to learn?
            </h3>
          </div>
          <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.95rem' }}>
            Let Swadhara AI help you find the right course based on your interests, goals, and available time.
          </p>
        </div>
        <button
          onClick={() => setIsRecommenderOpen(true)}
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontWeight: '700', flexShrink: 0 }}
        >
          Find My Course ✨
        </button>
      </div>

      {/* Search & Filter Control Panel */}
      <div className="courses-filter-panel" style={{
        backgroundColor: '#fff',
        padding: '20px 24px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 16px rgba(96, 71, 52, 0.05)',
        marginBottom: '32px'
      }}>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <input
            type="text"
            className="input-field"
            placeholder={t('searchCoursesPlaceholder')}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ flexGrow: 1, height: '46px' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSearchInput('');
                updateFilters({ search: '' });
              }}
            >
              Clear
            </button>
          )}
        </form>

        {/* Category Filters */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {t('category')}
          </label>
          <div className="category-filters-container" style={{ flexWrap: 'wrap', gap: '8px', margin: 0 }}>
            <button
              className={`filter-chip ${!categorySlug ? 'active' : ''}`}
              onClick={() => handleCategorySelect('')}
            >
              {t('allCategories')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                className={`filter-chip ${categorySlug === cat.slug ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat.slug)}
              >
                {tDynamic(cat.name)}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filters */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {t('courseDifficulty')}
          </label>
          <div className="category-filters-container" style={{ flexWrap: 'wrap', gap: '8px', margin: 0 }}>
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                className={`filter-chip ${difficultyFilter === diff || (diff === 'All' && !searchParams.get('difficulty')) ? 'active' : ''}`}
                onClick={() => handleDifficultySelect(diff)}
              >
                {diff === 'All' ? t('difficultyAll') : t(`difficulty${diff}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid / Loading / Empty */}
      {loading ? (
        <div className="grid grid-3">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="card skeleton-card" style={{ height: '380px' }}>
              <div className="skeleton" style={{ height: '200px', width: '100%' }}></div>
              <div className="card-body">
                <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '12px' }}></div>
                <div className="skeleton" style={{ height: '16px', width: '40%' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="empty-state-box" style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 style={{ marginBottom: '8px', color: 'var(--primary-dark)' }}>{t('emptyCourses')}</h3>
          <button
            onClick={() => setSearchParams({})}
            className="btn btn-outline"
            style={{ marginTop: '16px' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-3">
          {courses.map((course) => {
            const difficulty = course.difficulty || course.level || 'Easy';
            return (
              <div
                key={course._id}
                className="card course-card-interactive"
                onClick={() => navigate(`/courses/${course._id}`)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#fff'
                }}
              >
                <div className="course-thumbnail-wrapper" style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <SafeImage
                    src={course.thumbnail}
                    alt={tDynamic(course.title)}
                    category={course.category?.slug}
                    className="course-thumbnail-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    className={`difficulty-badge ${getDifficultyBadgeClass(difficulty)}`}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      letterSpacing: '0.3px',
                      textTransform: 'uppercase',
                      backgroundColor: difficulty === 'Easy' ? '#e6f4ea' : difficulty === 'Medium' ? '#fef7e0' : '#fce8e6',
                      color: difficulty === 'Easy' ? '#137333' : difficulty === 'Medium' ? '#b06000' : '#c5221f',
                      border: `1px solid ${difficulty === 'Easy' ? '#ceead6' : difficulty === 'Medium' ? '#fde293' : '#fad2cf'}`
                    }}
                  >
                    {difficulty}
                  </span>
                </div>

                <div className="card-body" style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span className="badge" style={{ backgroundColor: 'var(--card-pink)', color: 'var(--primary-dark)', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px' }}>
                      {tDynamic(course.category?.name)}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: '600' }}>
                      &bull; {course.duration}
                    </span>
                  </div>

                  <h3 className="course-card-title" style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '8px', lineHeight: '1.4', fontWeight: '700' }}>
                    {tDynamic(course.title)}
                  </h3>

                  <p className="course-card-desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flexGrow: 1, marginBottom: '20px', lineHeight: '1.5' }}>
                    {tDynamic(course.description)}
                  </p>

                  <div className="course-meta-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      {t('providedBySwadhara')}
                    </span>

                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-rose)' }}>
                      Start Course &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
