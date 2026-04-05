import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mic, ArrowRight, PhoneCall, Calendar, Users, CheckCircle2, Globe, Cpu, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';

const useCases = [
  {
    id: 'support',
    label: 'Customer Support',
    icon: <PhoneCall size={18} />,
    title: 'Resolve support tickets before a human ever picks up.',
    desc: 'Stario handles Tier-1 support instantly - resolving FAQs, troubleshooting common issues, and escalating complex cases with full context.',
    benefits: [
      '80% ticket deflection rate',
      'Instant first response',
      'Sentiment-aware escalation',
      'Full conversation logging',
    ],
    chat: [
      { role: 'user', text: "My order hasn't arrived yet. Order #45621." },
      { role: 'stario', text: "Hi! I'm checking order #45621 right now... Your package left the warehouse yesterday and is expected by Thursday. Want me to send you live tracking?" },
      { role: 'user', text: 'Yes please!' },
      { role: 'stario', text: "Done! I've sent tracking to your registered email. Is there anything else I can help with?" },
    ],
  },
  {
    id: 'leads',
    label: 'Lead Qualification',
    icon: <Users size={18} />,
    title: 'Qualify leads 24/7, route only the best to your team.',
    desc: 'Stario asks the right pre-screening questions, scores inbound leads, and only surfaces high-intent prospects to your sales team.',
    benefits: [
      'Custom qualification criteria',
      'Lead scoring & routing',
      'CRM auto-sync',
      'Conversion analytics',
    ],
    chat: [
      { role: 'user', text: "Hi, I'm interested in your enterprise plans." },
      { role: 'stario', text: 'Great! To connect you with the right person - roughly how many employees does your team have?' },
      { role: 'user', text: 'Around 200 people.' },
      { role: 'stario', text: "Perfect fit for our Enterprise tier. I'm routing you to a senior account executive now and booking a discovery call." },
    ],
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    icon: <Calendar size={18} />,
    title: 'Book meetings automatically, zero back-and-forth.',
    desc: 'Stario integrates with your calendar to check availability and book appointments in real-time during the voice conversation.',
    benefits: [
      'Calendar API integration',
      'Timezone-aware booking',
      'Reminder automation',
      'No-show reduction',
    ],
    chat: [
      { role: 'user', text: 'Can I speak with someone about a custom project?' },
      { role: 'stario', text: 'Absolutely! Our next available slot is tomorrow at 3pm IST or Thursday at 10am. Which works best for you?' },
      { role: 'user', text: 'Tomorrow at 3pm.' },
      { role: 'stario', text: "Booked! You'll receive a confirmation with video call link shortly. Looking forward to speaking with you." },
    ],
  },
];

function ChatDemo({ messages, playToken = 1, duration = 5000 }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!playToken) return undefined;

    setShown(0);
    const stepDuration = duration / Math.max(messages.length, 1);
    const timers = messages.map((_, i) => (
      setTimeout(() => setShown(i + 1), Math.round(stepDuration * (i + 1)))
    ));
    return () => timers.forEach(clearTimeout);
  }, [duration, messages, playToken]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 0' }}>
      <AnimatePresence>
        {messages.slice(0, shown).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            {msg.role === 'stario' && (
              <div style={{
                width: 28, height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-electric))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginRight: 8,
                flexShrink: 0,
                alignSelf: 'flex-end',
              }}>
                <Mic size={12} color="#fff" />
              </div>
            )}
            <div style={{
              maxWidth: '75%',
              padding: '10px 16px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-secondary)',
              color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
              fontSize: 14,
              lineHeight: 1.5,
              border: msg.role === 'stario' ? '1px solid var(--border)' : 'none',
            }}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {shown < messages.length && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 36 }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WaveformBars() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 40 }}>
      {[...Array(32)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [`${20 + Math.sin(i * 0.7) * 25}%`, `${60 + Math.cos(i * 0.4) * 35}%`, `${20 + Math.sin(i * 0.7) * 25}%`] }}
          transition={{ duration: 0.7 + (i % 5) * 0.1, repeat: Infinity, delay: i * 0.03, ease: 'easeInOut' }}
          style={{
            width: 3, borderRadius: 2,
            background: 'linear-gradient(to top, #0057ff, #00d4ff)',
            opacity: 0.6 + (i % 4) * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export default function Stario() {
  const caseIds = useMemo(() => useCases.map(u => u.id), []);
  const initialPlaybackState = useMemo(
    () => Object.fromEntries(useCases.map(useCase => [useCase.id, useCase.id === 'support' ? 1 : 0])),
    []
  );
  const [activeCase, setActiveCase] = useState('support');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [tabBarHeight, setTabBarHeight] = useState(58);
  const [desktopSegmentHeight, setDesktopSegmentHeight] = useState(() => Math.round(window.innerHeight * 1.02));
  const [mobilePlaybackTokens, setMobilePlaybackTokens] = useState(initialPlaybackState);
  const useCaseStageRef = useRef(null);
  const tabsRef = useRef(null);
  const desktopPanelRef = useRef(null);
  const mobilePanelRefs = useRef([]);
  const activeCaseRef = useRef(activeCase);
  const active = useCases.find(u => u.id === activeCase) || useCases[0];

  const getNavHeight = () => {
    const rawValue = getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim();
    const parsedValue = Number.parseFloat(rawValue);
    return Number.isFinite(parsedValue) ? parsedValue : 72;
  };

  const getStickyOffset = () => getNavHeight() + tabBarHeight + 24;
  const mobileScrollMarginTop = `calc(var(--nav-height) + ${tabBarHeight + 24}px)`;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    activeCaseRef.current = activeCase;
  }, [activeCase]);

  useEffect(() => {
    const measureTabs = () => {
      setTabBarHeight(tabsRef.current?.offsetHeight ?? 58);
    };

    measureTabs();
    window.addEventListener('resize', measureTabs);
    return () => window.removeEventListener('resize', measureTabs);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const measurePanel = () => {
      const panelHeight = desktopPanelRef.current?.offsetHeight ?? 0;
      const viewportHeight = window.innerHeight || 900;
      const nextSegmentHeight = Math.max(Math.round(viewportHeight * 1.04), panelHeight + 72);

      setDesktopSegmentHeight(currentHeight => (
        currentHeight === nextSegmentHeight ? currentHeight : Math.max(currentHeight, nextSegmentHeight)
      ));
    };

    measurePanel();
    window.addEventListener('resize', measurePanel);

    let resizeObserver;
    if (window.ResizeObserver && desktopPanelRef.current) {
      resizeObserver = new ResizeObserver(measurePanel);
      resizeObserver.observe(desktopPanelRef.current);
    }

    return () => {
      window.removeEventListener('resize', measurePanel);
      resizeObserver?.disconnect();
    };
  }, [activeCase, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const stage = useCaseStageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const stickyOffset = getStickyOffset();
      if (rect.top > stickyOffset || rect.bottom < stickyOffset + 120) return;

      const totalHeight = stage.offsetHeight;
      const consumed = Math.min(
        Math.max(stickyOffset - rect.top, 0),
        Math.max(totalHeight - 1, 0)
      );
      const nextIndex = Math.min(useCases.length - 1, Math.floor(consumed / desktopSegmentHeight));
      const nextId = useCases[nextIndex]?.id;

      if (nextId && nextId !== activeCase) {
        setActiveCase(nextId);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeCase, desktopSegmentHeight, isMobile, tabBarHeight]);

  useEffect(() => {
    if (!isMobile) return;

    const panels = mobilePanelRefs.current.filter(Boolean);
    if (!panels.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visiblePanels = entries
        .filter(entry => entry.isIntersecting)
        .sort((panelA, panelB) => panelB.intersectionRatio - panelA.intersectionRatio);

      const nextId = visiblePanels[0]?.target.dataset.useCasePanel;
      if (nextId && nextId !== activeCaseRef.current) {
        setActiveCase(nextId);
        setMobilePlaybackTokens(currentTokens => ({
          ...currentTokens,
          [nextId]: (currentTokens[nextId] ?? 0) + 1,
        }));
      }
    }, {
      threshold: [0.2, 0.38, 0.6, 0.78],
      rootMargin: '-18% 0px -38% 0px',
    });

    panels.forEach(panel => observer.observe(panel));
    return () => observer.disconnect();
  }, [isMobile]);

  const scrollToUseCase = (id) => {
    setActiveCase(id);
    const index = caseIds.indexOf(id);
    if (index === -1) return;

    if (isMobile) {
      const panel = mobilePanelRefs.current[index];
      panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const stage = useCaseStageRef.current;
    if (!stage) return;

    const top = stage.offsetTop + (desktopSegmentHeight * index) - getStickyOffset();
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  };

  const renderUseCaseContent = (useCase, playToken = 1) => (
    <div className="chat-shell">
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.2 }}>
          {useCase.title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28, fontSize: 15 }}>{useCase.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {useCase.benefits.map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={16} color="var(--accent)" />
              <span style={{ fontSize: 15 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.78)',
        border: '1px solid var(--border)',
        borderRadius: 24,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--bg-secondary)',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-electric))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mic size={14} color="#fff" />
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 13 }}>Stario AI Demo</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Live conversation simulation</p>
          </div>
        </div>
        <div style={{ padding: '20px', minHeight: 220 }}>
          <ChatDemo messages={useCase.chat} playToken={playToken} duration={5000} />
        </div>
      </div>
    </div>
  );

  const renderUseCasePanel = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCase}
        ref={desktopPanelRef}
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.985 }}
        transition={{ duration: 0.35 }}
      >
        {renderUseCaseContent(active, activeCase)}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <Seo
        title="Stario AI Voice Agent"
        description="Meet Stario, the AI voice agent for customer support, lead qualification, scheduling, and 24/7 business communication."
        keywords="AI voice agent, voice automation, customer support AI, lead qualification AI, Stario"
      />
      <section className="page-hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(0, 87, 255, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 20% 80%, rgba(0, 212, 255, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div className="split-layout" style={{ alignItems: 'center' }}>
            <AnimatedSection>
              <span className="tag" style={{ marginBottom: 28 }}>
                <Mic size={12} />
                AI Voice Agent - Stario v2
              </span>
              <h1 style={{
                fontSize: 'clamp(44px, 6.5vw, 78px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: 24,
              }}>
                The AI Voice
                <br />
                Agent That <span className="gradient-text">Never Sleeps.</span>
              </h1>
              <p style={{
                fontSize: 18,
                color: 'var(--text-secondary)',
                fontWeight: 300,
                lineHeight: 1.65,
                maxWidth: 480,
                marginBottom: 40,
              }}>
                Automate customer support, handle inbound leads, and streamline business communication without human intervention - at any hour.
              </p>
              <div className="responsive-stack">
                <Link to="/contact">
                  <motion.button className="btn-accent" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    Request Live Demo <ArrowRight size={15} />
                  </motion.button>
                </Link>
                <a href="mailto:business@statbrio.com">
                  <motion.button className="btn-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    Get Pricing
                  </motion.button>
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="compact-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.78)',
                  border: '1px solid var(--border)',
                  borderRadius: 32,
                  boxShadow: '0 32px 80px rgba(0, 87, 255, 0.15)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0057ff, #00d4ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0, 87, 255, 0.4)',
                  }}>
                    <Mic size={24} color="#fff" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>Stario AI</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}
                      />
                      Live - Actively Listening
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span style={{
                      padding: '4px 10px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: 8,
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: '#10b981',
                      fontWeight: 600,
                    }}>ONLINE</span>
                  </div>
                </div>

                <WaveformBars />

                <div className="stat-inline-grid">
                  {[
                    { label: 'Response', value: '<0.5s' },
                    { label: 'Languages', value: '20+' },
                    { label: 'Uptime', value: '99.9%' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{
                      padding: '14px 12px',
                      background: 'var(--bg-secondary)',
                      borderRadius: 14,
                      textAlign: 'center',
                    }}>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>{value}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <AnimatedSection style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Core Features</span>
            <h2 className="section-heading">Built different. Built better.</h2>
          </AnimatedSection>

          <div className="grid-4">
            {[
              { icon: <Mic size={22} />, title: 'Natural Voice', desc: 'Human-like conversational flow with proper intonation, pauses, and context retention across long calls.', color: '#0057ff' },
              { icon: <Globe size={22} />, title: 'Multi-Language', desc: 'Speak to customers in their native language. Supports 20+ languages including Tamil, Hindi, and regional dialects.', color: '#059669' },
              { icon: <Cpu size={22} />, title: 'Industry Tuned', desc: 'Trained specifically on your business data, FAQs, and domain vocabulary for maximum relevance.', color: '#7c3aed' },
              { icon: <Clock size={22} />, title: '24/7 Available', desc: 'Zero downtime, ensuring no missed leads, no frustrated customers, and full coverage at 3am.', color: '#dc2626' },
            ].map(({ icon, title, desc, color }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.78)',
                    border: '1px solid var(--border)',
                    borderRadius: 22,
                    padding: 28,
                    height: '100%',
                    transition: 'box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 32px ${color}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `${color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, marginBottom: 18,
                  }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section ref={tabsRef} style={{ position: 'sticky', top: 'var(--nav-height)', zIndex: 100, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <AnimatedSection style={{ marginBottom: 24, paddingTop: 22 }}>
            <span className="section-label">Use Cases</span>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>See Stario in action.</h2>
          </AnimatedSection>

          <div style={{ display: 'flex', gap: 8, paddingBottom: 16, overflowX: 'auto', flexWrap: isMobile ? 'nowrap' : 'wrap' }}>
            {useCases.map(uc => (
              <motion.button
                key={uc.id}
                onClick={() => scrollToUseCase(uc.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 22px',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  border: '1.5px solid',
                  borderColor: activeCase === uc.id ? 'var(--accent)' : 'var(--border)',
                  background: activeCase === uc.id ? 'var(--accent-soft)' : 'transparent',
                  color: activeCase === uc.id ? 'var(--accent)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {uc.icon}
                {uc.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {isMobile ? (
        <section className="section" style={{ paddingTop: 28 }}>
          <div className="container">
            <div style={{ display: 'grid', gap: 24 }}>
              {useCases.map((useCase, index) => (
                <AnimatedSection key={useCase.id} delay={Math.min(index * 0.06, 0.18)}>
                  <article
                    ref={node => { mobilePanelRefs.current[index] = node; }}
                    data-use-case-panel={useCase.id}
                    style={{
                      minHeight: 'max(460px, calc(100svh - var(--nav-height) - 188px))',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      scrollMarginTop: mobileScrollMarginTop,
                      paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
                    }}
                  >
                    {renderUseCaseContent(useCase, mobilePlaybackTokens[useCase.id])}
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section
          ref={useCaseStageRef}
          style={{
            height: `${useCases.length * desktopSegmentHeight}px`,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: `calc(var(--nav-height) + ${tabBarHeight + 20}px)`,
              minHeight: `calc(100svh - var(--nav-height) - ${tabBarHeight + 40}px)`,
              display: 'flex',
              alignItems: 'flex-start',
              padding: '12px 0 calc(32px + env(safe-area-inset-bottom))',
            }}
          >
            <div className="container">
              {renderUseCasePanel()}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <AnimatedSection>
            <div className="responsive-panel" style={{
              background: 'linear-gradient(135deg, var(--accent), #0040cc)',
              borderRadius: 32,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -60, right: -60,
                width: 250, height: 250, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
              }} />
              <div style={{
                position: 'absolute', bottom: -40, left: -40,
                width: 200, height: 200, borderRadius: '50%',
                background: 'rgba(0,212,255,0.15)',
              }} />
              <div style={{ position: 'relative' }}>
                <Mic size={48} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto 24px' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 16 }}>
                  Ready to see Stario live?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginBottom: 40 }}>
                  Book a 20-minute demo and see how Stario handles your real-world scenarios.
                </p>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '16px 40px',
                      background: '#fff',
                      color: 'var(--accent)',
                      borderRadius: 14,
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      fontFamily: 'var(--font-body)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    Request a Live Demo <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
