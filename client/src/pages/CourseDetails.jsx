import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, Clock, BookOpen, User, ArrowRight, ChevronRight, Award, PlayCircle } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('overview');

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

        if (user) {
          try {
            const progressRes = await axios.get(`/api/courses/${id}/progress`);
            if (progressRes.data && progressRes.data.success) {
              setProgress(progressRes.data.data);
            }
          } catch (progressErr) {
            console.warn('Could not load user progress:', progressErr?.message);
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
      }
    }

    navigate(`/courses/${id}/lesson/${targetLessonId}`);
  };

  if (loading) {
    return (
      <div className="container section">
        <div className="skeleton" style={{ height: '320px', width: '100%', marginBottom: '24px' }}></div>
        <div className="skeleton" style={{ height: '32px', width: '60%', marginBottom: '16px' }}></div>
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

  const courseJourneySteps = [
    { step: 1, title: 'Introduction & Basics', desc: 'Understanding tools, materials, and initial setup.' },
    { step: 2, title: 'Threading & Starting Stitches', desc: 'Step-by-step guidance on foundational technique.' },
    { step: 3, title: 'Floral Motif Practice', desc: 'Combining stitches to build intricate handmade patterns.' },
    { step: 4, title: 'Complete a Small Project', desc: 'Finishing your first handcrafted creation ready to showcase.' }
  ];

  return (
    <div className="container section">

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '24px' }}>
        <Link to="/courses" style={{ color: 'var(--text-muted)' }}>Learn</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-muted)' }}>{tDynamic(course.category?.name)}</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--primary-dark)', fontWeight: '600' }}>{tDynamic(course.title)}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        gap: '40px',
        backgroundColor: 'var(--bg-pink-soft)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '36px',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-subtle)',
        marginBottom: '40px'
      }}>

        <div style={{ height: '280px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', border: '2px solid #FFFFFF', boxShadow: 'var(--shadow-card)' }}>
          <SafeImage
            src={course.thumbnail}
            alt={tDynamic(course.title)}
            category={course.category?.slug}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span className="badge-tag">
              <BookOpen size={12} /> {tDynamic(course.category?.name)}
            </span>
            <span className={`badge-tag ${difficulty === 'Easy' ? 'badge-easy' : 'badge-medium'}`}>
              {difficulty}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {course.duration}
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>{tDynamic(course.title)}</h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '28px' }}>
            {tDynamic(course.description)}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={handleStartContinue}
              className="btn btn-rose btn-lg"
            >
              {progress && progress.percentage > 0 ? 'Continue Learning' : 'Start Learning'} <ArrowRight size={18} />
            </button>

            {user && (
              <span style={{ fontSize: '0.9rem', color: 'var(--primary-rose-dark)', fontWeight: '700' }}>
                {progress?.percentage || 0}% Complete
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '36px' }}>
        {['overview', 'lessons', 'materials', 'creator'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: activeTab === tab ? '700' : '500',
              color: activeTab === tab ? 'var(--primary-rose-dark)' : 'var(--text-muted)',
              borderBottom: activeTab === tab ? '3px solid var(--primary-rose-dark)' : '3px solid transparent',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
        <div>

          {course.learningOutcomes && course.learningOutcomes.length > 0 && (
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--border-radius-md)',
              padding: '28px',
              marginBottom: '36px',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>What you'll learn</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {course.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} style={{ color: '#2E6A34', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {tDynamic(outcome)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COURSE JOURNEY TIMELINE (Panel 3 Reference) */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Course Journey</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {courseJourneySteps.map((stepItem) => (
                <div
                  key={stepItem.step}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: '20px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-pink-soft)',
                    color: 'var(--primary-rose-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    flexShrink: 0
                  }}>
                    {stepItem.step}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'var(--primary-dark)' }}>{stepItem.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>{stepItem.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LESSONS SYLLABUS LIST */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Syllabus & Lessons ({lessons.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lessons.map((lesson, idx) => {
                const isCompleted = progress?.completedLessons?.includes(lesson._id);
                return (
                  <div
                    key={lesson._id}
                    onClick={() => user ? navigate(`/courses/${id}/lesson/${lesson._id}`) : navigate('/login')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      backgroundColor: isCompleted ? '#F4FBF4' : '#FFFFFF',
                      border: `1px solid ${isCompleted ? '#C4E4C4' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--border-radius-sm)',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <PlayCircle size={22} style={{ color: isCompleted ? '#2E6A34' : 'var(--primary-rose-dark)' }} />
                      <div>
                        <h4 style={{ margin: '0 0 2px 0', fontSize: '0.98rem', color: 'var(--primary-dark)' }}>
                          {idx + 1}. {tDynamic(lesson.title)}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{lesson.duration}</span>
                      </div>
                    </div>
                    {isCompleted ? (
                      <span className="badge-tag badge-easy">Completed</span>
                    ) : (
                      <span style={{ fontSize: '0.82rem', color: 'var(--primary-rose-dark)', fontWeight: '600' }}>View Lesson &rarr;</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI TUTOR WIDGET */}
          <AiTutorWidget courseId={id} courseTitle={tDynamic(course.title)} />
        </div>

        {/* Right Creator & Materials Panel */}
        <div>
          {/* MEET YOUR CREATOR CARD (Panel 3 Reference) */}
          <div style={{
            backgroundColor: 'var(--bg-pink-soft)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--border-radius-md)',
            padding: '24px',
            marginBottom: '28px'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-rose-dark)', display: 'block', marginBottom: '12px' }}>
              Meet your creator
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                alt="Meena Sharma"
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF' }}
              />
              <div>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '1.05rem', color: 'var(--primary-dark)' }}>Meena Sharma</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Embroidery Creator</span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '16px', lineHeight: '1.5' }}>
              "I've been doing embroidery for 10 years. Teaching gives me a chance to see more women create and earn."
            </p>
            <button onClick={() => navigate('/profile')} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              View profile &rarr;
            </button>
          </div>

          {/* REQUIRED MATERIALS CARD */}
          {course.materials && course.materials.length > 0 && (
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--border-radius-md)',
              padding: '24px'
            }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Required Materials</h4>
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {course.materials.map((mat, idx) => (
                  <li key={idx} style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    {tDynamic(mat)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
