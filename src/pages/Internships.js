import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bot, Code2, Database, Cpu, TestTube, BookOpen,
  ArrowRight, CheckCircle2, ChevronDown, Clock,
  Users, Award, Globe, Upload
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID?.trim() || '';
const EMAILJS_INTERNSHIP_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_INTERNSHIP_TEMPLATE_ID?.trim() || '';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY?.trim() || '';
const hasInternshipEmailJsConfig = [EMAILJS_SERVICE_ID, EMAILJS_INTERNSHIP_TEMPLATE_ID, EMAILJS_PUBLIC_KEY].every(
  value => value && !value.startsWith('YOUR_')
);

const domains = [
  {
    id: 'ai',
    icon: <Bot size={24} />,
    title: 'AI & LLM Automation',
    duration: '1–3 months',
    color: '#0057ff',
    short: 'Work with machine learning models, neural networks, and AI agents on real client deliverables.',
    details: [
      'Hands-on with LangChain, OpenAI, and local LLMs',
      'Build production AI agents from scratch',
      'Contribute to live Stario voice agent features',
      'Learn prompt engineering, fine-tuning basics',
      'Real client deliverables — not toy projects',
    ],
  },
  {
    id: 'fullstack',
    icon: <Code2 size={24} />,
    title: 'Full Stack Web Development',
    duration: '1–3 months',
    color: '#7c3aed',
    short: 'Build real-world applications using modern frontend and backend technologies.',
    details: [
      'React, Next.js, Node.js, FastAPI stack',
      'Ship features to production apps',
      'Database design and optimization',
      'RESTful and GraphQL API development',
      'Deployment on AWS/Vercel/Docker',
    ],
  },
  {
    id: 'data',
    icon: <Database size={24} />,
    title: 'Python & Data Analytics',
    duration: '1–2 months',
    color: '#059669',
    short: 'Focus on automation scripting, data processing, and visualization using Python.',
    details: [
      'Python scripting for real automation tasks',
      'Pandas, NumPy, Matplotlib mastery',
      'Web scraping and data pipeline building',
      'Interactive dashboard creation',
      'Statistical analysis on actual datasets',
    ],
  },
  {
    id: 'iot',
    icon: <Cpu size={24} />,
    title: 'Internet of Things (IoT)',
    duration: '2–3 months',
    color: '#d97706',
    short: 'Hands-on experience with smart connected devices and real-time systems.',
    details: [
      'Hardware-software integration',
      'MQTT protocol and IoT cloud platforms',
      'Sensor data pipelines',
      'Edge computing concepts',
      'Build a working smart device prototype',
    ],
  },
  {
    id: 'testing',
    icon: <TestTube size={24} />,
    title: 'Software Testing & QA',
    duration: '1–2 months',
    color: '#dc2626',
    short: 'Learn manual and automated QA for production environments.',
    details: [
      'Selenium, Playwright, Cypress automation',
      'Test plan creation and execution',
      'CI/CD pipeline integration',
      'API testing with Postman/k6',
      'Work on live production test suites',
    ],
  },
];

const yearOptions = [
  { value: '1', label: '1st Year' },
  { value: '2', label: '2nd Year' },
  { value: '3', label: '3rd Year' },
  { value: '4', label: '4th Year' },
  { value: 'grad', label: 'Graduate / Fresher' },
];

function AccordionItem({ domain }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        border: `1px solid ${open ? domain.color : 'var(--border)'}`,
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ background: 'var(--bg-secondary)' }}
        style={{
          width: '100%',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          fontFamily: 'var(--font-body)',
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${domain.color}18`,
          border: `1px solid ${domain.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: domain.color,
          flexShrink: 0,
        }}>
          {domain.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
            {domain.title}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            ⏱ {domain.duration}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: 'var(--text-muted)' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ padding: '0 28px 28px clamp(28px, 10vw, 96px)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>
                {domain.short}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {domain.details.map(d => (
                  <div key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                    <CheckCircle2 size={14} color={domain.color} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Internships() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <Seo
        title="AI & Full Stack Internships"
        description="Apply for Statbrio internships in AI, full stack development, Python, IoT, and software testing. Build real products with direct mentorship."
        keywords="AI Internship Chennai, Full Stack Developer Internship, Python Internship Chennai, software testing internship, Statbrio internship"
      />
      {/* ── HERO ── */}
      <section className="dot-grid page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, transparent 50%, var(--bg-primary) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '10%', right: '5%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 87, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <AnimatedSection>
            <span className="section-label">Internships @ Statbrio</span>
            <h1 style={{
              fontSize: 'clamp(44px, 7vw, 84px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              maxWidth: 800,
              marginBottom: 24,
            }}>
              Build Real Tech.
              <br />
              <span className="gradient-text">Launch Your Career.</span>
            </h1>
            <p style={{
              fontSize: 20,
              color: 'var(--text-secondary)',
              fontWeight: 300,
              lineHeight: 1.65,
              maxWidth: 580,
              marginBottom: 40,
            }}>
              Hands-on, industry-level internships for students and freshers. Step away from theory and work on live AI, data, and development projects.
            </p>
            <motion.a
              href="#apply"
              className="btn-accent"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', fontSize: 16 }}
            >
              Apply Now <ArrowRight size={16} />
            </motion.a>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY INTERN ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <AnimatedSection style={{ marginBottom: 60 }}>
            <span className="section-label">Why Intern With Us</span>
            <h2 className="section-heading">Not a course. A real career move.</h2>
          </AnimatedSection>

          <div className="grid-3">
            {[
              { icon: <Globe size={24} />, title: 'Live Project Experience', desc: 'Work on real client deliverables. Code that ships, systems that matter, impact you can see.' },
              { icon: <Users size={24} />, title: 'Direct Mentorship', desc: 'Work side-by-side with Gopi and senior engineers. Ask anything, learn everything.' },
              { icon: <Award size={24} />, title: 'Certified & Recommended', desc: 'Performance-based certification and letter of recommendation for your portfolio.' },
            ].map(({ icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.78)',
                    border: '1px solid var(--border)',
                    borderRadius: 22,
                    padding: 36,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,111,255,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 18,
                    background: 'var(--accent-soft)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', margin: '0 auto 20px',
                  }}>
                    {icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAM DETAILS ── */}
      <section className="section">
        <div className="container">
          <div className="split-layout-2-3">
            <AnimatedSection>
              <span className="section-label">Program Details</span>
              <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>Simple. Flexible. Real.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
                {[
                  { icon: <Clock size={18} />, label: 'Duration', value: '1-month to 3-month tracks' },
                  { icon: <Globe size={18} />, label: 'Format', value: 'Online / Remote collaboration' },
                  { icon: <Users size={18} />, label: 'Mentorship', value: 'Direct access to Statbrio engineers' },
                  { icon: <Award size={18} />, label: 'Certificate', value: 'Performance-based certification' },
                  { icon: <CheckCircle2 size={18} />, label: 'LOR', value: 'Letter of Recommendation for top performers' },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{
                    display: 'flex',
                    gap: 14,
                    padding: '16px 20px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    alignItems: 'center',
                  }}>
                    <div style={{ color: 'var(--accent)', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{label}</p>
                      <p style={{ fontSize: 14, fontWeight: 500 }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Domains accordion */}
            <AnimatedSection delay={0.15}>
              <span className="section-label">Domains</span>
              <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', marginBottom: 28 }}>Choose your track.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {domains.map(domain => (
                  <AccordionItem key={domain.id} domain={domain} />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <AnimatedSection style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Apply Now</span>
            <h2 className="section-heading">Start your journey with Statbrio.</h2>
            <p className="section-subheading" style={{ margin: '0 auto' }}>
              Fill out the form below and we'll get back to you within 48 hours.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div style={{ maxWidth: 680, margin: '0 auto', width: '100%' }}>
              <InternshipForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

function InternshipForm() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '',
    domain: '', year: '', linkedin: '', message: '',
  });
  const [status, setStatus] = useState('idle');
  const selectedDomain = domains.find(domain => domain.id === formData.domain);
  const selectedYear = yearOptions.find(option => option.value === formData.year);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!hasInternshipEmailJsConfig) {
      setStatus('configError');
      return;
    }

    setStatus('loading');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_INTERNSHIP_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      formRef.current?.reset();
      setFormData({
        name: '', email: '', phone: '', college: '',
        domain: '', year: '', linkedin: '', message: '',
      });
    } catch (err) {
      console.error('Internship EmailJS error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="responsive-panel"
        style={{
          background: 'rgba(255, 255, 255, 0.78)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 24,
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <CheckCircle2 size={32} color="#10b981" />
        </motion.div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Application Submitted!</h3>
        <p style={{ color: 'var(--text-secondary)' }}>We'll review your application and get back to you within 48 hours.</p>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="form-shell"
    >
      <input type="hidden" name="form_type" value="internship_application" />
      <input type="hidden" name="submission_source" value="internship_page" />
      <input type="hidden" name="domain_title" value={selectedDomain?.title || ''} />
      <input type="hidden" name="year_label" value={selectedYear?.label || ''} />
      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input className="form-input" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input className="form-input" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input className="form-input" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">College / University *</label>
          <input className="form-input" name="college" placeholder="Your institution" value={formData.college} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Internship Domain *</label>
          <select className="form-input" name="domain" value={formData.domain} onChange={handleChange} required>
            <option value="">Select a domain</option>
            {domains.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Current Year *</label>
          <select className="form-input" name="year" value={formData.year} onChange={handleChange} required>
            <option value="">Select year</option>
            {yearOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">LinkedIn / GitHub Profile</label>
        <input className="form-input" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" value={formData.linkedin} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label className="form-label">Why do you want to intern at Statbrio?</label>
        <textarea className="form-input" name="message" rows={4} placeholder="Tell us about your motivation, skills, and what you hope to build..." value={formData.message} onChange={handleChange} />
      </div>

      {(status === 'error' || status === 'configError') && (
        <div style={{
          padding: '12px 16px',
          background: status === 'configError' ? 'rgba(245, 158, 11, 0.10)' : 'rgba(220, 38, 38, 0.08)',
          border: status === 'configError' ? '1px solid rgba(245, 158, 11, 0.22)' : '1px solid rgba(220, 38, 38, 0.2)',
          borderRadius: 10,
          fontSize: 13,
          color: status === 'configError' ? '#b45309' : '#dc2626',
          marginTop: 12,
        }}>
          {status === 'configError'
            ? 'Internship email sending is not configured yet. Add the EmailJS environment values and restart the app.'
            : 'Something went wrong while submitting your application. Please try again or email business@statbrio.com.'}
        </div>
      )}

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="btn-accent"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16, marginTop: 8 }}
      >
        {status === 'loading' ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopcolor: 'var(--text-primary)', borderRadius: '50%' }}
            />
            Submitting...
          </>
        ) : (
          <>Submit Application <ArrowRight size={16} /></>
        )}
      </motion.button>
    </form>
  );
}
