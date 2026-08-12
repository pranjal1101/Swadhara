import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

// Helper to extract the 11-character YouTube video ID
const getYouTubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

export default function Lesson() {
  const { id: courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { t, tDynamic } = useLanguage();

  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [lessonsList, setLessonsList] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [markingDone, setMarkingDone] = useState(false);

  useEffect(() => {
    const fetchLessonAndCourseData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch course structure (contains lessons)
        const courseRes = await axios.get(`/api/courses/${courseId}`);
        if (courseRes.data.success) {
          setCourse(courseRes.data.data.course);
          setLessonsList(courseRes.data.data.lessons);
        }

        // Fetch current lesson detail
        const lessonRes = await axios.get(`/api/courses/${courseId}/lessons/${lessonId}`);
        if (lessonRes.data.success) {
          setLesson(lessonRes.data.data);
        }

        // Fetch user progress for this course
        const progressRes = await axios.get(`/api/courses/${courseId}/progress`);
        if (progressRes.data.success) {
          setProgress(progressRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching lesson data:', err);
        setError('Failed to load the lesson details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonAndCourseData();
  }, [courseId, lessonId]);

  // Determine current lesson index, previous lesson, and next lesson
  const currentIdx = lessonsList.findIndex((l) => l._id === lessonId);
  const prevLesson = currentIdx > 0 ? lessonsList[currentIdx - 1] : null;
  const nextLesson = currentIdx >= 0 && currentIdx < lessonsList.length - 1 ? lessonsList[currentIdx + 1] : null;

  const handleMarkComplete = async () => {
    if (markingDone) return;
    setMarkingDone(true);
    try {
      const response = await axios.post(`/api/courses/${courseId}/lessons/${lessonId}/complete`);
      if (response.data.success) {
        setProgress(response.data.data);
        
        // Trigger event to notify Navbar of potential progress shifts
        window.dispatchEvent(new Event('cart-updated'));
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    } finally {
      setMarkingDone(false);
    }
  };

  const videoId = lesson ? getYouTubeId(lesson.videoUrl) : '';
  const isCompleted = progress?.completedLessons?.includes(lessonId);

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '400px', width: '100%', marginBottom: '24px' }}></div>
        <div className="skeleton" style={{ height: '24px', width: '60%', marginBottom: '12px' }}></div>
      </div>
    );
  }

  if (error || !lesson || !course) {
    return (
      <div className="container section text-center">
        <div className="alert alert-danger">{error || 'Lesson not found'}</div>
        <Link to={`/courses/${courseId}`} className="btn btn-outline" style={{ marginTop: '16px' }}>
          &larr; Back to Course Overview
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      {/* Upper Navigation Row */}
      <div className="lesson-header-row">
        <Link to={`/courses/${courseId}`} className="back-course-btn">
          &larr; {tDynamic(course.title)}
        </Link>
        <div className="lesson-top-progress">
          <span className="progress-text">{t('courseProgressBar')}: {progress?.percentage || 0}%</span>
          <div className="progress-track-bar" style={{ width: '100px', height: '6px', margin: '0' }}>
            <div className="progress-fill" style={{ width: `${progress?.percentage || 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* Video Iframe Embed */}
      <div className="lesson-player-container">
        {videoId ? (
          <>
            <div className="iframe-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title={tDynamic(lesson.title)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ marginTop: '12px', textAlign: 'right' }}>
              <a 
                href={lesson.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ fontSize: '0.85rem', color: 'var(--accent-rose)', textDecoration: 'underline', fontWeight: '600' }}
              >
                Watch directly on YouTube &rarr;
              </a>
            </div>
          </>
        ) : (
          <div className="no-video-error" style={{ padding: '48px 24px', backgroundColor: 'var(--card-pink)', borderRadius: '16px', textAlign: 'center', margin: '16px 0', border: '1px solid var(--border-color)' }}>
            <p style={{ fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px' }}>Embedded video player could not load.</p>
            <a 
              href={lesson.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              Watch Tutorial on YouTube &rarr;
            </a>
          </div>
        )}
      </div>

      {/* Controls Row */}
      <div className="lesson-controls-panel">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/courses/${courseId}/lesson/${prevLesson._id}`)}
          disabled={!prevLesson}
        >
          &larr; {t('back')}
        </button>

        <button
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} complete-action-btn`}
          onClick={handleMarkComplete}
          disabled={markingDone}
        >
          {isCompleted ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t('lessonCompleted')}
            </span>
          ) : (
            t('lessonMarkComplete')
          )}
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/courses/${courseId}/lesson/${nextLesson._id}`)}
          disabled={!nextLesson}
        >
          {t('next')} &rarr;
        </button>
      </div>

      {/* Lesson Description */}
      <div className="lesson-info-content">
        <span className="lesson-meta-badge">
          {t('courseLessons')} {currentIdx + 1} / {lessonsList.length} &bull; {lesson.duration}
        </span>
        <h1 className="lesson-title-heading">{tDynamic(lesson.title)}</h1>
        <p className="lesson-description-text">{tDynamic(lesson.description)}</p>
      </div>
    </div>
  );
}
