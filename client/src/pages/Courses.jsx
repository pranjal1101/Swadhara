import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

import SafeImage from '../components/SafeImage';

export default function Courses() {
  const { t, tDynamic } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get('category') || '';

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories and filtered courses
        const categoriesUrl = '/api/products/categories';
        const coursesUrl = categorySlug 
          ? `/api/courses?category=${categorySlug}` 
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
  }, [categorySlug]);

  const handleCategorySelect = (slug) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="container section">
      <h1 className="courses-page-title" style={{ marginBottom: '24px' }}>
        {t('navLearn')}
      </h1>

      {/* Category Filter Bar */}
      <div className="category-filters-container">
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

      {loading ? (
        <div className="grid grid-3">
          {[1, 2, 3].map(n => (
            <div key={n} className="card skeleton-card" style={{ height: '360px' }}>
              <div className="skeleton" style={{ height: '200px', width: '100%' }}></div>
              <div className="card-body">
                <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '12px' }}></div>
                <div className="skeleton" style={{ height: '16px', width: '40%' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="empty-state-box">
          <p>{t('noData')}</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="card course-card-interactive"
              onClick={() => navigate(`/courses/${course._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="course-thumbnail-wrapper">
                <SafeImage
                  src={course.thumbnail}
                  alt={tDynamic(course.title)}
                  category={course.category?.slug}
                  className="course-thumbnail-img"
                />
              </div>
              <div className="card-body">
                <span className="badge" style={{ marginBottom: '8px' }}>
                  {tDynamic(course.category?.name)}
                </span>
                <h3 className="course-card-title">{tDynamic(course.title)}</h3>
                <p className="course-card-desc" style={{ fontSize: '0.9rem', flexGrow: 1 }}>
                  {tDynamic(course.description)}
                </p>
                <div className="course-meta-footer">
                  <div className="meta-item">
                    <span className="meta-label">{t('courseLevel')}:</span>
                    <span className="meta-value">{course.level}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">{t('courseDuration')}:</span>
                    <span className="meta-value">{course.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
