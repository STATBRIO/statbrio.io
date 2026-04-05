import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Stario', path: '/stario' },
  { label: 'Internships', path: '/internships' },
  { label: 'Contact', path: '/contact' },
];

const serviceLinks = [
  { label: 'AI Agents & ML', path: '/services#ai' },
  { label: 'Full Stack Dev', path: '/services#dev' },
  { label: 'Lead Generation', path: '/services#leadgen' },
  { label: 'SaaS Development', path: '/services#saas' },
  { label: 'IoT Solutions', path: '/services#iot' },
  { label: 'Data Analysis', path: '/services#analytics' },
];

export default function Footer() {
  const location = useLocation();

  const handleServiceClick = (e, path) => {
    const [pagePath, hash] = path.split('#');
    if (location.pathname === pagePath && hash) {
      e.preventDefault();
      // Already on /services — dispatch hashchange to trigger Services scroll logic
      window.history.pushState(null, '', `${pagePath}#${hash}`);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
    // else: let normal Link navigation happen (ScrollToTop will not scroll to top due to hash)
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      paddingTop: 80,
    }}>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 0, textDecoration: 'none', marginBottom: 20 }}>
              <img
                src="./logo-icon.png"
                alt="Statbrio icon"
                style={{ height: 38, width: 'auto', display: 'block', borderRadius: 12, boxShadow: '0 8px 22px rgba(13,26,60,0.08)' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <img
                src="./logo-text.png"
                alt="Statbrio"
                style={{ height: 22, width: 'auto', display: 'block' }}
                onError={e => {
                  const span = document.createElement('span');
                  span.textContent = 'Statbrio';
                  span.style.cssText = 'font-family: var(--font-display); font-weight: 800; font-size: 22px; letter-spacing: -0.04em; color: var(--text-primary); margin-left: 8px;';
                  e.target.replaceWith(span);
                }}
              />
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, maxWidth: 300, marginBottom: 28 }}>
              Walajapet-based AI solutions company building intelligent software, lead generation systems, analytics, and automation for forward-thinking businesses.
            </p>
            <motion.a
              href="https://wa.me/919080435866"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                background: '#25D366',
                color: '#fff',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </motion.a>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>Pages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>Services</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {serviceLinks.map(s => (
                <Link
                  key={s.label}
                  to={s.path}
                  onClick={(e) => handleServiceClick(e, s.path)}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: 14,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="mailto:business@statbrio.com" style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                color: 'var(--text-secondary)',
                fontSize: 14,
                textDecoration: 'none',
              }}>
                <Mail size={15} style={{ marginTop: 2, flexShrink: 0, color: 'var(--accent)' }} />
                business@statbrio.com
              </a>
              <a href="tel:+919080435866" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'var(--text-secondary)',
                fontSize: 14,
                textDecoration: 'none',
              }}>
                <Phone size={15} style={{ flexShrink: 0, color: 'var(--accent)' }} />
                +91 9080435866
              </a>
              <a href="tel:+916379965742" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'var(--text-secondary)',
                fontSize: 14,
                textDecoration: 'none',
              }}>
                <Phone size={15} style={{ flexShrink: 0, color: 'var(--accent)' }} />
                +91 63799 65742
              </a>
              <a href="tel:+918072058115" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'var(--text-secondary)',
                fontSize: 14,
                textDecoration: 'none',
              }}>
                <Phone size={15} style={{ flexShrink: 0, color: 'var(--accent)' }} />
                +91 8072058115
              </a>
              <a
                href="https://maps.app.goo.gl/kLwRXUxGD6BpS6RY8"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  color: 'var(--text-secondary)',
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                <MapPin size={15} style={{ marginTop: 2, flexShrink: 0, color: 'var(--accent)' }} />
                Walajapet, Tamil Nadu 632513
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{
          borderTop: '1px solid var(--border)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            (c) {new Date().getFullYear()} Statbrio Technologies. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Built in Walajapet, Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
