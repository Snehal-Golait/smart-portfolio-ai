import React, { useEffect, useRef, useState } from 'react';

const ROLES = [
  'AI/ML Engineer',
  'Fullstack Developer',
  'Backend Architect',
  'Deep Learning Dev',
  'Problem Solver',
];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const word = ROLES[roleIdx];
    const delay = deleting ? 50 : 90;
    const timer = setTimeout(() => {
      if (!deleting) {
        setTyped(word.slice(0, charIdx + 1));
        if (charIdx + 1 >= word.length) {
          setTimeout(() => setDeleting(true), 1200);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setTyped(word.slice(0, charIdx - 1));
        if (charIdx - 1 <= 0) {
          setDeleting(false);
          setRoleIdx(r => (r + 1) % ROLES.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section id="hero" style={{
      position: 'relative', zIndex: 1,
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: '4rem',
      padding: '8rem 5% 4rem',
      maxWidth: 1400,
      margin: '0 auto',
    }}>
      {/* Left Content */}
      <div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
          color: 'var(--accent)', letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: '1.2rem',
          animation: 'fadeUp 0.6s 0.2s both',
        }}>
          // AI · ML · Fullstack Engineer
        </div>

        <h1 style={{
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 800, lineHeight: 1.05,
          animation: 'fadeUp 0.6s 0.35s both',
        }}>
          Snehal<br />
          <span style={{ color: 'var(--accent)', textShadow: '0 0 40px rgba(0,229,255,0.3)' }}>Golait</span>
        </h1>

        <div style={{
          fontFamily: 'var(--font-code)', fontSize: '1rem',
          color: 'var(--muted)', marginTop: '1rem',
          animation: 'fadeUp 0.6s 0.5s both',
        }}>
          &gt; <span style={{ color: 'var(--accent3)' }}>{typed}</span>
          <span style={{ animation: 'blink 0.9s infinite', color: 'var(--accent)' }}>_</span>
        </div>

        <p style={{
          fontSize: '1rem', lineHeight: 1.8, color: '#94a3b8',
          marginTop: '1.8rem', maxWidth: 520,
          animation: 'fadeUp 0.6s 0.65s both',
        }}>
          Final-year B.Tech IT student passionate about building intelligent,
          scalable systems. From training CNNs to architecting REST APIs —
          I thrive at the intersection of AI and real-world engineering.
        </p>

        <div style={{
          display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap',
          animation: 'fadeUp 0.6s 0.8s both',
        }}>
          <a href="#projects" style={{
            background: 'var(--accent)', color: 'var(--bg)',
            padding: '0.85rem 2rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700,
            letterSpacing: '1px', textDecoration: 'none',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#00b8d4'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'none'; }}>
            view_projects()
          </a>
          <a href="https://github.com/Snehal-Golait" target="_blank" rel="noreferrer" style={{
            border: '1px solid var(--border)', color: 'var(--text)',
            padding: '0.85rem 2rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '1px',
            textDecoration: 'none', transition: 'all 0.2s',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'none'; }}>
            github →
          </a>
        </div>
      </div>

      {/* Right Visual */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 1s 0.4s both',
      }}>
        <div style={{ position: 'relative', width: 340, height: 340 }}>
          {/* Scanline overlay */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.012) 2px, rgba(0,229,255,0.012) 4px)',
            animation: 'scan 8s linear infinite',
          }} />

          <img
            src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=600&q=80"
            alt="Developer"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'grayscale(20%) contrast(1.1)',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              position: 'relative', zIndex: 2,
            }}
          />

          {/* Border rings */}
          <div style={{
            position: 'absolute', inset: -10,
            border: '1px solid var(--accent)',
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
            animation: 'borderPulse 3s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: -20,
            border: '1px solid rgba(124,58,237,0.3)',
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
            animation: 'borderPulse 3s ease-in-out 1.5s infinite',
          }} />

          {/* CGPA badge */}
          <div style={{
            position: 'absolute', bottom: -24, right: -24, zIndex: 4,
            background: 'var(--surface2)', border: '1px solid var(--border)',
            padding: '0.9rem 1.2rem',
          }}>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>8.01</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '1px' }}>CGPA / 10</div>
          </div>

          {/* Floating stat badges */}
          {[
            { label: '🤖 AI/ML Enthusiast', top: -10, left: -40 },
            { label: '⚡ Fullstack Dev', top: '50%', right: -60 },
          ].map((b, i) => (
            <div key={i} style={{
              position: 'absolute', top: b.top, left: b.left, right: b.right,
              background: 'rgba(13,17,23,0.9)', border: '1px solid var(--border)',
              backdropFilter: 'blur(10px)', padding: '0.6rem 0.9rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)',
              animation: `float ${3.5 + i}s ease-in-out ${i * -1.2}s infinite`,
              zIndex: 5, whiteSpace: 'nowrap',
            }}>
              {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '2px',
      }}>
        <div style={{
          width: 1, height: 40,
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'scan 1.5s ease-in-out infinite',
        }} />
        scroll
      </div>
    </section>
  );
}
