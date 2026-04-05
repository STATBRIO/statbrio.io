import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Stario', path: '/stario' },
  { label: 'Internships', path: '/internships' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg-default)',
          borderBottom: '1px solid',
          borderBottomColor: scrolled ? 'var(--nav-border-scrolled)' : 'var(--nav-border-default)',
          boxShadow: scrolled ? '0 4px 24px rgba(0, 0, 0, 0.08)' : '0 2px 12px rgba(0, 0, 0, 0.04)',
          transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        <div className="container nav-shell" style={{ maxWidth: '100%', padding: '0 clamp(12px, 2vw, 24px)' }}>
          <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>
            <motion.div
              className="nav-brand-icon"
              whileHover={{ scale: 1.08, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <img
                src="/logo-icon.png"
                alt="Statbrio icon"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </motion.div>

            <img src="/logo-text.png" alt="Statbrio" className="nav-brand-text" />
          </Link>

          <nav className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link key={link.path} to={link.path}>
                  <motion.span
                    whileHover={{ color: '#00d8ff' }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 16px',
                      borderRadius: 10,
                      fontSize: 14.5,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--nav-active)' : 'var(--nav-text)',
                      transition: 'color 0.2s ease',
                      position: 'relative',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        style={{
                          position: 'absolute',
                          bottom: 2,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: 'var(--nav-active)',
                          boxShadow: '0 0 8px rgba(26, 111, 255, 0.6)',
                          display: 'block',
                        }}
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                border: '1.5px solid rgba(13, 26, 46, 0.12)',
                background: 'rgba(13, 26, 46, 0.05)',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--nav-text)',
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              background: 'rgba(255, 255, 255, 0.92)',
              borderTop: '1px solid rgba(200, 215, 235, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 24px',
              gap: 6,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={link.path}
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    borderRadius: 14,
                    fontSize: 22,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    color: location.pathname === link.path ? 'var(--nav-active)' : 'var(--nav-text)',
                    background: location.pathname === link.path ? 'rgba(26, 111, 255, 0.07)' : 'transparent',
                    borderLeft: location.pathname === link.path ? '2px solid var(--nav-active)' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
