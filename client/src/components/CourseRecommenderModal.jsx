import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sparkles, Star, ArrowRight, RotateCcw, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SafeImage from './SafeImage';

export default function CourseRecommenderModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { t, tDynamic, language } = useLanguage();

  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState('Not sure');
  const [skillLevel, setSkillLevel] = useState('Complete beginner');
  const [goal, setGoal] = useState('Learn a new skill');
  const [timeCommitment, setTimeCommitment] = useState('30–60 minutes');

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const interestsOptions = [
    'Tailoring',
    'Embroidery',
    'Baking',
    'Jewellery',
    'Handicrafts',
    'Not sure'
  ];

  const skillOptions = [
    'Complete beginner',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  const goalOptions = [
    'Learn a new skill',
    'Make things for myself',
    'Make products to sell',
    'Start earning from home',
    'Improve an existing skill'
  ];

  const timeOptions = [
    '15–30 minutes',
    '30–60 minutes',
    '1–2 hours',
    'More than 2 hours'
  ];

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError('');
    setRecommendations(null);

    try {
      const response = await axios.post('/api/ai/recommend', {
        interest,
        skillLevel,
        goal,
        timeCommitment,
        language
      });

      if (response.data && response.data.success) {
        setRecommendations(response.data.data);
        setStep(5);
      } else {
        setError('Unable to fetch recommendations right now. Please try again.');
      }
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError('AI service is temporarily unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setRecommendations(null);
    setError('');
  };

  const handleCourseClick = (courseId) => {
    onClose();
    navigate(`/courses/${courseId}`);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(46, 34, 38, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--border-radius-lg)',
        maxWidth: '620px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-card)',
        border: '1px solid var(--border-subtle)',
        padding: '32px',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="eyebrow-pill">
            Swadhara AI Assistant
          </span>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', margin: '12px 0 6px 0' }}>
            {step === 5 ? 'Your Swadhara Recommendations' : 'Find the Right Course for You'}
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
            {step === 5 ? 'Based on your learning preferences and goals' : 'Answer 4 quick questions to get personalized course suggestions'}
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {/* STEP 1: INTEREST */}
        {step === 1 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>
              1. What are you interested in learning?
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              {interestsOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setInterest(opt)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: `2px solid ${interest === opt ? 'var(--primary-rose-dark)' : 'var(--border-subtle)'}`,
                    backgroundColor: interest === opt ? 'var(--bg-pink-soft)' : '#FFFFFF',
                    color: 'var(--primary-dark)',
                    fontWeight: interest === opt ? '700' : '500',
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setStep(2)}
              style={{ width: '100%' }}
            >
              Next: Skill Level <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: SKILL LEVEL */}
        {step === 2 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>
              2. What is your current skill level?
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {skillOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSkillLevel(opt)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: `2px solid ${skillLevel === opt ? 'var(--primary-rose-dark)' : 'var(--border-subtle)'}`,
                    backgroundColor: skillLevel === opt ? 'var(--bg-pink-soft)' : '#FFFFFF',
                    color: 'var(--primary-dark)',
                    fontWeight: skillLevel === opt ? '700' : '500',
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>
                &larr; Back
              </button>
              <button className="btn btn-primary" onClick={() => setStep(3)} style={{ flex: 1 }}>
                Next: Your Goal <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GOAL */}
        {step === 3 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>
              3. What is your main learning goal?
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {goalOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setGoal(opt)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: `2px solid ${goal === opt ? 'var(--primary-rose-dark)' : 'var(--border-subtle)'}`,
                    backgroundColor: goal === opt ? 'var(--bg-pink-soft)' : '#FFFFFF',
                    color: 'var(--primary-dark)',
                    fontWeight: goal === opt ? '700' : '500',
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>
                &larr; Back
              </button>
              <button className="btn btn-primary" onClick={() => setStep(4)} style={{ flex: 1 }}>
                Next: Time Available <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TIME */}
        {step === 4 && (
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '14px' }}>
              4. How much time can you spend learning per session?
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              {timeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTimeCommitment(opt)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--border-radius-sm)',
                    border: `2px solid ${timeCommitment === opt ? 'var(--primary-rose-dark)' : 'var(--border-subtle)'}`,
                    backgroundColor: timeCommitment === opt ? 'var(--bg-pink-soft)' : '#FFFFFF',
                    color: 'var(--primary-dark)',
                    fontWeight: timeCommitment === opt ? '700' : '500',
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setStep(3)} disabled={loading} style={{ flex: 1 }}>
                &larr; Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleGetRecommendations}
                disabled={loading}
                style={{ flex: 2 }}
              >
                {loading ? 'Swadhara AI is thinking...' : 'Get AI Recommendations'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: RECOMMENDATION RESULTS */}
        {step === 5 && recommendations && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {recommendations.map((item, idx) => {
                const course = item.course;
                if (!course) return null;
                const difficulty = course.difficulty || course.level || 'Easy';

                return (
                  <div
                    key={course._id || idx}
                    style={{
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--border-radius-md)',
                      padding: '18px',
                      backgroundColor: idx === 0 ? 'var(--bg-pink-soft)' : '#FFFFFF'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="badge-tag" style={{ backgroundColor: 'var(--primary-dark)', color: '#FFFFFF' }}>
                        {item.rank === 'Best Match' ? 'Best Match' : item.rank}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        {difficulty} &bull; {tDynamic(course.category?.name)}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>
                      {tDynamic(course.title)}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '12px', lineHeight: '1.5', fontStyle: 'italic', backgroundColor: 'rgba(255,255,255,0.7)', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid var(--primary-rose-dark)' }}>
                      "{item.reason}"
                    </p>

                    <button
                      className="btn btn-rose btn-sm"
                      onClick={() => handleCourseClick(course._id)}
                      style={{ width: '100%' }}
                    >
                      View Course <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-outline btn-sm" onClick={resetQuiz} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} /> Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
