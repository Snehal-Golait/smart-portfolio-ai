import { useState, useCallback, useRef } from 'react';
import { Message, ChatState } from '../types';

const API_BASE = '/api';

export function useChat() {
  const [state, setState] = useState<ChatState>({
    sessionId: null,
    messages: [],
    isLoading: false,
    isOpen: false,
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const initialized = useRef(false);

  const init = useCallback(async () => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const [sessRes, sugRes] = await Promise.all([
        fetch(`${API_BASE}/session`, { method: 'POST' }),
        fetch(`${API_BASE}/suggestions`),
      ]);
      const sessData = await sessRes.json();
      const sugData = await sugRes.json();
      setState(prev => ({ ...prev, sessionId: sessData.session_id }));
      setSuggestions(sugData.suggestions || []);
    } catch {
      // Backend not running — still allow UI to work with fallback
      setState(prev => ({ ...prev, sessionId: 'local-' + Date.now() }));
      setSuggestions([
        "What tech stack does Snehal use?",
        "Tell me about FractureNetPlus project",
        "Is Snehal available for internships?",
        "What AI/ML skills does Snehal have?",
      ]);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.isLoading) return;

    const userMsg: Message = { role: 'user', content, id: Date.now().toString() };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isLoading: true,
    }));

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: state.sessionId,
          message: content,
        }),
      });
      const data = await res.json();
      const aiMsg: Message = {
        role: 'assistant',
        content: data.reply || 'Sorry, something went wrong.',
        id: Date.now().toString() + '-ai',
      };
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMsg],
        isLoading: false,
      }));
    } catch {
      const errMsg: Message = {
        role: 'assistant',
        content: '⚠️ Backend not connected. Please start the Python server on port 8000 and refresh.',
        id: Date.now().toString() + '-err',
      };
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errMsg],
        isLoading: false,
      }));
    }
  }, [state.sessionId, state.isLoading]);

  const openChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
    init();
  }, [init]);

  const closeChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const toggleChat = useCallback(() => {
    setState(prev => {
      if (!prev.isOpen) init();
      return { ...prev, isOpen: !prev.isOpen };
    });
  }, [init]);

  return { state, suggestions, sendMessage, openChat, closeChat, toggleChat };
}

export function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const animRef = useRef<number>();

  const start = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.35 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.o})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,229,255,${0.07 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [canvasRef]);

  return { start };
}
