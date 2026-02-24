import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '../types';

interface ChatWidgetProps {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  suggestions: string[];
  onSend: (msg: string) => void;
  onToggle: () => void;
}

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/•/g, '•')
    .replace(/\n/g, '<br/>');
}

function TypingDots() {
  return (
    <div style={{
      display: 'flex', gap: '5px', alignItems: 'center', padding: '4px 0'
    }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--accent)',
          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          display: 'inline-block',
        }} />
      ))}
    </div>
  );
}

export default function ChatWidget({ isOpen, messages, isLoading, suggestions, onSend, onToggle }: ChatWidgetProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) setShowSuggestions(true);
    if (messages.length > 0) setShowSuggestions(false);
  }, [isOpen, messages.length]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, [input, onSend]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSuggestion = (s: string) => {
    onSend(s);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: 60, height: 60,
          background: isOpen ? 'var(--accent2)' : 'var(--accent)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
          transition: 'all 0.25s',
          boxShadow: isOpen
            ? '0 0 30px rgba(124,58,237,0.5)'
            : '0 0 30px rgba(0,229,255,0.4)',
          zIndex: 1000,
          fontSize: '1.5rem',
        }}
        title="Chat with Snehal's AI"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Pulse ring around FAB */}
      {!isOpen && (
        <div style={{
          position: 'fixed', bottom: '1.6rem', right: '1.6rem',
          width: 68, height: 68,
          border: '2px solid rgba(0,229,255,0.4)',
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
          animation: 'borderPulse 2s ease-in-out infinite',
          zIndex: 999,
          pointerEvents: 'none',
        }} />
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '5.5rem', right: '2rem',
          width: 'min(400px, calc(100vw - 2rem))',
          height: '520px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,255,0.08)',
          zIndex: 998,
          animation: 'slideIn 0.25s ease forwards',
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem 1.2rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
            background: 'var(--surface2)',
          }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
              flexShrink: 0,
            }}>🧠</div>
            <div>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 700 }}>
                AI Resume Assistant
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>
                Ask me anything about Snehal
              </div>
            </div>
            <div style={{
              marginLeft: 'auto',
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent3)',
              boxShadow: '0 0 8px var(--accent3)',
              animation: 'pulse 2s infinite',
            }} />
          </div>

          {/* Messages */}
          <div className="chat-scroll" style={{
            flex: 1, overflowY: 'auto', padding: '1rem',
            display: 'flex', flexDirection: 'column', gap: '0.8rem',
          }}>
            {/* Welcome */}
            {messages.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '1rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                color: 'var(--muted)', lineHeight: 1.8,
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
                <div>Hi! I'm Snehal's AI assistant.</div>
                <div>Ask me anything about skills, projects, or experience!</div>
              </div>
            )}

            {/* Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Suggested questions:
                </div>
                {suggestions.slice(0, 4).map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(s)}
                    style={{
                      textAlign: 'left',
                      padding: '0.5rem 0.8rem',
                      background: 'rgba(0,229,255,0.05)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,229,255,0.12)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,229,255,0.05)')}
                  >
                    ▸ {s}
                  </button>
                ))}
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div
                key={msg.id || i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'slideIn 0.2s ease forwards',
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '0.7rem 0.9rem',
                  background: msg.role === 'user'
                    ? 'rgba(0,229,255,0.12)'
                    : 'var(--surface2)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(0,229,255,0.25)' : 'var(--border)'}`,
                  clipPath: msg.role === 'user'
                    ? 'polygon(8px 0, 100% 0, 100% 100%, 0 100%)'
                    : 'polygon(0 0, 100% 0, 100% 100%, 8px 100%)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  lineHeight: 1.65,
                  color: msg.role === 'user' ? 'var(--accent)' : 'var(--text)',
                }}>
                  <div
                    className="chat-content"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                  />
                </div>
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '0.7rem 0.9rem',
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8px 100%)',
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '0.8rem',
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: '0.5rem',
            background: 'var(--surface2)',
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about skills, projects, experience..."
              rows={1}
              style={{
                flex: 1,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                padding: '0.6rem 0.8rem',
                resize: 'none',
                outline: 'none',
                lineHeight: 1.5,
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(0,229,255,0.4)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                padding: '0 1rem',
                background: input.trim() && !isLoading ? 'var(--accent)' : 'var(--surface)',
                color: input.trim() && !isLoading ? 'var(--bg)' : 'var(--muted)',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                transition: 'all 0.2s',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
                cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
              }}
            >
              {isLoading ? '...' : '→'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
