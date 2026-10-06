import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from '../components/SafeImage';
import AiTutorWidget from '../components/AiTutorWidget';

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
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/courses/${id}`);
        if (response.data && response.data.success) {
          const courseData = response.data.data.course || response.data.data;
          const lessonsData = response.data.data.lessons || [];
          setCourse(courseData);
          setLessons(lessonsData);
        } else {
          setError('Course not found');
        }

        // Fetch user progress separately so auth/progress errors do not break course page rendering
        if (user) {
          try {
            const progressRes = await axios.get(`/api/courses/${id}/progress`);
            if (progressRes.data && progressRes.data.success) {
              setProgress(progressRes.data.data);
            }
          } catch (progressErr) {
            console.warn('Could not load user progress for course:', progressErr?.message);
          }
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError(err.response?.data?.message || 'Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id, user]);

  const handleStartContinue = () => {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${id}` } });
      return;
    }

    if (lessons.length === 0) return;

    let targetLessonId = lessons[0]._id;
    if (progress && progress.completedLessons && progress.completedLessons.length > 0) {
      const incompleteLesson = lessons.find(
        (lesson) => !progress.completedLessons.includes(lesson._id)
      );
      if (incompleteLesson) {
        targetLessonId = incompleteLesson._id;
      } else {
        targetLessonId = lessons[0]._id;
      }
    }

    navigate(`/courses/${id}/lesson/${targetLessonId}`);
  };

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '320px', width: '100%', marginBottom: '24px', borderRadius: '16px' }}></div>
        <div className="skeleton" style={{ height: '28px', width: '50%', marginBottom: '12px' }}></div>
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

  const difficulty = course.difficulty || course.level || 'Easy';

  return (
    <div className="container section">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb-nav" style={{ marginBottom: '24px' }}>
        <Link to="/courses" style={{ textDecoration: 'underline', color: 'var(--text-muted)' }}>
          {t('navLearn')}
        </Link>
        <span style={{ margin: '0 8px', color: 'var(--text-light)' }}>/</span>
        <span style={{ color: 'var(--text-muted)' }}>{tDynamic(course.category?.name)}</span>
        <span style={{ margin: '0 8px', color: 'var(--text-light)' }}>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{tDynamic(course.title)}</span>
      </div>

      <div className="course-detail-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
        {/* Main Content Area */}
        <div className="course-main-info">
          <div className="course-banner-img-wrapper" style={{ borderRadius: '16px', overflow: 'hidden', height: '320px', marginBottom: '24px' }}>
            <SafeImage
              src={course.thumbnail}
              alt={tDynamic(course.title)}
              category={course.category?.slug}
              className="course-banner-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span className="badge" style={{ backgroundColor: 'var(--card-pink)', color: 'var(--primary-dark)', fontSize: '0.85rem', padding: '6px 12px', borderRadius: '8px' }}>
              {tDynamic(course.category?.name)}
            </span>
            <span style={{
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              backgroundColor: difficulty === 'Easy' ? '#e6f4ea' : difficulty === 'Medium' ? '#fef7e0' : '#fce8e6',
              color: difficulty === 'Easy' ? '#137333' : difficulty === 'Medium' ? '#b06000' : '#c5221f',
              border: `1px solid ${difficulty === 'Easy' ? '#ceead6' : difficulty === 'Medium' ? '#fde293' : '#fad2cf'}`
            }}>
              {difficulty}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: '600' }}>
              &bull; {course.duration}
            </span>
          </div>

          <h1 className="course-detail-title" style={{ fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '16px', lineHeight: '1.3' }}>
            {tDynamic(course.title)}
          </h1>
          
          <p className="course-detail-desc" style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '32px' }}>
            {tDynamic(course.description)}
          </p>

          {/* What You'll Learn Section */}
          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <div style={{
              backgroundColor: 'var(--card-pink)',
              padding: '24px',
              borderRadius: '16px',
              marginBottom: '32px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '16px', fontWeight: '700' }}>
                {t('whatYouWillLearn')}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: '#4a773c', fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                      {tDynamic(outcome)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Materials & Tools Section */}
          {course.materials && course.materials.length > 0 && (
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '16px',
              marginBottom: '32px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '16px', fontWeight: '700' }}>
                {t('requiredMaterials')}
              </h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0 }}>
                {course.materials.map((mat, idx) => (
                  <li key={idx} style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                    {tDynamic(mat)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Syllabus Listing */}
          <div className="syllabus-section">
            <h2 className="syllabus-title" style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '20px', fontWeight: '700' }}>
              {t('courseDetails')} ({lessons.length} {t('courseLessons')})
            </h2>
            
            {lessons.length === 0 ? (
              <p>{t('noData')}</p>
            ) : (
              <div className="lessons-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {lessons.map((lesson, idx) => {
                  const isCompleted = progress?.completedLessons?.includes(lesson._id);
                  return (
                    <div 
                      key={lesson._id} 
                      className={`lesson-list-item ${isCompleted ? 'completed' : ''}`}
                      onClick={() => user ? navigate(`/courses/${id}/lesson/${lesson._id}`) : navigate('/login')}
                      style={{
                        padding: '16px 20px',
                        backgroundColor: isCompleted ? '#f4fbf4' : '#fff',
                        borderRadius: '12px',
                        border: `1px solid ${isCompleted ? '#ceead6' : 'var(--border-color)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease, transform 0.1s ease'
                      }}
                    >
                      <div className="lesson-status-icon-wrapper" style={{ flexShrink: 0 }}>
                        {isCompleted ? (
                          <svg className="check-icon-circle" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" className="circle-bg" fill="#4a773c" />
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#ffffff" />
                          </svg>
                        ) : (
                          <span className="lesson-index-circle" style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--card-pink)',
                            color: 'var(--primary-dark)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.85rem'
                          }}>
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      <div className="lesson-item-details" style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <h4 className="lesson-item-title" style={{ fontSize: '1rem', color: 'var(--primary-dark)', margin: 0, fontWeight: '600' }}>
                            {tDynamic(lesson.title)}
                          </h4>
                          <span style={{ fontSize: '0.7rem', fontWeight: '600', backgroundColor: '#eee9e0', color: 'var(--primary-dark)', padding: '2px 8px', borderRadius: '12px' }}>
                            Video Coming Soon
                          </span>
                        </div>
                        <p className="lesson-item-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                          {tDynamic(lesson.description)}
                        </p>
                      </div>
                      <span className="lesson-item-duration" style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: '600', flexShrink: 0 }}>
                        ▶ {lesson.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI Course Tutor / Doubt Solver Widget */}
          <AiTutorWidget courseId={id} courseTitle={tDynamic(course.title)} />
        </div>

        {/* Sidebar Status & Action Card */}
        <div className="course-sidebar">
          <div className="sidebar-card" style={{
            position: 'sticky',
            top: '100px',
            backgroundColor: '#fff',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 20px rgba(96, 71, 52, 0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="badge" style={{ backgroundColor: 'var(--card-pink)', color: 'var(--primary-dark)' }}>
                {tDynamic(course.category?.name)}
              </span>
              <span className="badge" style={{ backgroundColor: '#f0f4f8', color: 'var(--text-main)' }}>
                {difficulty}
              </span>
            </div>

            <div className="sidebar-meta-list" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div className="sidebar-meta-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="meta-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('courseInstructor')}:</span>
                <span className="meta-value" style={{ fontWeight: '700', color: 'var(--primary-dark)', fontSize: '0.9rem' }}>Swadhara Official</span>
              </div>
              <div className="sidebar-meta-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="meta-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('courseDuration')}:</span>
                <span className="meta-value" style={{ fontWeight: '600', fontSize: '0.9rem' }}>{course.duration}</span>
              </div>
              <div className="sidebar-meta-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="meta-label" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('courseLessons')}:</span>
                <span className="meta-value" style={{ fontWeight: '600', fontSize: '0.9rem' }}>{lessons.length} video lessons</span>
              </div>
            </div>

            {user ? (
              <div className="user-course-progress-block">
                <div className="progress-label-flex" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>
                  <span>{t('courseProgressBar')}</span>
                  <span className="progress-percent-text">{progress?.percentage || 0}%</span>
                </div>
                <div className="progress-track-bar" style={{ height: '8px', backgroundColor: '#eef2f5', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress?.percentage || 0}%`, height: '100%', backgroundColor: '#4a773c', transition: 'width 0.3s ease' }}
                  ></div>
                </div>
                <button onClick={handleStartContinue} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                  {progress && progress.percentage > 0 ? t('continueLearning') : t('startCourse')}
                </button>
              </div>
            ) : (
              <div className="anon-join-block">
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', textAlign: 'center' }}>
                  Log in or register to join this course and save your lesson progress.
                </p>
                <button onClick={handleStartContinue} className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
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
