import React, { useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import { About, Experience, Contact, Footer } from './components/Sections';
import ChatWidget from './components/ChatWidget';
import { useChat, useParticles } from './hooks';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { start } = useParticles(canvasRef as React.RefObject<HTMLCanvasElement>);
  const { state, suggestions, sendMessage, toggleChat, openChat } = useChat();

  useEffect(() => {
    const cleanup = start();
    return cleanup;
  }, [start]);

  return (
    <>
      {/* Background layers */}
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <canvas ref={canvasRef} />

      {/* Navigation */}
      <Navbar onOpenChat={openChat} />

      {/* Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {/* AI Chat Widget */}
      <ChatWidget
        isOpen={state.isOpen}
        messages={state.messages}
        isLoading={state.isLoading}
        suggestions={suggestions}
        onSend={sendMessage}
        onToggle={toggleChat}
      />
    </>
  );
}
