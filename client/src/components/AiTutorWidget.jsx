import React, { useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function AiTutorWidget({ courseId, lessonId, courseTitle }) {
  const { language } = useLanguage();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');

  const quickQuestions = [
    'Why is my cake sinking in the middle?',
    'My stitches are uneven. What should I check?',
    'Which fabric is easiest for beginners?',
    'Why is my thread breaking constantly?'
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

  // Helper to convert basic markdown bold and newlines into formatted text
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      // Process bold **text**
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
    <div className="ai-tutor-widget" style={{
      backgroundColor: '#fff',
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      padding: '24px',
      boxShadow: '0 4px 16px rgba(96, 71, 52, 0.05)',
      marginTop: '32px'
    }}>
      {/* Widget Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--card-pink)',
            color: 'var(--primary-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '1rem'
          }}>
            ✨
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', margin: 0, fontWeight: '700' }}>
              Ask Swadhara AI
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Your course assistant for {courseTitle || 'this course'}
            </span>
          </div>
        </div>

        <span style={{ fontSize: '0.75rem', fontWeight: '600', backgroundColor: '#eee9e0', padding: '4px 10px', borderRadius: '12px', color: 'var(--primary-dark)' }}>
          Powered by Gemini AI
        </span>
      </div>

      {/* Chat Conversation Area */}
      {chatHistory.length > 0 && (
        <div className="ai-chat-history" style={{
          maxHeight: '320px',
          overflowY: 'auto',
          backgroundColor: '#fbf9f6',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? 'var(--primary-dark)' : '#fff',
                color: msg.sender === 'user' ? '#fff' : 'var(--text-main)',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                maxWidth: '85%',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                boxShadow: msg.sender === 'user' ? 'none' : '0 2px 8px rgba(0,0,0,0.03)'
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

      {/* Suggested Quick Questions */}
      {chatHistory.length === 0 && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-light)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
            Suggested Questions:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAsk(q)}
                disabled={loading}
                style={{
                  fontSize: '0.8rem',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  backgroundColor: '#f4efe8',
                  color: 'var(--primary-dark)',
                  border: '1px solid #e0d8cc',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: '12px', fontSize: '0.85rem' }}>
          {error}
        </div>
      )}

      {/* Input Field & Submit */}
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
          style={{ padding: '0 20px', fontSize: '0.9rem', fontWeight: '700', flexShrink: 0 }}
        >
          {loading ? 'Swadhara AI is thinking...' : 'Ask AI ✨'}
        </button>
      </form>
    </div>
  );
}
