import React, { useState } from 'react';

// ── About ─────────────────────────────────────────────────────────────────────
export function About() {
  return (
    <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <section id="about" style={{ position: 'relative', zIndex: 1, padding: '6rem 5%', maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          01 — about
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '3rem' }}>Who I Am</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            {[
              "I'm a final-year Information Technology student at SVKM's Institute of Technology, Dhule, with a strong foundation in full-stack web development, machine learning, and cloud infrastructure.",
              "I've worked across the entire software lifecycle — from designing REST APIs and database schemas, to building responsive frontends and deploying on AWS. I'm particularly drawn to applying AI to solve tangible, real-world problems.",
              "I actively leverage AI-assisted tooling to accelerate my workflow and believe in writing code that's clean, maintainable, and production-ready from day one.",
            ].map((p, i) => (
              <p key={i} style={{ color: '#94a3b8', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '1rem' }}>{p}</p>
            ))}

            {/* Education card */}
            <div style={{
              marginTop: '2rem',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border)',
              padding: '1.5rem',
              clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
            }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>SVKM's Institute of Technology, Dhule</h4>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>
                B.Tech — Information Technology · DBATU University
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>Dec 2022 – June 2026</p>
              <div style={{ fontFamily: 'var(--font-code)', fontSize: '1.5rem', color: 'var(--accent3)', marginTop: '0.7rem', fontWeight: 700 }}>
                8.01 <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>/ 10 CGPA</span>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=80"
              alt="Coding"
              style={{
                width: '100%', height: 320, objectFit: 'cover',
                filter: 'brightness(0.6) saturate(0.8) hue-rotate(180deg)',
                clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)',
              }}
            />
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              background: 'var(--accent)', color: 'var(--bg)',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '2px',
              padding: '0.4rem 0.9rem',
            }}>
              SVKM'S IOT · DHULE · 2026
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────────
export function Experience() {
  const timeline = [
    {
      period: 'SEPT 2023 — NOV 2023',
      role: 'IoT Intern',
      org: 'Smart Logic Technologies',
      points: [
        'Worked with real-time data streams from IoT sensors for data acquisition & analysis',
        'Analyzed system data to detect anomalies and improve reliability',
        'Supported backend logic and data pipelines, strengthening AI workflow skills',
      ],
      color: 'var(--accent)',
    },
    {
      period: '2022 — PRESENT',
      role: 'Member, ACM Student Chapter',
      org: 'SVKM\'s Institute of Technology · ISTE Member',
      points: [
        'Active member in computing and technology student communities',
        'Collaborated on technical events and knowledge-sharing sessions',
      ],
      color: 'var(--accent2)',
    },
  ];

  const certs = [
    { icon: '🐍', name: 'Joy of Computing Using Python', org: 'NPTEL (SWAYAM)' },
    { icon: '🌐', name: 'Web Development Fundamentals', org: 'Infosys Springboard' },
  ];

  return (
    <section id="experience" style={{ position: 'relative', zIndex: 1, padding: '6rem 5%', maxWidth: 1300, margin: '0 auto' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
        04 — experience
      </div>
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '3rem' }}>Journey So Far</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid rgba(0,229,255,0.2)' }}>
          {timeline.map((item, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: i < timeline.length - 1 ? '1px solid var(--border)' : 'none' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: '-2.5rem', top: 4,
                width: 10, height: 10, borderRadius: '50%',
                background: item.color, boxShadow: `0 0 12px ${item.color}`,
              }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '0.5rem' }}>{item.period}</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.role}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.8rem' }}>{item.org}</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {item.points.map((p, j) => (
                  <li key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.77rem', color: '#64748b', lineHeight: 1.7, paddingLeft: '1rem', position: 'relative', marginBottom: '0.3rem' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>▸</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certs + image */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
            // certifications
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {certs.map(c => (
              <div key={c.name} style={{
                background: 'var(--surface2)', border: '1px solid var(--border)',
                padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}>
                <span style={{ fontSize: '1.8rem' }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.2rem' }}>{c.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--muted)' }}>{c.org}</div>
                </div>
              </div>
            ))}
          </div>
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80"
            alt="AI"
            style={{
              width: '100%', height: 180, objectFit: 'cover', marginTop: '2rem',
              filter: 'brightness(0.55) saturate(0.7) hue-rotate(200deg)',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
export function Contact() {
  const links = [
    { icon: '✉️', label: 'Email', value: 'golaitsnehal03@gmail.com', href: 'mailto:golaitsnehal03@gmail.com' },
    { icon: '🐙', label: 'GitHub', value: 'Snehal-Golait', href: 'https://github.com/Snehal-Golait' },
    { icon: '💼', label: 'LinkedIn', value: 'snehal-golait', href: 'https://www.linkedin.com/in/snehal-golait' },
    { icon: '📱', label: 'Phone', value: '+91-9665810281', href: 'tel:+919665810281' },
  ];
  const [hov, setHov] = useState<number | null>(null);

  return (
    <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <section id="contact" style={{ position: 'relative', zIndex: 1, padding: '6rem 5%', maxWidth: 1300, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          05 — contact
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem' }}>Let's Build Something</h2>
        <p style={{ color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', maxWidth: 500, margin: '0 auto 3rem' }}>
          Open to internships, full-time roles, collaborations, and open-source contributions. Don't hesitate to reach out!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                background: hov === i ? 'rgba(0,229,255,0.05)' : 'var(--surface2)',
                border: `1px solid ${hov === i ? 'var(--accent)' : 'var(--border)'}`,
                padding: '2rem 1rem',
                textDecoration: 'none', color: 'var(--text)',
                transition: 'all 0.3s',
                transform: hov === i ? 'translateY(-4px)' : 'none',
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
              }}
            >
              <span style={{ fontSize: '2rem' }}>{l.icon}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase' }}>{l.label}</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--muted)', wordBreak: 'break-all' }}>{l.value}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--border)',
      padding: '2rem 5%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)',
      flexWrap: 'wrap', gap: '1rem',
    }}>
      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>SG.dev</span>
      <span>Snehal Golait · Dhule, Maharashtra · AI + Fullstack Portfolio</span>
      <span>© 2026 · Built with React + Python</span>
    </footer>
  );
}
