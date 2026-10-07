import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Send, HelpCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AiTutorWidget({ courseId, lessonId, courseTitle }) {
  const { language } = useLanguage();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');

  const quickQuestions = [
    'Explain this step',
    'Easier way to do this',
    'What material should I use?',
    'I made a mistake'
  ];

  const handleAsk = async (questionText) => {
    const qToSubmit = questionText || question;
    if (!qToSubmit || qToSubmit.trim() === '') {
      setError('Please type a question before asking.');
      return;
    }

    if (qToSubmit.trim().length > 500) {
      setError('Question must be under 500 characters.');
      return;
    }

    setLoading(true);
    setError('');

    const userEntry = { sender: 'user', text: qToSubmit.trim() };
    setChatHistory((prev) => [...prev, userEntry]);
    if (!questionText) setQuestion('');

    try {
      const response = await axios.post('/api/ai/ask', {
        courseId,
        lessonId,
        question: qToSubmit.trim(),
        language
      });

      if (response.data && response.data.success) {
        const aiAnswer = response.data.answer || response.data?.data?.answer;
        const aiEntry = { sender: 'ai', text: aiAnswer };
        setChatHistory((prev) => [...prev, aiEntry]);
      } else {
        setError(response.data?.message || 'Unable to get an answer right now.');
      }
    } catch (err) {
      console.error('Error asking AI tutor:', err);
      setError(err.response?.data?.message || 'AI service is temporarily unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <div key={lineIdx} style={{ marginBottom: line.trim() === '' ? '8px' : '4px' }}>
          {formattedLine}
        </div>
      );
    });
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--border-radius-md)',
      border: '1px solid var(--border-subtle)',
      padding: '24px',
      boxShadow: 'var(--shadow-subtle)',
      marginTop: '32px'
    }}>
      {/* Widget Header (Panel 5 Reference) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-pink-soft)',
            color: 'var(--primary-rose-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', margin: 0 }}>
              Ask Swadhara AI
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Contextual guidance for {courseTitle || 'this course'}
            </span>
          </div>
        </div>

        <span className="badge-tag">
          Powered by Gemini AI
        </span>
      </div>

      {/* Chat Conversation History */}
      {chatHistory.length > 0 && (
        <div style={{
          maxHeight: '320px',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-base)',
          borderRadius: 'var(--border-radius-sm)',
          padding: '16px',
          marginBottom: '20px',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? 'var(--primary-dark)' : '#FFFFFF',
                color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-main)',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                maxWidth: '85%',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                boxShadow: msg.sender === 'user' ? 'none' : '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              {msg.sender === 'user' ? (
                <span>{msg.text}</span>
              ) : (
                renderFormattedText(msg.text)
              )}
            </div>
          ))}
        </div>
      )}

      {/* Suggested Quick Questions (Panel 5 Reference) */}
      {chatHistory.length === 0 && (
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
            Quick Questions:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAsk(q)}
                disabled={loading}
                className="btn btn-ghost btn-sm"
                style={{
                  backgroundColor: 'var(--bg-pink-soft)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--border-radius-pill)',
                  color: 'var(--primary-dark)',
                  fontSize: '0.82rem'
                }}
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '14px', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {/* Input Field & Submit Button */}
      <form onSubmit={(e) => { e.preventDefault(); handleAsk(); }} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Have a doubt? Ask Swadhara AI..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          maxLength={500}
          style={{ flexGrow: 1, height: '46px', fontSize: '0.9rem' }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !question.trim()}
          style={{ padding: '0 20px', fontSize: '0.9rem', flexShrink: 0 }}
        >
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>
    </div>
  );
}
