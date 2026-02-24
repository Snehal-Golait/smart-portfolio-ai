import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenChat: () => void;
}

export default function Navbar({ onOpenChat }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem 5%',
      background: scrolled ? 'rgba(6,8,16,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <a href="#hero" style={{
        fontFamily: 'var(--font-code)', fontSize: '1rem',
        color: 'var(--accent)', letterSpacing: '2px', textDecoration: 'none',
      }}>
        <span style={{ color: 'var(--text)' }}>SG</span>.dev
      </a>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }} className="hide-mobile">
        {['about', 'skills', 'projects', 'experience', 'contact'].map(s => (
          <li key={s}>
            <a href={`#${s}`} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.77rem',
              color: 'var(--muted)', letterSpacing: '1px',
              transition: 'color 0.2s', textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              {s}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={onOpenChat}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          color: 'var(--accent)', border: '1px solid var(--accent)',
          padding: '0.45rem 1.1rem', background: 'transparent',
          letterSpacing: '1px', cursor: 'pointer', transition: 'all 0.2s',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
      >
        🤖 ask_ai()
      </button>
    </nav>
  );
}
