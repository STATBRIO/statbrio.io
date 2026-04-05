import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Linkedin, ArrowRight, Target, Eye, Lightbulb, Heart } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';

const timeline = [
  { year: '2024', title: 'Statbrio Founded', desc: 'Started with a vision to make AI, software, and automation accessible for ambitious businesses.' },
  { year: '2025', title: '20+ Projects', desc: 'Crossed 20 successful project deliveries across product, automation, analytics, and digital growth initiatives.' },
  { year: '2025', title: 'Internship Program', desc: 'Started our internship program to connect students with real-world product, AI, and engineering experience.' },
  { year: '2026', title: 'Stario Launching', desc: 'Stario is set for a 2026 launch, bringing our next-generation AI voice experience to lead capture and customer conversations.' },
];

const values = [
  { icon: <Lightbulb size={22} />, title: 'Innovation First', desc: "We reject the status quo and engineer for what's next, not what's now." },
  { icon: <Target size={22} />, title: 'Precision Delivery', desc: 'Every sprint, every commit, every deployment — held to the highest standard.' },
  { icon: <Heart size={22} />, title: 'Client Partnership', desc: 'We treat your business as our own. Transparent, collaborative, invested.' },
  { icon: <Eye size={22} />, title: 'Future Thinking', desc: 'Architecture decisions made for years ahead, not just this quarter.' },
];

export default function About() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <Seo
        title="About Statbrio"
        description="Learn about Statbrio, our mission, vision, leadership, and the values behind our AI-powered digital solutions."
        keywords="About Statbrio, AI company Tamil Nadu, software company leadership, automation company India"
      />

      {/* ── HERO ── */}
      <section className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, transparent 40%, var(--bg-primary) 100%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <AnimatedSection>
            <span className="section-label">About Us</span>
            <h1 style={{
              fontSize: 'clamp(34px, 7vw, 80px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              maxWidth: 760,
              marginBottom: 28,
            }}>
              Transforming Ideas into Scalable{' '}
              <span className="gradient-text">Digital Realities.</span>
            </h1>
            <p style={{
              fontSize: 'clamp(15px, 2vw, 20px)',
              color: 'var(--text-secondary)',
              fontWeight: 300,
              lineHeight: 1.65,
              maxWidth: 600,
            }}>
              We combine AI, full-stack engineering, lead generation systems, SaaS products,
              IoT workflows, and analytics into digital solutions built to scale.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: 28 }}>
            {/* Mission */}
            <AnimatedSection>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  background: 'rgba(255,255,255,0.78)',
                  border: '1px solid rgba(255,255,255,0.92)',
                  borderRadius: 24,
                  padding: 'clamp(24px,4vw,48px)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(13,26,60,0.08)',
                }}
              >
                <div style={{
                  position: 'absolute', top: -30, right: -30,
                  width: 200, height: 200, borderRadius: '50%',
                  background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 70%)',
                }} />
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: 'var(--accent-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', marginBottom: 24,
                }}>
                  <Target size={24} />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Our Mission</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>
                  Enterprise-grade AI for every business size.
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  To make enterprise-grade AI and automation accessible and affordable for businesses
                  of all sizes — from startups to corporations.
                </p>
              </motion.div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection delay={0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                style={{
                  background: 'linear-gradient(135deg, #1a6fff 0%, #0052e0 100%)',
                  border: '1px solid rgba(26,111,255,0.3)',
                  borderRadius: 24,
                  padding: 'clamp(24px,4vw,48px)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(26,111,255,0.25)',
                }}
              >
                <div style={{
                  position: 'absolute', bottom: -30, left: -30,
                  width: 200, height: 200, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
                }} />
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: 'rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', marginBottom: 24,
                }}>
                  <Eye size={24} />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>Our Vision</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16, color: '#ffffff' }}>
                  Global leader in AI-powered transformation.
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.7 }}>
                  To be a global leader in AI-powered business transformation and secure software
                  architecture — setting the standard for intelligent software.
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection style={{ marginBottom: 60 }}>
            <span className="section-label">Leadership</span>
            <h2 className="section-heading">The person behind the vision.</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="founder-card" style={{
              background: 'rgba(255,255,255,0.78)',
              border: '1px solid rgba(255,255,255,0.95)',
              borderRadius: 28,
              padding: 'clamp(24px,5vw,56px) clamp(20px,5vw,60px)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(13,26,60,0.08)',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%',
                background: 'linear-gradient(90deg, transparent, var(--accent-soft))',
                pointerEvents: 'none',
              }} />

              {/* Avatar */}
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  style={{
                    width: 'clamp(90px,12vw,160px)',
                    height: 'clamp(90px,12vw,160px)',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 20px',
                    boxShadow: '0 20px 60px rgba(0,87,255,0.35)',
                  }}
                >
                  <img
                    src="/Gopinath.jpg"
                    alt="Gopinath Barani"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </motion.div>
                <a
                  href="https://www.linkedin.com/in/gopinath-barani-bb7615255/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                >
                  Gopinath Barani
                </a>
                <p style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Founder & CEO</p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <motion.a
                    href="https://www.linkedin.com/in/gopinath-barani-bb7615255/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    style={{
                      width: 38, height: 38, borderRadius: 12,
                      background: 'rgba(26,111,255,0.08)', border: '1px solid rgba(26,111,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <Linkedin size={16} />
                  </motion.a>
                </div>
              </div>

              {/* Bio */}
              <div style={{ position: 'relative' }}>
                <p style={{
                  fontSize: 'clamp(16px,2vw,22px)', fontFamily: 'var(--font-display)',
                  fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.02em',
                  marginBottom: 20, color: 'var(--text-primary)',
                }}>
                  "Building the bridge between complex AI and real business impact."
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(13px,1.5vw,16px)', marginBottom: 28 }}>
                  Gopinath Barani is the driving force behind Statbrio, bringing deep expertise in AI
                  systems, automation, lead generation workflows, and full-stack software engineering.
                  He focuses on turning complex technology into practical, cost-effective solutions
                  that create measurable business momentum.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {['AI Systems', 'Full Stack', 'Automation', 'Lead Generation', 'Data Analysis'].map(skill => (
                    <span key={skill} style={{
                      padding: '6px 12px',
                      background: 'var(--accent-soft)', border: '1px solid rgba(0,87,255,0.2)',
                      borderRadius: 10, fontSize: 13, fontWeight: 500, color: 'var(--accent)',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <AnimatedSection style={{ marginBottom: 56 }}>
            <span className="section-label">Our Values</span>
            <h2 className="section-heading">What drives us every day.</h2>
          </AnimatedSection>
          <div className="grid-4">
            {values.map(({ icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'rgba(255,255,255,0.78)', border: '1px solid rgba(255,255,255,0.92)',
                    borderRadius: 22, padding: '28px 22px', height: '100%',
                    backdropFilter: 'blur(16px)', boxShadow: '0 4px 20px rgba(13,26,60,0.07)',
                    transition: 'box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,111,255,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,26,60,0.07)'}
                >
                  <div style={{
                    width: 46, height: 46, borderRadius: 13, background: 'var(--accent-soft)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', marginBottom: 18,
                  }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection style={{ marginBottom: 56 }}>
            <span className="section-label">Our Journey</span>
            <h2 className="section-heading">Built milestone by milestone.</h2>
          </AnimatedSection>
          <div className="timeline-wrap">
            <div style={{
              position: 'absolute', left: 20, top: 0, bottom: 0, width: 1,
              background: 'linear-gradient(180deg, var(--accent), transparent)',
            }} />
            {timeline.map(({ year, title, desc }, i) => (
              <AnimatedSection key={i} delay={i * 0.12}>
                <div className="timeline-item">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 400 }}
                    viewport={{ once: true }}
                    style={{
                      position: 'absolute', left: 10, top: 4,
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'var(--accent)', border: '3px solid var(--bg-primary)',
                      boxShadow: '0 0 12px var(--accent)',
                    }}
                  />
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.06em' }}>{year}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, marginTop: 4 }}>{title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <h2 className="section-heading">Let's build together.</h2>
            <p className="section-subheading" style={{ margin: '0 auto 36px' }}>
              Whether you have a project in mind or just want to explore what's possible — we'd love to hear from you.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <motion.button className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Get In Touch <ArrowRight size={15} />
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button className="btn-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Our Services
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
