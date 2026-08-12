import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

import SafeImage from '../components/SafeImage';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, tDynamic } = useLanguage();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        if (response.data.success) {
          setCourse(response.data.data.course);
          setLessons(response.data.data.lessons);
        }

        // If user is logged in, fetch their progress for this course
        if (user) {
          const progressRes = await axios.get(`/api/courses/${id}/progress`);
          if (progressRes.data.success) {
            setProgress(progressRes.data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, user]);

  const handleStartContinue = () => {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${id}` } });
      return;
    }

    if (lessons.length === 0) return;

    // Find the first incomplete lesson, or default to the first lesson
    let targetLessonId = lessons[0]._id;
    if (progress && progress.completedLessons && progress.completedLessons.length > 0) {
      const incompleteLesson = lessons.find(
        (lesson) => !progress.completedLessons.includes(lesson._id)
      );
      if (incompleteLesson) {
        targetLessonId = incompleteLesson._id;
      } else {
        // All completed, go to first
        targetLessonId = lessons[0]._id;
      }
    }

    navigate(`/courses/${id}/lesson/${targetLessonId}`);
  };

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '300px', width: '100%', marginBottom: '24px' }}></div>
        <div className="skeleton" style={{ height: '24px', width: '50%', marginBottom: '12px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '80%', marginBottom: '32px' }}></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container section text-center">
        <div className="alert alert-danger">{error || 'Course not found'}</div>
        <Link to="/courses" className="btn btn-outline" style={{ marginTop: '16px' }}>
          &larr; Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb-nav" style={{ marginBottom: '24px' }}>
        <Link to="/courses" style={{ textDecoration: 'underline', color: 'var(--text-muted)' }}>
          {t('navLearn')}
        </Link>
        <span style={{ margin: '0 8px', color: 'var(--text-light)' }}>/</span>
        <span style={{ color: 'var(--text-main)' }}>{tDynamic(course.title)}</span>
      </div>

      <div className="course-detail-layout">
        {/* Course Info */}
        <div className="course-main-info">
          <div className="course-banner-img-wrapper">
            <SafeImage src={course.thumbnail} alt={tDynamic(course.title)} category={course.category?.slug} className="course-banner-img" />
          </div>

          <h1 className="course-detail-title">{tDynamic(course.title)}</h1>
          <p className="course-detail-desc">{tDynamic(course.description)}</p>

          {/* Syllabus Listing */}
          <div className="syllabus-section" style={{ marginTop: '40px' }}>
            <h2 className="syllabus-title">{t('courseDetails')}</h2>
            
            {lessons.length === 0 ? (
              <p>{t('noData')}</p>
            ) : (
              <div className="lessons-list">
                {lessons.map((lesson, idx) => {
                  const isCompleted = progress?.completedLessons?.includes(lesson._id);
                  return (
                    <div 
                      key={lesson._id} 
                      className={`lesson-list-item ${isCompleted ? 'completed' : ''}`}
                      onClick={() => user ? navigate(`/courses/${id}/lesson/${lesson._id}`) : navigate('/login')}
                    >
                      <div className="lesson-status-icon-wrapper">
                        {isCompleted ? (
                          <svg className="check-icon-circle" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" className="circle-bg" fill="#4a773c" />
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#ffffff" />
                          </svg>
                        ) : (
                          <span className="lesson-index-circle">{idx + 1}</span>
                        )}
                      </div>
                      <div className="lesson-item-details">
                        <h3 className="lesson-item-title">{tDynamic(lesson.title)}</h3>
                        <p className="lesson-item-desc">{tDynamic(lesson.description)}</p>
                        <span className="lesson-item-duration">{lesson.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Status/CTA Card */}
        <div className="course-sidebar">
          <div className="sidebar-card">
            <span className="badge" style={{ marginBottom: '12px' }}>
              {tDynamic(course.category?.name)}
            </span>
            <div className="sidebar-meta-list">
              <div className="sidebar-meta-row">
                <span className="meta-label">{t('courseInstructor')}:</span>
                <span className="meta-value">{course.instructor}</span>
              </div>
              <div className="sidebar-meta-row">
                <span className="meta-label">{t('courseLevel')}:</span>
                <span className="meta-value">{course.level}</span>
              </div>
              <div className="sidebar-meta-row">
                <span className="meta-label">{t('courseDuration')}:</span>
                <span className="meta-value">{course.duration}</span>
              </div>
            </div>

            {user ? (
              <div className="user-course-progress-block">
                <div className="progress-label-flex">
                  <span>{t('courseProgressBar')}</span>
                  <span className="progress-percent-text">{progress?.percentage || 0}%</span>
                </div>
                <div className="progress-track-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress?.percentage || 0}%` }}
                  ></div>
                </div>
                <button onClick={handleStartContinue} className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                  {progress && progress.percentage > 0 ? t('continueLearning') : t('startCourse')}
                </button>
              </div>
            ) : (
              <div className="anon-join-block">
                <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
                  Please login or register to enroll and track your lesson progress.
                </p>
                <button onClick={handleStartContinue} className="btn btn-primary" style={{ width: '100%' }}>
                  {t('navLogin')} to Start
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
