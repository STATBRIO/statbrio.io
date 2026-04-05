import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Bot, Code2, Globe, Database, Cpu,
  ArrowRight, CheckCircle2, Workflow, Smartphone,
  ShoppingBag, BarChart3, LineChart
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';

const serviceCategories = [
  {
    id: 'ai',
    label: 'AI Agents & ML',
    icon: <Bot size={18} />,
    color: '#0057ff',
    headline: 'AI systems built to automate real work',
    desc: 'We design task-focused AI systems that help your team respond faster, operate smarter, and scale support without extra overhead.',
    services: [
      {
        icon: <Bot size={22} />,
        title: 'Business AI Agents',
        desc: 'Task-oriented AI agents for support, operations, internal knowledge, and customer engagement workflows.',
        features: ['24/7 automated responses', 'Knowledge base grounding', 'CRM and API integrations', 'Role-specific agent design'],
      },
      {
        icon: <Workflow size={22} />,
        title: 'ML Workflows & Automation',
        desc: 'Custom machine learning flows and automation pipelines that turn repetitive decisions into reliable systems.',
        features: ['Model-backed workflows', 'Document and data automation', 'Monitoring and evaluation', 'Human-in-the-loop controls'],
      },
    ],
  },
  {
    id: 'dev',
    label: 'Full Stack Dev',
    icon: <Code2 size={18} />,
    color: '#7c3aed',
    headline: 'Full-stack products engineered for growth',
    desc: 'From polished interfaces to reliable backend systems, we build modern products that feel fast, stable, and ready to scale.',
    services: [
      {
        icon: <Code2 size={22} />,
        title: 'Web Platforms & Dashboards',
        desc: 'Responsive, conversion-ready applications for customer portals, internal dashboards, and business platforms.',
        features: ['React and Next.js builds', 'Secure API integrations', 'Admin dashboards', 'Performance-focused delivery'],
      },
      {
        icon: <Smartphone size={22} />,
        title: 'Mobile & Internal Tools',
        desc: 'Mobile experiences and operator tools designed to keep your teams and users productive on the go.',
        features: ['Cross-platform delivery', 'Push notifications', 'Offline-friendly architecture', 'Deployment support'],
      },
    ],
  },
  {
    id: 'leadgen',
    label: 'Lead Generation',
    icon: <Database size={18} />,
    color: '#059669',
    headline: 'Lead generation systems that keep your pipeline moving',
    desc: 'We build practical lead generation workflows that help you discover, capture, qualify, and route prospects faster.',
    services: [
      {
        icon: <Globe size={22} />,
        title: 'Prospect Research & Sourcing',
        desc: 'Structured prospect discovery workflows for targeted outreach, regional campaigns, and niche market expansion.',
        features: ['ICP-based lead sourcing', 'Segmented lead lists', 'Contact enrichment support', 'Campaign-ready exports'],
      },
      {
        icon: <ShoppingBag size={22} />,
        title: 'Lead Capture & Qualification',
        desc: 'Capture inbound interest, validate prospect fit, and pass ready-to-convert leads into your sales workflow.',
        features: ['Landing page capture flows', 'Form and CRM integration', 'Lead scoring logic', 'Automated follow-up triggers'],
      },
    ],
  },
  {
    id: 'saas',
    label: 'SaaS Development',
    icon: <Database size={18} />,
    color: '#d97706',
    headline: 'SaaS products shaped for launch and scale',
    desc: 'We help teams turn ideas into SaaS products with stable architecture, clean UX, and delivery practices built for iteration.',
    services: [
      {
        icon: <ShoppingBag size={22} />,
        title: 'SaaS MVPs & Product Builds',
        desc: 'Launch-ready SaaS experiences for startups and teams validating a new product, workflow, or platform concept.',
        features: ['Product scoping', 'Multi-user architecture', 'Billing-ready foundations', 'Rapid iteration cycles'],
      },
      {
        icon: <Database size={22} />,
        title: 'Scaling, Maintenance & Enhancements',
        desc: 'Strengthen your SaaS stack with new modules, workflow upgrades, and the operational support needed to grow confidently.',
        features: ['Feature expansion', 'Role and permission systems', 'DevOps and release support', 'Long-term product maintenance'],
      },
    ],
  },
  {
    id: 'iot',
    label: 'IoT Solutions',
    icon: <Cpu size={18} />,
    color: '#dc2626',
    headline: 'Connected systems that make operations visible',
    desc: 'We bridge devices and software so you can monitor physical environments, automate actions, and react in real time.',
    services: [
      {
        icon: <Cpu size={22} />,
        title: 'Connected Device Systems',
        desc: 'IoT implementations for operational visibility, machine data collection, and smart workflow activation.',
        features: ['Sensor integration', 'Device communication layers', 'Cloud data streaming', 'Custom control logic'],
      },
      {
        icon: <Workflow size={22} />,
        title: 'Monitoring & Alert Dashboards',
        desc: 'Real-time dashboards and alert systems that turn field data into decisions your team can act on quickly.',
        features: ['Live status dashboards', 'Threshold-based alerts', 'Historical event tracking', 'Remote monitoring views'],
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Data Analysis',
    icon: <BarChart3 size={18} />,
    color: '#0891b2',
    headline: 'Data analysis that turns activity into insight',
    desc: 'We help teams organize, analyze, and present data so leaders can move from assumptions to measurable decisions.',
    services: [
      {
        icon: <LineChart size={22} />,
        title: 'Analytics Dashboards & Reporting',
        desc: 'Interactive reports and business dashboards built to highlight trends, bottlenecks, and performance opportunities.',
        features: ['KPI dashboard design', 'Automated reporting', 'Cross-source data views', 'Executive summaries'],
      },
      {
        icon: <BarChart3 size={22} />,
        title: 'Market Research & Insights',
        desc: 'Research support that helps you evaluate demand, track competitors, and surface practical opportunities.',
        features: ['Competitor analysis support', 'Trend and market summaries', 'Survey and response analysis', 'Insight-ready deliverables'],
      },
    ],
  },
];

export default function Services() {
  const categoryIds = useMemo(() => serviceCategories.map(c => c.id), []);
  const [activeTab, setActiveTab] = useState('ai');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [tabBarHeight, setTabBarHeight] = useState(58);
  const [stickyTop, setStickyTop] = useState(() => {
    const navHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim()) || 72;
    return navHeight + 82;
  });
  const sectionRefs = useRef([]);
  const tabsRef = useRef(null);
  const activeTabRef = useRef(activeTab);
  const active = serviceCategories.find(c => c.id === activeTab) || serviceCategories[0];
  const location = useLocation();
  // Track whether we initiated a programmatic scroll so the observer doesn't fight us
  const isScrollingRef = useRef(false);

  const getNavHeight = () => {
    const rawValue = getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim();
    const parsedValue = Number.parseFloat(rawValue);
    return Number.isFinite(parsedValue) ? parsedValue : 72;
  };

  const mobileScrollMarginTop = `calc(var(--nav-height) + ${tabBarHeight + 24}px)`;

  useEffect(() => {
    const measureStickyTop = () => {
      const navHeight = getNavHeight();
      const tabsHeight = tabsRef.current?.offsetHeight || 58;
      setStickyTop(navHeight + tabsHeight + 20);
    };

    measureStickyTop();
    window.addEventListener('resize', measureStickyTop);
    return () => window.removeEventListener('resize', measureStickyTop);
  }, []);

  // Scroll to a section by id, using getBoundingClientRect for accuracy
  const scrollToSection = useCallback((id, behavior = 'smooth') => {
    const index = categoryIds.indexOf(id);
    if (index === -1) return;

    const doScroll = (retries = 0) => {
      const section = sectionRefs.current[index];
      if (!section) {
        if (retries < 10) setTimeout(() => doScroll(retries + 1), 80);
        return;
      }
      const navHeight = getNavHeight();
      const tabsHeight = (tabsRef.current?.offsetHeight || 58) + 8;
      const offset = navHeight + tabsHeight;
      const rect = section.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top - offset;
      isScrollingRef.current = true;
      window.scrollTo({ top: Math.max(absoluteTop, 0), behavior });
      setTimeout(() => { isScrollingRef.current = false; }, 800);
    };

    setActiveTab(id);
    activeTabRef.current = id;
    doScroll();
  }, [categoryIds]);

  // Handle hash from URL (initial load + React Router navigation)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && categoryIds.includes(hash)) {
      // Delay to allow page render + route animation to settle
      setTimeout(() => scrollToSection(hash, 'smooth'), 350);
    }
  }, [location.hash, categoryIds, scrollToSection]);

  // Also handle native hashchange (e.g. browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && categoryIds.includes(hash)) {
        setTimeout(() => scrollToSection(hash, 'smooth'), 100);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [categoryIds, scrollToSection]);

  useEffect(() => {
    if (isMobile) return;

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

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

    const sections = sectionRefs.current.filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio > 0.1)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          const nextId = visibleSections[0].target.dataset.serviceSection;
          if (nextId && nextId !== activeTabRef.current) {
            setActiveTab(nextId);
          }
        }
      },
      {
        rootMargin: `-${stickyTop + 20}px 0px -30% 0px`,
        threshold: [0.1, 0.3, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isMobile, stickyTop]);

  useEffect(() => {
    if (!isMobile) return;

    const panels = sectionRefs.current.filter(Boolean);
    if (!panels.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visiblePanels = entries
        .filter(entry => entry.isIntersecting)
        .sort((panelA, panelB) => panelB.intersectionRatio - panelA.intersectionRatio);

      const nextId = visiblePanels[0]?.target.dataset.serviceSection;
      if (nextId && nextId !== activeTabRef.current) {
        setActiveTab(nextId);
      }
    }, {
      threshold: [0.2, 0.38, 0.6, 0.78],
      rootMargin: '-18% 0px -38% 0px',
    });

    panels.forEach(panel => observer.observe(panel));
    return () => observer.disconnect();
  }, [isMobile]);

  const scrollToCategory = (id) => {
    scrollToSection(id, 'smooth');
  };

  const renderCategoryContent = (category) => (
    <>
      <div className="service-header" style={{
        background: `linear-gradient(135deg, ${category.color}10, transparent)`,
        border: `1px solid ${category.color}25`,
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px',
            background: `${category.color}18`,
            border: `1px solid ${category.color}30`,
            borderRadius: 100,
            fontSize: 12, fontWeight: 500,
            fontFamily: 'var(--font-mono)',
            color: category.color,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 16,
          }}>
            {category.icon}
            {category.label}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}>
            {category.headline}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, fontWeight: 300, lineHeight: 1.6 }}>
            {category.desc}
          </p>
        </div>
        <Link to="/contact">
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ whiteSpace: 'nowrap' }}
          >
            Get a Quote <ArrowRight size={15} />
          </motion.button>
        </Link>
      </div>

      <div className={`service-card-grid ${category.services.length > 2 ? 'three-up' : 'two-up'}`}>
        {category.services.map((svc, i) => (
          <motion.div
            key={svc.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            style={{
              background: 'rgba(255, 255, 255, 0.78)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: 32,
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 8px 32px ${category.color}20`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: 48, height: 48,
              borderRadius: 14,
              background: `${category.color}18`,
              border: `1px solid ${category.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: category.color,
              marginBottom: 20,
            }}>
              {svc.icon}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 10 }}>
              {svc.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              {svc.desc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {svc.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                  <CheckCircle2 size={14} color={category.color} style={{ flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );

  const renderActivePanel = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        ref={desktopPanelRef}
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.985 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {renderCategoryContent(active)}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <Seo
        title="AI, Development, Lead Generation & Analytics Services"
        description="Explore Statbrio services across AI agents, full-stack development, lead generation, SaaS, IoT, and data analysis."
        keywords="AI agents services, full stack development, lead generation services, SaaS development, IoT solutions, data analysis"
      />
      <section className="dot-grid page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, transparent 50%, var(--bg-primary) 100%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <AnimatedSection>
            <span className="section-label">Services</span>
            <h1 style={{
              fontSize: 'clamp(44px, 7vw, 80px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              maxWidth: 760,
              marginBottom: 24,
            }}>
              Six capabilities. <span className="gradient-text">Infinite possibilities.</span>
            </h1>
            <p style={{
              fontSize: 19,
              color: 'var(--text-secondary)',
              fontWeight: 300,
              lineHeight: 1.65,
              maxWidth: 580,
            }}>
              From AI agents to IoT systems - each service is engineered for real impact, not just delivery.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section ref={tabsRef} style={{ position: 'sticky', top: 'var(--nav-height)', zIndex: 100, background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 4, padding: '12px 0', overflowX: 'auto' }}>
            {serviceCategories.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)',
                  cursor: 'pointer',
                  border: 'none',
                  whiteSpace: 'nowrap',
                  background: activeTab === cat.id ? cat.color : 'transparent',
                  color: activeTab === cat.id ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ color: activeTab === cat.id ? '#fff' : cat.color }}>{cat.icon}</span>
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container" style={{ width: '100%' }}>
          <div style={{ display: 'grid', gap: 24 }}>
            {serviceCategories.map((category, index) => (
              <AnimatedSection key={category.id} delay={Math.min(index * 0.06, 0.18)}>
                <article
                  ref={node => { sectionRefs.current[index] = node; }}
                  data-service-section={category.id}
                  style={{
                    scrollMarginTop: mobileScrollMarginTop,
                    paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
                  }}
                >
                  {renderCategoryContent(category)}
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: 0 }}>
        <div className="container">
          <AnimatedSection>
            <div className="form-shell" style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 5vw, 40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
                Not sure what you need?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, marginBottom: 36, fontWeight: 300 }}>
                Let&apos;s have a conversation. We&apos;ll figure out the right solution together.
              </p>
              <Link to="/contact">
                <motion.button className="btn-accent" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Book a Free Consultation <ArrowRight size={15} />
                </motion.button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
