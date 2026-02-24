import React, { useRef, useEffect, useState } from 'react';

const SKILLS = [
  { icon: '💻', cat: 'Languages', tags: ['Python', 'C', 'C++', 'Java', 'PHP', 'JavaScript'] },
  { icon: '🎨', cat: 'Frontend', tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'React'] },
  { icon: '⚙️', cat: 'Backend & DBs', tags: ['Flask', 'Django', 'Node.js', 'REST APIs', 'MySQL', 'MongoDB'] },
  { icon: '🧠', cat: 'AI & ML', tags: ['TensorFlow', 'CNNs', 'Deep Learning', 'OpenCV', 'LLMs'] },
  { icon: '☁️', cat: 'Cloud & Tools', tags: ['AWS EC2', 'AWS S3', 'Git', 'GitHub', 'VS Code'] },
  { icon: '🧩', cat: 'Core Concepts', tags: ['OOP', 'DSA', 'SDLC', 'REST', 'Debugging', 'Testing'] },
];

function useReveal(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function SkillCard({ icon, cat, tags, delay }: { icon: string; cat: string; tags: string[]; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
        padding: '1.8rem',
        transition: 'all 0.3s',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? 'var(--glow)' : 'none',
        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
        animation: `fadeUp 0.5s ${delay}s both`,
      }}
    >
      <div style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
        {cat}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.71rem',
            color: 'var(--text)', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '0.28rem 0.65rem', transition: 'all 0.2s',
            cursor: 'default',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.1)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--text)'; }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null!);
  const visible = useReveal(ref);
  return (
    <section ref={ref} id="skills" style={{ position: 'relative', zIndex: 1, padding: '6rem 5%', maxWidth: 1300, margin: '0 auto' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.6rem', opacity: visible ? 1 : 0, transition: 'opacity 0.5s' }}>02 — expertise</div>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '3rem', opacity: visible ? 1 : 0, transition: 'opacity 0.5s 0.1s' }}>Technical Arsenal</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {SKILLS.map((s, i) => (
          <SkillCard key={s.cat} {...s} delay={visible ? i * 0.07 : 999} />
        ))}
      </div>
    </section>
  );
}
