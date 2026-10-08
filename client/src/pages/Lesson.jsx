import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ArrowRight, CheckCircle2, Video, PlayCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import AiTutorWidget from '../components/AiTutorWidget';

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
        const courseRes = await axios.get(`/api/courses/${courseId}`);
        if (courseRes.data && courseRes.data.success) {
          setCourse(courseRes.data.data.course || courseRes.data.data);
          setLessonsList(courseRes.data.data.lessons || []);
        }

        const lessonRes = await axios.get(`/api/courses/${courseId}/lessons/${lessonId}`);
        if (lessonRes.data && lessonRes.data.success) {
          setLesson(lessonRes.data.data);
        }

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

  const isCompleted = progress?.completedLessons?.includes(lessonId);

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '380px', width: '100%', marginBottom: '24px' }}></div>
        <div className="skeleton" style={{ height: '24px', width: '60%' }}></div>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Link to={`/courses/${courseId}`} style={{ fontWeight: '600', color: 'var(--primary-dark)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> Back to {tDynamic(course.title)}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
            Course Progress: {progress?.percentage || 0}%
          </span>
          <div style={{ width: '120px', height: '8px', backgroundColor: '#F0E2E5', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progress?.percentage || 0}%`, height: '100%', backgroundColor: 'var(--primary-rose-dark)' }}></div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <div style={{
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-pink-soft)',
          padding: '56px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '280px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: 'var(--primary-rose-dark)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <Video size={30} />
          </div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
            Video Lesson Coming Soon
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '460px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
            The official practical video tutorial for this lesson is currently being filmed. Read the lesson guide below to get started.
          </p>
          <span className="badge-tag">
            Official Swadhara Course Material
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/courses/${courseId}/lesson/${prevLesson._id}`)}
          disabled={!prevLesson}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-rose'}`}
          onClick={handleMarkComplete}
          disabled={markingDone}
          style={{ padding: '12px 32px' }}
        >
          {isCompleted ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#2E6A34', fontWeight: '700' }}>
              <CheckCircle2 size={18} /> Lesson Completed
            </span>
          ) : (
            'Mark Lesson Done'
          )}
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/courses/${courseId}/lesson/${nextLesson._id}`)}
          disabled={!nextLesson}
        >
          Next <ArrowRight size={16} />
        </button>
      </div>

      <div className="card-editorial" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span className="badge-tag">
            Lesson {currentIdx + 1} of {lessonsList.length}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600' }}>
            &bull; {lesson.duration}
          </span>
        </div>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>
          {tDynamic(lesson.title)}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.7', margin: 0 }}>
          {tDynamic(lesson.description)}
        </p>
      </div>

      <AiTutorWidget courseId={courseId} lessonId={lessonId} courseTitle={tDynamic(course.title)} />
    </div>
  );
}
