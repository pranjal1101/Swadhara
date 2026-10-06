import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import AiTutorWidget from '../components/AiTutorWidget';

const getYouTubeId = (url) => {
  if (!url) return '';
  if (url.length === 11) return url;
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
  const [iframeFailed, setIframeFailed] = useState(false);

  useEffect(() => {
    const fetchLessonAndCourseData = async () => {
      setLoading(true);
      setError('');
      setIframeFailed(false);
      try {
        const courseRes = await axios.get(`/api/courses/${courseId}`);
        if (courseRes.data && courseRes.data.success) {
          setCourse(courseRes.data.data.course || courseRes.data.data);
          setLessonsList(courseRes.data.data.lessons || []);
        }

        const lessonRes = await axios.get(`/api/courses/${courseId}/lessons/${lessonId}`);
        if (lessonRes.data && lessonRes.data.success) {
          setLesson(lessonRes.data.data);
        }

        // Isolate progress fetching so progress errors don't prevent lesson viewing
        try {
          const progressRes = await axios.get(`/api/courses/${courseId}/progress`);
          if (progressRes.data && progressRes.data.success) {
            setProgress(progressRes.data.data);
          }
        } catch (progErr) {
          console.warn('Progress fetch warning:', progErr?.message);
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
        window.dispatchEvent(new Event('cart-updated'));
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    } finally {
      setMarkingDone(false);
    }
  };

  const videoId = lesson ? (lesson.youtubeVideoId || getYouTubeId(lesson.videoUrl)) : '';
  const isCompleted = progress?.completedLessons?.includes(lessonId);
  const youtubeWatchUrl = lesson?.videoUrl || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#');
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '420px', width: '100%', marginBottom: '24px', borderRadius: '16px' }}></div>
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
      {/* Navigation Header */}
      <div className="lesson-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Link to={`/courses/${courseId}`} className="back-course-btn" style={{ fontWeight: '600', color: 'var(--primary-dark)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          &larr; Back to {tDynamic(course.title)}
        </Link>
        <div className="lesson-top-progress" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="progress-text" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
            {t('courseProgressBar')}: {progress?.percentage || 0}%
          </span>
          <div className="progress-track-bar" style={{ width: '120px', height: '8px', backgroundColor: '#eef2f5', borderRadius: '4px', overflow: 'hidden' }}>
            <div className="progress-fill" style={{ width: `${progress?.percentage || 0}%`, height: '100%', backgroundColor: '#4a773c' }}></div>
          </div>
        </div>
      </div>

      {/* Video Container — Plain UI Video Coming Soon Placeholder */}
      <div className="lesson-player-container" style={{ marginBottom: '24px' }}>
        <div className="video-missing-box" style={{
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: '#fbf9f6',
          padding: '56px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '260px',
          boxShadow: '0 4px 16px rgba(96, 71, 52, 0.04)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-pink)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: 'var(--primary-dark)'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
          </div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '8px', fontWeight: '700' }}>
            Video Coming Soon
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '440px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            The official video tutorial for this lesson is currently being produced by Swadhara. Check back soon for video updates.
          </p>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '600',
            padding: '6px 16px',
            borderRadius: '20px',
            backgroundColor: '#eee9e0',
            color: 'var(--primary-dark)'
          }}>
            Official Swadhara Course Material
          </span>
        </div>
      </div>

      {/* Lesson Controls Panel */}
      <div className="lesson-controls-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/courses/${courseId}/lesson/${prevLesson._id}`)}
          disabled={!prevLesson}
          style={{ opacity: prevLesson ? 1 : 0.5 }}
        >
          &larr; {t('back')}
        </button>

        <button
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} complete-action-btn`}
          onClick={handleMarkComplete}
          disabled={markingDone}
          style={{ padding: '12px 32px', fontWeight: '700' }}
        >
          {isCompleted ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4a773c' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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
          style={{ opacity: nextLesson ? 1 : 0.5 }}
        >
          {t('next')} &rarr;
        </button>
      </div>

      {/* Lesson Info Details */}
      <div className="lesson-info-content" style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span className="lesson-meta-badge" style={{ backgroundColor: 'var(--card-pink)', color: 'var(--primary-dark)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
            Lesson {currentIdx + 1} of {lessonsList.length}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>
            &bull; {lesson.duration}
          </span>
        </div>
        <h1 className="lesson-title-heading" style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '16px', fontWeight: '700' }}>
          {tDynamic(lesson.title)}
        </h1>
        <p className="lesson-description-text" style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.7', margin: 0 }}>
          {tDynamic(lesson.description)}
        </p>
      </div>

      {/* AI Course Tutor / Doubt Solver Widget */}
      <AiTutorWidget courseId={courseId} lessonId={lessonId} courseTitle={tDynamic(course.title)} />
    </div>
  );
}
