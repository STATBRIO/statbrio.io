import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, CheckCircle2, Clock, Send } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';

// ── IMPORTANT: Replace these with your actual EmailJS credentials ──
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID?.trim() || '';
const EMAILJS_CONTACT_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID?.trim() ||
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID?.trim() ||
  '';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY?.trim() || '';
const hasEmailJsConfig = [EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, EMAILJS_PUBLIC_KEY].every(
  value => value && !value.startsWith('YOUR_')
);

const contactInfo = [
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'business@statbrio.com',
    href: 'mailto:business@statbrio.com',
    color: '#0057ff',
  },
  {
    icon: <Phone size={22} />,
    label: 'Phone (Primary)',
    value: '+91 9080435866',
    href: 'tel:+919080435866',
    color: '#059669',
  },
  {
    icon: <Phone size={22} />,
    label: 'Phone (Secondary)',
    value: '+91 63799 65742',
    href: 'tel:+916379965742',
    color: '#059669',
  },
  {
    icon: <Phone size={22} />,
    label: 'Phone (Alternate)',
    value: '+91 8072058115',
    href: 'tel:+918072058115',
    color: '#059669',
  },
  {
    icon: <MapPin size={22} />,
    label: 'Location',
    value: 'Walajapet, Tamil Nadu 632513',
    href: 'https://maps.app.goo.gl/kLwRXUxGD6BpS6RY8',
    color: '#dc2626',
  },
];

const serviceOptions = [
  { value: 'ai', label: 'AI Agents & ML' },
  { value: 'web', label: 'Full Stack Development' },
  { value: 'leadgen', label: 'Lead Generation' },
  { value: 'stario', label: 'Stario Voice Agent' },
  { value: 'saas', label: 'SaaS Development' },
  { value: 'iot', label: 'IoT Solutions' },
  { value: 'analytics', label: 'Data Analysis' },
  { value: 'other', label: 'Other / Not Sure' },
];

const budgetOptions = [
  { value: '<50k', label: 'Under Rs50,000' },
  { value: '50k-2l', label: 'Rs50K - Rs2L' },
  { value: '2l-5l', label: 'Rs2L - Rs5L' },
  { value: '5l+', label: 'Rs5L+' },
  { value: 'discuss', label: "Let's Discuss" },
];

const faqs = [
  { q: 'How long does a typical project take?', a: 'Depends on scope, but we pride ourselves on speed. Small projects: 1–2 weeks. Mid-scale apps: 4–8 weeks. Enterprise systems: 2–4 months.' },
  { q: 'Do you work with international clients?', a: 'Absolutely. We work asynchronously across time zones. All communication is handled through Slack, Notion, and weekly video calls.' },
  { q: 'What does "zero infrastructure cost" mean?', a: 'We architect solutions to run on free tiers, serverless, or your existing infrastructure — significantly reducing your ongoing operational costs.' },
  { q: 'Can we start with a small MVP?', a: 'That\'s actually our preferred way to start. Build, validate, then scale. We help you find the minimum loveable product.' },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        border: `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          fontFamily: 'var(--font-body)',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          style={{ color: open ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0, fontSize: 22, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <p style={{ padding: '0 24px 20px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const initialFormState = {
    from_name: '',
    from_email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  };
  const [formData, setFormData] = useState({
    ...initialFormState,
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | configError
  const selectedService = serviceOptions.find(option => option.value === formData.service);
  const selectedBudget = budgetOptions.find(option => option.value === formData.budget);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!hasEmailJsConfig) {
      setStatus('configError');
      return;
    }

    setStatus('loading');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setFormData(initialFormState);
      formRef.current?.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <Seo
        title="Contact Statbrio"
        description="Talk to Statbrio about AI agents, full-stack apps, lead generation, SaaS products, IoT solutions, and data analysis."
        keywords="Contact Statbrio, AI consulting Tamil Nadu, software project inquiry, automation company contact"
      />
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <span className="section-label">Contact</span>
            <h1 style={{
              fontSize: 'clamp(44px, 7vw, 80px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              maxWidth: 700,
              marginBottom: 24,
            }}>
              Let's start a conversation.
            </h1>
            <p style={{
              fontSize: 19,
              color: 'var(--text-secondary)',
              fontWeight: 300,
              lineHeight: 1.65,
              maxWidth: 520,
            }}>
              Whether you have a clear brief or just a vague idea we love both. Reach out and let's figure it out together.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section style={{ paddingBottom: 'clamp(72px, 8vw, 120px)' }}>
        <div className="container">
          <div className="split-layout-wide">
            {/* Contact info */}
            <AnimatedSection>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                {contactInfo.map(({ icon, label, value, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 22px',
                      background: 'rgba(255, 255, 255, 0.78)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                      textDecoration: 'none',
                      transition: 'box-shadow 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = `0 4px 20px ${color}20`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color, flexShrink: 0,
                    }}>
                      {icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                      <p style={{ fontSize: 14, fontWeight: 500 }}>{value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/919080435866"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '16px 24px',
                  background: '#25D366',
                  color: '#ffffff',
                  borderRadius: 16,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginBottom: 32,
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)',
                }}
              >
                <MessageCircle size={20} />
                Message us on WhatsApp
              </motion.a>

              {/* Response time */}
              <div style={{
                padding: '16px 20px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <Clock size={16} color="var(--accent)" />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>Typical response time</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Within 4–8 business hours</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection delay={0.15}>
              <div className="form-shell">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
                  Send us a message
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 36 }}>
                  Tell us about your project and we'll craft the perfect approach.
                </p>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: 'center', padding: '40px 0' }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, delay: 0.15 }}
                        style={{
                          width: 64, height: 64, borderRadius: '50%',
                          background: 'rgba(16, 185, 129, 0.15)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 20px',
                        }}
                      >
                        <CheckCircle2 size={32} color="#10b981" />
                      </motion.div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Message sent!</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 4–8 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                    >
                      <input type="hidden" name="form_type" value="business_contact" />
                      <input type="hidden" name="submission_source" value="contact_page" />
                      <input type="hidden" name="service_label" value={selectedService?.label || ''} />
                      <input type="hidden" name="budget_label" value={selectedBudget?.label || ''} />
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Your Name *</label>
                          <input
                            className="form-input"
                            name="from_name"
                            placeholder="Full name"
                            value={formData.from_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email *</label>
                          <input
                            className="form-input"
                            name="from_email"
                            type="email"
                            placeholder="you@company.com"
                            value={formData.from_email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company / Organization</label>
                        <input
                          className="form-input"
                          name="company"
                          placeholder="Where do you work?"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Service Needed</label>
                          <select className="form-input" name="service" value={formData.service} onChange={handleChange}>
                            <option value="">Select a service</option>
                            {serviceOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Budget Range</label>
                          <select className="form-input" name="budget" value={formData.budget} onChange={handleChange}>
                            <option value="">Select range</option>
                            <option value="<50k">Under ₹50,000</option>
                            <option value="50k-2l">₹50K – ₹2L</option>
                            <option value="2l-5l">₹2L – ₹5L</option>
                            <option value="5l+">₹5L+</option>
                            <option value="discuss">Let's Discuss</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Tell us about your project *</label>
                        <textarea
                          className="form-input"
                          name="message"
                          rows={5}
                          placeholder="Describe your project, goals, timeline, or anything that helps us understand what you're building..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          style={{ minHeight: 140 }}
                        />
                      </div>

                      {(status === 'error' || status === 'configError') && (
                        <div style={{
                          padding: '12px 16px',
                          background: status === 'configError' ? 'rgba(245, 158, 11, 0.10)' : 'rgba(220, 38, 38, 0.08)',
                          border: status === 'configError' ? '1px solid rgba(245, 158, 11, 0.22)' : '1px solid rgba(220, 38, 38, 0.2)',
                          borderRadius: 10,
                          fontSize: 13,
                          color: status === 'configError' ? '#b45309' : '#dc2626',
                          marginBottom: 16,
                        }}>
                          {status === 'configError'
                            ? 'Email sending is not configured yet. Add your EmailJS values to the environment file and restart the app.'
                            : 'Something went wrong. Please email us directly at business@statbrio.com'}
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-accent"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16 }}
                      >
                        {status === 'loading' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopcolor: 'var(--text-primary)', borderRadius: '50%' }}
                            />
                            Sending...
                          </>
                        ) : (
                          <><Send size={16} /> Send Message</>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: 0 }}>
        <div className="container">
          <AnimatedSection style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>FAQ</span>
            <h2 className="section-heading">Things people usually ask.</h2>
          </AnimatedSection>
          <div className="faq-list">
            {faqs.map(({ q, a }) => (
              <AnimatedSection key={q}>
                <FaqItem q={q} a={a} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
