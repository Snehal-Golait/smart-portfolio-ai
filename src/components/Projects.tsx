import React, { useState } from 'react';

const PROJECTS = [
  {
    title: 'FractureNetPlus',
    subtitle: 'AI-Based Fracture Detection Web App',
    period: 'Sept 2025 – Nov 2025',
    desc: 'AI-powered fracture detection using CNN + TensorFlow. Designed RESTful APIs for data ingestion & result delivery, integrated with a responsive Flask frontend. Contributed across the full development lifecycle from requirement analysis to deployment.',
    stack: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Flask', 'MySQL'],
    stackColors: ['#00e5ff', '#00e5ff', '#10b981', '#10b981', '#7c3aed', '#7c3aed'],
    github: 'https://github.com/Snehal-Golait',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80',
    accent: 'var(--accent)',
  },
  {
    title: 'Alumni Association Platform',
    subtitle: 'Full-Stack College Network Platform',
    period: 'Sept 2024 – Dec 2024',
    desc: 'Full-stack web platform for college alumni — registration, networking, job postings, event management & success stories. Built REST APIs for all services with persistent MySQL storage and GitHub-based collaboration workflow.',
    stack: ['HTML/CSS', 'JavaScript', 'Node.js', 'REST API', 'MySQL'],
    stackColors: ['#7c3aed', '#7c3aed', '#00e5ff', '#00e5ff', '#10b981'],
    github: 'https://github.com/Snehal-Golait/alumni-association-platform',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=80',
    accent: 'var(--accent2)',
  },
  {
    title: 'Business-Order-Recording-Calculation-Assistant-',
    subtitle: 'CLI-Based Business Management Tool',
    period: 'Academic',
    desc: 'Developed a web-based system to record client orders manually and automatically calculate total price.',
    stack: ['JavaScript', 'Flask', 'MySQL', 'REST API'],
    stackColors: ['#10b981', '#10b981', '#00e5ff', '#7c3aed'],
    github: 'https://github.com/Snehal-Golait/-Business-Order-Recording-Calculation-Assistant-',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&q=80',
    accent: 'var(--accent3)',
  },
];

function ProjectCard({ project, idx }: { project: typeof PROJECTS[0]; idx: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${hov ? project.accent : 'var(--border)'}`,
        overflow: 'hidden',
        transition: 'all 0.3s',
        transform: hov ? 'translateY(-6px)' : 'none',
        boxShadow: hov ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,229,255,0.08)` : 'none',
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
        animation: `fadeUp 0.5s ${0.1 + idx * 0.12}s both`,
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.4s',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
            filter: hov ? 'brightness(0.4) saturate(0.7)' : 'brightness(0.65) saturate(0.85)',
          }}
        />
        {/* Overlay links on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 20%, rgba(13,17,23,0.95))',
          display: 'flex', alignItems: 'flex-end', padding: '1.2rem',
          opacity: hov ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          <a
            href={project.github}
            target="_blank" rel="noreferrer"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              color: 'var(--accent)', border: '1px solid var(--accent)',
              padding: '0.4rem 1rem', textDecoration: 'none',
              transition: 'all 0.2s', background: 'rgba(0,0,0,0.5)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.color = 'var(--accent)'; }}
          >
            GitHub →
          </a>
        </div>
        {/* Period badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)',
          background: 'rgba(6,8,16,0.85)', border: '1px solid var(--border)',
          padding: '0.25rem 0.6rem', backdropFilter: 'blur(8px)',
        }}>
          {project.period}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>{project.title}</h3>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>{project.subtitle}</div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.77rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1.2rem' }}>
          {project.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.stack.map((t, i) => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              padding: '0.2rem 0.6rem',
              background: `${project.stackColors[i] || '#00e5ff'}18`,
              border: `1px solid ${project.stackColors[i] || '#00e5ff'}40`,
              color: project.stackColors[i] || '#00e5ff',
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <section id="projects" style={{ position: 'relative', zIndex: 1, padding: '6rem 5%', maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          03 — work
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '3rem' }}>Featured Projects</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} idx={i} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="https://github.com/Snehal-Golait?tab=repositories"
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-block',
              border: '1px solid var(--border)', color: 'var(--text)',
              padding: '0.85rem 2rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '1px',
              textDecoration: 'none', transition: 'all 0.2s',
              clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            view_all_repos() on GitHub →
          </a>
        </div>
      </section>
    </div>
  );
}
