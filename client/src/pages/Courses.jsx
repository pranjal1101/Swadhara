import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Sparkles, BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';
import heroImg from '../assets/hero.png';
import embroideryImg from '../assets/embroidery.png';
import tailoringImg from '../assets/tailoring.jpg';
import bakingImg from '../assets/baking.jpg';
import jewelleryImg from '../assets/jewellery.jpg';
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

  const skillVisualCategories = [
    { title: 'Tailoring', slug: 'tailoring', image: tailoringImg },
    { title: 'Embroidery', slug: 'embroidery', image: embroideryImg },
    { title: 'Baking', slug: 'baking', image: bakingImg },
    { title: 'Jewellery', slug: 'jewellery', image: jewelleryImg },
    { title: 'Handicrafts', slug: 'handicrafts', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop' },
    { title: 'Painting', slug: 'painting', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=400&auto=format&fit=crop' }
  ];

  return (
    <div className="container section">
      {/* AI Course Recommender Modal */}
      <CourseRecommenderModal
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
      />

      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '6px' }}>Explore Skills</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>
          Find the right skill for your goals. Learn step-by-step from official Swadhara practical courses.
        </p>
      </div>

      {/* AI Course Recommender Promo Banner */}
      <div style={{
        backgroundColor: 'var(--bg-pink-soft)',
        border: '1px solid var(--border-rose)',
        borderRadius: 'var(--border-radius-md)',
        padding: '24px 28px',
        marginBottom: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--primary-dark)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: 'var(--primary-dark)' }}>
              Not sure what to learn?
            </h3>
            <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.95rem' }}>
              Let Swadhara AI help you find the right course based on your interests and available time.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsRecommenderOpen(true)}
          className="btn btn-rose"
          style={{ flexShrink: 0 }}
        >
          Find My Course <ArrowRight size={16} />
        </button>
      </div>

      {/* Visual Category Grid (Panel 2 Reference) */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Browse Categories</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
          {skillVisualCategories.map((cat) => (
            <div
              key={cat.slug}
              className={`card-editorial ${categorySlug === cat.slug ? 'active-cat-card' : ''}`}
              onClick={() => handleCategorySelect(categorySlug === cat.slug ? '' : cat.slug)}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '10px',
                border: categorySlug === cat.slug ? '2px solid var(--primary-rose-dark)' : '1px solid var(--border-subtle)',
                backgroundColor: categorySlug === cat.slug ? 'var(--bg-pink-soft)' : '#FFFFFF'
              }}
            >
              <div style={{ height: '90px', borderRadius: 'var(--border-radius-sm)', overflow: 'hidden', marginBottom: '8px' }}>
                <SafeImage src={cat.image} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary-dark)', display: 'block' }}>
                {cat.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '20px 24px',
        borderRadius: 'var(--border-radius-md)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-subtle)',
        marginBottom: '36px'
      }}>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input
              type="text"
              className="input-field"
              placeholder={t('searchCoursesPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ paddingLeft: '42px', height: '46px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
            Search
          </button>
          {(searchQuery || categorySlug || difficultyFilter !== 'All') && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSearchInput('');
                setSearchParams({});
              }}
            >
              Clear
            </button>
          )}
        </form>

        {/* Difficulty Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>
            Difficulty:
          </span>
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => handleDifficultySelect(diff)}
              className={`btn btn-sm ${difficultyFilter === diff || (diff === 'All' && !searchParams.get('difficulty')) ? 'btn-rose' : 'btn-ghost'}`}
              style={{ borderRadius: 'var(--border-radius-pill)' }}
            >
              {diff === 'All' ? 'All Difficulties' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="grid grid-3">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="skeleton" style={{ height: '340px' }}></div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="empty-state-box">
          <h3>No courses match your criteria</h3>
          <p>Try resetting filters or searching with a different keyword.</p>
          <button onClick={() => setSearchParams({})} className="btn btn-outline" style={{ marginTop: '12px' }}>
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
                className="card-editorial"
                onClick={() => navigate(`/courses/${course._id}`)}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <SafeImage
                    src={course.thumbnail}
                    alt={tDynamic(course.title)}
                    category={course.category?.slug}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    className={`badge-tag ${difficulty === 'Easy' ? 'badge-easy' : difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}
                    style={{ position: 'absolute', top: '12px', right: '12px' }}
                  >
                    {difficulty}
                  </span>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span className="badge-tag">
                      <BookOpen size={12} /> {tDynamic(course.category?.name)}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {course.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>
                    {tDynamic(course.title)}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', flexGrow: 1, marginBottom: '20px', lineHeight: '1.5' }}>
                    {tDynamic(course.description)}
                  </p>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600' }}>
                      Official Swadhara Course
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-rose-dark)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      Start Course <ArrowRight size={14} />
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
