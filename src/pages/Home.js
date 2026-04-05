import React, { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Bot, Code2, Database, Cpu, LineChart,
  Globe, Mic, Star, CheckCircle2, TrendingUp, Shield,
  Zap, Users, Award, Clock
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';

/* ─────────────────────────────────────────
   SPARKLE WAVE CANVAS — flowing light sparkles
───────────────────────────────────────── */
const SparkleWave = memo(function SparkleWave() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let isVisible = !document.hidden;

    const resize = () => {
      // Use the parent container's dimensions so canvas always has a real size
      const parent = canvas.parentElement;
      const w = parent ? parent.offsetWidth : window.innerWidth;
      const h = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width = w || window.innerWidth;
      canvas.height = h || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const sparkles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      driftX: Math.random() * 1.5 + 0.5,
      driftY: -(Math.random() * 1 + 0.2),
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      if (!isVisible) return;
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waveSets = [
        { y: canvas.height * 0.76, amp: 34, width: 1.2, alpha: 0.18, blur: 20, speed: 1, colorA: 'rgba(75, 153, 255, 0.9)', colorB: 'rgba(160, 224, 255, 0.12)' },
        { y: canvas.height * 0.72, amp: 26, width: 1.5, alpha: 0.14, blur: 16, speed: 1.4, colorA: 'rgba(32, 127, 255, 0.85)', colorB: 'rgba(140, 215, 255, 0.1)' },
        { y: canvas.height * 0.68, amp: 18, width: 1.8, alpha: 0.1, blur: 12, speed: 1.8, colorA: 'rgba(0, 195, 255, 0.75)', colorB: 'rgba(180, 240, 255, 0.08)' },
      ];

      waveSets.forEach((wave, index) => {
        const gradient = ctx.createLinearGradient(0, wave.y, canvas.width, wave.y);
        gradient.addColorStop(0, wave.colorB);
        gradient.addColorStop(0.25, wave.colorA);
        gradient.addColorStop(0.6, 'rgba(255,255,255,0.55)');
        gradient.addColorStop(1, wave.colorB);

        ctx.beginPath();
        ctx.moveTo(-40, canvas.height);
        for (let x = -40; x <= canvas.width + 40; x += 8) {
          const y = wave.y
            + Math.sin((x * 0.0095) + (t * wave.speed * 1.8) + index) * wave.amp
            + Math.sin((x * 0.0035) + (t * wave.speed * 0.9)) * (wave.amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width + 40, canvas.height);
        ctx.closePath();

        ctx.save();
        ctx.globalAlpha = wave.alpha;
        ctx.fillStyle = gradient;
        ctx.shadowBlur = wave.blur;
        ctx.shadowColor = 'rgba(77, 165, 255, 0.35)';
        ctx.fill();
        ctx.restore();
      });

      sparkles.forEach(s => {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x > canvas.width + 24) s.x = -12;
        if (s.y < -24) s.y = canvas.height + 12;
        const pulse = s.alpha * (0.55 + 0.45 * Math.sin((t * 2) + s.phase));
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 8);
        glow.addColorStop(0, `rgba(255,255,255,${pulse})`);
        glow.addColorStop(0.35, `rgba(170,225,255,${pulse * 0.8})`);
        glow.addColorStop(1, 'rgba(170,225,255,0)');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      cancelAnimationFrame(animId);
      if (isVisible) draw();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9, pointerEvents: 'none' }}
    />
  );
});

const glassKpiCardStyle = {
  position: 'absolute',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.34) 100%)',
  backdropFilter: 'blur(28px) saturate(170%)',
  WebkitBackdropFilter: 'blur(28px) saturate(170%)',
  border: '1px solid rgba(255,255,255,0.86)',
  boxShadow: '0 22px 52px rgba(91, 144, 220, 0.16), 0 6px 18px rgba(122, 176, 233, 0.14), inset 0 1px 0 rgba(255,255,255,0.76)',
};

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Counter({ target, suffix = '', duration = 1800, decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const progress = Math.min((Date.now() - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = ease * target;
          setVal(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────────────────────────
   KPI CARDS — Light glass style matching reference
───────────────────────────────────────── */
function KpiGrowthCard({ delay = 0, style = {} }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let c = 0;
      const interval = setInterval(() => {
        c += 1;
        setCount(c);
        if (c >= 41) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000 + 800);
    return () => clearTimeout(t);
  }, [delay]);

  const bars = [40, 60, 45, 80, 55, 90, 70];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delay + 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...glassKpiCardStyle,
        borderRadius: 20,
        padding: '16px 18px',
        minWidth: 182,
        animation: `kpi-float-a ${3.5 + delay}s ease-in-out infinite`,
        animationDelay: `${delay * 0.4}s`,
        ...style,
      }}
    >
      <p style={{ fontSize: 11, color: 'rgba(13,26,60,0.62)', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 6, letterSpacing: '0.01em' }}>AI% Growth</p>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 28, fontWeight: 800,
        color: '#1a6fff',
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {count}%
      </p>
      {/* Animated bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: delay + 1.1 + i * 0.08, duration: 0.5, ease: 'backOut' }}
            style={{
              flex: 1,
              height: `${h}%`,
              background: i === 5
                ? 'linear-gradient(180deg, #1a6fff 0%, #00b4ff 100%)'
                : 'rgba(26, 111, 255, 0.18)',
              borderRadius: '3px 3px 0 0',
              transformOrigin: 'bottom',
              boxShadow: i === 5 ? '0 0 8px rgba(26,111,255,0.45)' : 'none',
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: 10, color: 'rgba(13,26,60,0.38)', marginTop: 6, fontFamily: 'var(--font-body)' }}>project momentum</p>
    </motion.div>
  );
}

function KpiGrowthBadge({ delay = 0, style = {} }) {
  const [num, setNum] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let c = 0;
      const iv = setInterval(() => {
        c += 1; setNum(c);
        if (c >= 45) clearInterval(iv);
      }, 28);
      return () => clearInterval(iv);
    }, delay * 1000 + 1200);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: 24 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: delay + 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...glassKpiCardStyle,
        borderRadius: 18,
        padding: '16px 18px',
        minWidth: 132,
        animation: `kpi-float-b ${4 + delay * 0.5}s ease-in-out infinite`,
        animationDelay: `${delay * 0.3 + 0.5}s`,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(26,111,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>
          <TrendingUp size={12} color="#1a6fff" />
        </div>
      </div>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 30, fontWeight: 800,
        color: '#0d1a3c', lineHeight: 1,
      }}>
        +{num}%
      </p>
      <p style={{ fontSize: 11, color: 'rgba(13,26,60,0.58)', fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 4 }}>Growth</p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: delay + 1.6, duration: 1.2, ease: 'easeOut' }}
        style={{ height: 3, background: 'linear-gradient(90deg, #1a6fff 0%, #00d8ff 100%)', borderRadius: 2, marginTop: 10 }}
      />
    </motion.div>
  );
}

function KpiDonutCard({ delay = 0, style = {} }) {
  const [efficiency, setEfficiency] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      let c = 0;
      const iv = setInterval(() => {
        c += 1;
        setEfficiency(c);
        if (c >= 5) clearInterval(iv);
      }, 180);
      return () => clearInterval(iv);
    }, delay * 1000 + 1200);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delay + 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...glassKpiCardStyle,
        borderRadius: 18,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        animation: `kpi-float-c ${3.8 + delay * 0.3}s ease-in-out infinite`,
        animationDelay: `${delay * 0.5 + 0.8}s`,
        ...style,
      }}
    >
      <svg width="46" height="46" viewBox="0 0 46 46">
        <circle cx="23" cy="23" r="17" fill="none" stroke="rgba(26,111,255,0.1)" strokeWidth="4" />
        <motion.circle
          cx="23" cy="23" r="17"
          fill="none"
          stroke="url(#donut-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="106.8"
          initial={{ strokeDashoffset: 106.8 }}
          animate={{ strokeDashoffset: 106.8 * 0.5 }}
          transition={{ delay: delay + 1.5, duration: 1.4, ease: 'easeOut' }}
          transform="rotate(-90 23 23)"
        />
        <defs>
          <linearGradient id="donut-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a6fff" />
            <stop offset="100%" stopColor="#00d8ff" />
          </linearGradient>
        </defs>
      </svg>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(180deg, #76bbff 0%, #1a6fff 100%)', boxShadow: '0 0 10px rgba(26,111,255,0.35)' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#0d1a3c', lineHeight: 1 }}>{efficiency}%</p>
        </div>
        <p style={{ fontSize: 10, color: 'rgba(13,26,60,0.58)', fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: 3 }}>Efficiency</p>
      </div>
    </motion.div>
  );
}

function SlantedIceGlow() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute',
        top: '-30%',
        left: '-10%',
        width: '150%',
        height: '60%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(200,230,255,0.4) 50%, rgba(255,255,255,0) 100%)',
        transform: 'rotate(-25deg)',
        transformOrigin: 'top left',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '30%',
        width: 4,
        height: '150%',
        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.9), transparent)',
        transform: 'rotate(65deg)',
        transformOrigin: 'top left',
        boxShadow: '0 0 15px rgba(255,255,255,0.8)',
      }} />
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: 12,
        height: '150%',
        background: 'linear-gradient(to bottom, transparent, rgba(180,225,255,0.4), transparent)',
        transform: 'rotate(65deg)',
        transformOrigin: 'top left',
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: 0,
        width: '100%',
        height: '30%',
        background: 'radial-gradient(ellipse at 70% 100%, rgba(26,150,255,0.15) 0%, transparent 60%)',
        filter: 'blur(30px)',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   ORBIT RINGS — glowing ellipses anchored at mascot base
───────────────────────────────────────── */
function OrbitRings() {
  return (
    <div className="orbit-shell">
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          position: 'absolute',
          left: '50%', top: 'calc(50% - 5px)',
          width: 390 - i * 58,
          height: 56 - i * 8,
          borderRadius: '50%',
          border: `3px solid rgba(120, 205, 255, ${0.86 - i * 0.1})`,
          transform: 'translate(-50%, -50%)',
          boxShadow: `
            0 ${3 + i}px ${18 - i * 2}px rgba(42, 130, 255, ${0.28 - i * 0.03}),
            0 0 ${40 - i * 3}px rgba(82, 185, 255, ${0.5 - i * 0.045}),
            0 0 ${70 - i * 5}px rgba(120, 220, 255, ${0.22 - i * 0.02}),
            inset 0 0 ${18 - i * 2}px rgba(255,255,255,${0.34 - i * 0.03})
          `,
          animation: `ring-pulse ${2.2 + i * 0.28}s ease-in-out infinite`,
          animationDelay: `${i * 0.22}s`,
        }} />
      ))}
      <div style={{
        position: 'absolute',
        left: '50%', top: 'calc(52% - 5px)',
        transform: 'translate(-50%, -50%)',
        width: 300, height: 56,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(125,210,255,0.72) 0%, rgba(70,155,255,0.3) 52%, transparent 84%)',
        filter: 'blur(20px)',
        animation: 'glow-pulse 2.5s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        left: '50%', top: 'calc(50% - 5px)',
        transform: 'translate(-50%, -50%)',
        width: 430, height: 92,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,255,255,0.42) 0%, rgba(125,205,255,0.26) 35%, rgba(70,150,255,0.12) 56%, transparent 76%)',
        filter: 'blur(34px)',
        opacity: 1,
      }} />
      <div style={{
        position: 'absolute',
        left: '50%', top: 'calc(50% + 8px)',
        transform: 'translate(-50%, -50%)',
        width: 370, height: 74,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(40,115,255,0.2) 0%, rgba(25,95,230,0.14) 44%, transparent 76%)',
        filter: 'blur(18px)',
        opacity: 0.9,
      }} />
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 'calc(50% - 5px)',
        width: 420,
        height: 86,
        transform: 'translate(-50%, -50%)',
        animation: 'ring-spin 12s linear infinite',
        pointerEvents: 'none',
      }}>
        {[
          { left: '12%', top: '38%', delay: '0s' },
          { left: '28%', top: '78%', delay: '1.4s' },
          { left: '56%', top: '22%', delay: '0.8s' },
          { left: '82%', top: '58%', delay: '2.1s' },
          { left: '68%', top: '88%', delay: '1.1s' },
        ].map((sparkle, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: sparkle.left,
              top: sparkle.top,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(160,220,255,0.9) 35%, rgba(160,220,255,0) 72%)',
              boxShadow: '0 0 14px rgba(110,190,255,0.55)',
              animation: 'falling-glint 2.8s ease-in-out infinite',
              animationDelay: sparkle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MASCOT WITH RINGS — image + rings anchored at base
───────────────────────────────────────── */
function MascotWithRings() {
  return (
    <div className="mascot-shell">
      <img
        src="./mascot.png"
        alt="Statbrio Mascot"
        className="mascot-image"
      />
      {/* Orbit rings sit right at the base of the mascot */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <OrbitRings />
      </div>
    </div>
  );
}



/* ─────────────────────────────────────────
   COMPETITOR LOGO MARQUEE
   7 placeholder slots — replace src with real logo images
───────────────────────────────────────── */
const MAX_CLIENT_LOGO_PROBE = 100;


/* ─────────────────────────────────────────
   SERVICES BENTO
───────────────────────────────────────── */
const services = [
  { icon: <Bot size={26} />, title: 'AI Agents & ML', desc: 'Custom AI workflows and task-oriented agents to automate complex business problems end-to-end.', size: 'large', color: '#00b4ff' },
  { icon: <Code2 size={22} />, title: 'Full Stack Dev', desc: 'End-to-end web and mobile applications using modern technologies built for scale.', size: 'normal', color: '#7c3aed' },
  { icon: <Globe size={22} />, title: 'Lead Generation', desc: 'Prospect sourcing, lead capture flows, and outreach-ready data to keep your pipeline active.', size: 'normal', color: '#059669' },
  { icon: <Database size={22} />, title: 'SaaS Development', desc: 'Architecture, deployment, and maintenance for scalable cloud platforms.', size: 'normal', color: '#d97706' },
  { icon: <Cpu size={22} />, title: 'IoT Solutions', desc: 'Smart systems with connected devices and real-time data monitoring.', size: 'normal', color: '#dc2626' },
  { icon: <LineChart size={22} />, title: 'Data Analysis', desc: 'Dashboards, reporting, and market analysis that turn raw data into clear business decisions.', size: 'large', color: '#0891b2' },
];

function renderVoiceFeatureIcon(label) {
  if (label === 'Natural Voice') return <Mic size={14} />;
  if (label === 'Multi-Language') return <Globe size={14} />;
  if (label === 'Industry Tuned') return <Cpu size={14} />;
  return <Clock size={14} />;
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
export default function Home() {
  const [clientLogos, setClientLogos] = useState([]);
  const [marqueeShift, setMarqueeShift] = useState(0);
  const [marqueeRepeatCount, setMarqueeRepeatCount] = useState(4);
  const marqueeViewportRef = useRef(null);
  const marqueeMeasureRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    const probeClientLogo = (index) => new Promise(resolve => {
      const img = new Image();
      const src = `./Client-${index}.png`;

      img.onload = () => resolve({ id: index, label: `Client ${index}`, img: src });
      img.onerror = () => resolve(null);
      img.src = src;
    });

    const loadClientLogos = async () => {
      const results = [];

      for (let index = 1; index <= MAX_CLIENT_LOGO_PROBE; index += 1) {
        const logo = await probeClientLogo(index);
        if (!isActive) return;

        if (!logo) {
          if (results.length > 0) break;
          continue;
        }

        results.push(logo);
      }

      setClientLogos(results);
    };

    loadClientLogos();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (clientLogos.length === 0) return undefined;

    const measureMarquee = () => {
      const viewportWidth = marqueeViewportRef.current?.offsetWidth ?? 0;
      const baseWidth = marqueeMeasureRef.current?.scrollWidth ?? 0;

      if (!viewportWidth || !baseWidth) return;

      const nextRepeatCount = Math.max(4, Math.ceil((viewportWidth + baseWidth) / baseWidth) + 1);
      setMarqueeShift(baseWidth);
      setMarqueeRepeatCount(nextRepeatCount);
    };

    measureMarquee();
    window.addEventListener('resize', measureMarquee);

    let resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(measureMarquee);
      if (marqueeViewportRef.current) resizeObserver.observe(marqueeViewportRef.current);
      if (marqueeMeasureRef.current) resizeObserver.observe(marqueeMeasureRef.current);
    }

    return () => {
      window.removeEventListener('resize', measureMarquee);
      resizeObserver?.disconnect();
    };
  }, [clientLogos]);

  const marqueeDuration = marqueeShift > 0
    ? Math.max(18, marqueeShift / 55)
    : 24;

  return (
    <div>
      <Seo
        title="AI Solutions & Business Automation"
        description="Statbrio builds AI agents, lead generation systems, SaaS products, analytics, and digital growth solutions for modern businesses."
        keywords="Statbrio, AI automation, lead generation, data insights, AI solutions Tamil Nadu, web development company"
      />
      {/* ══════════════════════════════════
          HERO SECTION
      ══════════════════════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* ── Light gradient background matching reference ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #f4f7ff 0%, #e8f0fe 25%, #f5f8ff 55%, #eef3ff 100%)',
        }} />

        {/* Subtle radial blue glows */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 75% 55%, rgba(60, 130, 255, 0.13) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(0, 100, 220, 0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 0%, rgba(100, 160, 255, 0.09) 0%, transparent 45%)
          `,
        }} />

        {/* SparkleWave — flowing animated sparkles */}
        <SlantedIceGlow />
        <SparkleWave />

        <motion.div
          className="container"
          style={{
            position: 'relative', zIndex: 2,
            width: '100%',
          }}
        >
          <div className="home-hero-grid">

            {/* ── LEFT: Text content ── */}
            <div className="home-hero-copy">

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 'clamp(44px, 5vw, 72px)',
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 800,
                  lineHeight: 1.06,
                  letterSpacing: '-1px',
                  marginBottom: 0,
                }}
              >
                <span style={{ color: '#0d1a3c', display: 'block' }}>Smarter Decisions.</span>
                <span style={{
                  display: 'block',
                  marginTop: 6,
                  background: 'linear-gradient(90deg, #1a6fff 0%, #00b4ff 60%, #00d8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Faster Growth.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                style={{
                  fontSize: 18,
                  color: '#4a5568',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: 460,
                  marginTop: 24,
                  marginBottom: 36,
                }}
              >
                Statbrio helps you analyze, automate, and scale your business with powerful data insights.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 12px 36px rgba(26,111,255,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'linear-gradient(135deg, #1a6fff 0%, #0052e0 100%)',
                      color: '#ffffff',
                      padding: '16px 36px',
                      borderRadius: 14,
                      fontSize: 16, fontWeight: 600,
                      border: 'none', cursor: 'pointer',
                      boxShadow: '0 6px 24px rgba(26,111,255,0.3)',
                    }}
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link to="/stario">
                  <motion.button
                    whileHover={{ scale: 1.04, background: 'rgba(26,111,255,0.08)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'rgba(255,255,255,0.7)',
                      color: '#0d1a3c',
                      padding: '16px 36px',
                      borderRadius: 14,
                      fontSize: 16, fontWeight: 600,
                      border: '1px solid rgba(26,111,255,0.15)',
                      cursor: 'pointer',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    View Demo
                  </motion.button>
                </Link>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="responsive-stack"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center', gap: 32,
                  marginTop: 44, paddingTop: 32,
                  borderTop: '1px solid rgba(13,26,60,0.09)',
                }}
              >
                {[
                  { n: '22+', label: 'Projects Delivered' },
                  { n: '95%', label: 'Client Satisfaction' },
                  { n: '6', label: 'Core Services' },
                ].map(({ n, label }) => (
                  <div key={label} style={{ textAlign: 'center', minWidth: 120 }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 28, fontWeight: 800,
                      letterSpacing: '-0.5px',
                      color: '#0d1a3c', lineHeight: 1,
                    }}>{n}</div>
                    <div style={{ fontSize: 12, color: 'rgba(13,26,60,0.45)', marginTop: 4, fontFamily: 'var(--font-body)', fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: MascotWithRings + KPI cards overlay ── */}
            <div className="home-hero-visual">

              {/* Mascot center with rings */}
              <motion.div
                className="home-hero-mascot-wrap"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'relative', zIndex: 2,
                  animation: 'float-mascot 4.5s ease-in-out infinite',
                }}
              >
                <MascotWithRings />
              </motion.div>

              {/* KPI bar chart — bottom-left */}
              <span className="kpi-overlay" style={{ position: 'absolute', top: '39%', left: '4%', zIndex: 5, pointerEvents: 'none' }}>
                <KpiDonutCard delay={0.7} />
              </span>

              {/* KPI +45% badge — right */}
              <span className="kpi-overlay" style={{ position: 'absolute', bottom: '18%', left: '11%', zIndex: 5, pointerEvents: 'none' }}>
                <KpiGrowthCard delay={0.3} />
              </span>

              {/* KPI donut — top-left */}
              <span className="kpi-overlay" style={{ position: 'absolute', top: '43%', right: '1%', zIndex: 5, pointerEvents: 'none' }}>
                <KpiGrowthBadge delay={0.5} />
              </span>

              {/* Large background aura */}
              <div className="home-hero-aura" />
            </div>
          </div>
        </motion.div>

      </section>

      {/* ══════════════════════════════════
          COMPETITOR LOGOS MARQUEE
      ══════════════════════════════════ */}
      {clientLogos.length > 0 && (
        <section style={{
          padding: '40px 0',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid rgba(26,111,255,0.1)',
          borderBottom: '1px solid rgba(26,111,255,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Fade edges */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 180,
            background: 'linear-gradient(90deg, var(--bg-secondary) 0%, transparent 100%)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 180,
            background: 'linear-gradient(270deg, var(--bg-secondary) 0%, transparent 100%)',
            zIndex: 2, pointerEvents: 'none',
          }} />

          <p style={{
            textAlign: 'center',
            fontSize: 24, fontFamily: 'var(--font-script)',
            letterSpacing: '0.04em',
            color: 'var(--accent)',
            marginBottom: 28,
          }}>
            Trusted across the industry
          </p>

          <div
            ref={marqueeViewportRef}
            className="marquee-shell"
            style={{
              minHeight: 118,
            }}
          >
            <div
              className="marquee-measure"
              ref={marqueeMeasureRef}
              aria-hidden="true"
            >
              {clientLogos.map(c => (
                <div
                  key={`measure-${c.id}`}
                  className="marquee-item"
                >
                  <img
                    src={c.img}
                    alt=""
                    loading="eager"
                    decoding="async"
                    style={{
                      height: 100,
                      maxWidth: 320,
                      width: 'auto',
                      objectFit: 'contain',
                      opacity: 1,
                      display: 'block',
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              className="marquee-track"
              style={{
                '--marquee-shift': `${marqueeShift}px`,
                animationDuration: `${marqueeDuration}s`,
                opacity: marqueeShift > 0 ? 1 : 0,
              }}
            >
              {Array.from({ length: marqueeRepeatCount }, (_, repeatIndex) => (
                clientLogos.map(c => (
                  <div
                    key={`${repeatIndex}-${c.id}`}
                    className="marquee-item"
                  >
                    <img
                      src={c.img}
                      alt={c.label}
                      loading="eager"
                      decoding="async"
                      style={{
                        height: 100,
                        maxWidth: 320,
                        width: 'auto',
                        objectFit: 'contain',
                        opacity: 1,
                        display: 'block',
                      }}
                    />
                  </div>
                ))
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════
          ABOUT INTRO
      ══════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="two-col" style={{ gap: 56, alignItems: 'center' }}>
            <AnimatedSection>
              <span className="section-label">About Statbrio</span>
              <h2 className="section-heading">
                Innovative Solutions for a{' '}
                <span className="cyan-text">Data-Driven Future.</span>
              </h2>
              <p className="section-subheading" style={{ marginBottom: 36 }}>
                We're a Walajapet-based technology company specializing in AI agents, full-stack development, lead generation, SaaS products, IoT systems, and data analysis. End-to-end, scalable architecture with practical execution.
              </p>
              <div className="responsive-stack" style={{ gap: 12 }}>
                {['Fast Delivery', 'Industry Experts', 'Secure Architecture', 'Transparent'].map(tag => (
                  <span key={tag} style={{
                    padding: '8px 16px',
                    background: 'rgba(26,111,255,0.07)',
                    border: '1px solid rgba(26,111,255,0.18)',
                    borderRadius: 10,
                    fontSize: 13, fontWeight: 500,
                    color: 'var(--text-secondary)',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                    <CheckCircle2 size={13} color="var(--accent)" />
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid-2" style={{ gap: 14 }}>
                {[
                  { icon: <TrendingUp size={20} />, title: 'Fast Delivery', desc: 'Rapid prototyping with production-grade quality' },
                  { icon: <Shield size={20} />, title: 'Secure Arch', desc: 'Enterprise-level security built into every layer' },
                  { icon: <Users size={20} />, title: 'Expert Team', desc: 'Specialists in AI, data, and modern development' },
                  { icon: <Clock size={20} />, title: '24/7 Support', desc: 'Always available to keep your systems running' },
                ].map(({ icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.75)',
                      border: '1px solid rgba(255,255,255,0.9)',
                      borderRadius: 18,
                      padding: '22px 18px',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 4px 20px rgba(13,26,60,0.07)',
                      cursor: 'default',
                      transition: 'box-shadow 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,111,255,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,26,60,0.07)'; }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: 'rgba(26,111,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent)', marginBottom: 12,
                    }}>
                      {icon}
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, marginBottom: 5, color: 'var(--text-primary)' }}>{title}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          SERVICES BENTO GRID
      ══════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <AnimatedSection style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Our Services</span>
            <h2 className="section-heading">Everything you need to scale.</h2>
            <p className="section-subheading" style={{ margin: '0 auto' }}>
              Six core enterprise services, each engineered with precision and delivered at speed.
            </p>
          </AnimatedSection>

          <div className="services-bento">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={svc.size === 'large' && i === 0 ? 'span-2' : ''}
                style={{
                  background: 'rgba(255, 255, 255, 0.72)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  borderRadius: 22,
                  padding: '30px 26px',
                  gridColumn: svc.size === 'large' && i === 0 ? 'span 2' : 'span 1',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 20px rgba(13,26,60,0.06)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 12px 40px ${svc.color}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,26,60,0.06)';
                }}
              >
                <div style={{
                  position: 'absolute', top: -40, right: -40,
                  width: 130, height: 130, borderRadius: '50%',
                  background: `radial-gradient(circle, ${svc.color}15 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
                <div style={{
                  width: 46, height: 46, borderRadius: 13,
                  background: `${svc.color}18`,
                  border: `1px solid ${svc.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: svc.color, marginBottom: 18,
                }}>
                  {svc.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: svc.size === 'large' ? 22 : 17,
                  fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8, color: 'var(--text-primary)',
                }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {svc.desc}
                </p>
                {svc.size === 'large' && i === 0 && (
                  <Link to="/services">
                    <motion.span
                      whileHover={{ x: 4 }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        marginTop: 20, fontSize: 13, fontWeight: 600,
                        color: svc.color, cursor: 'pointer',
                      }}
                    >
                      Learn more <ArrowRight size={13} />
                    </motion.span>
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Fill the empty slot — "All Services" discover card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              style={{
                background: 'linear-gradient(135deg, rgba(26,111,255,0.08) 0%, rgba(0,180,255,0.05) 100%)',
                border: '1.5px dashed rgba(26,111,255,0.25)',
                borderRadius: 22,
                padding: '30px 26px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26,111,255,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Link to="/services" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(26,111,255,0.1)',
                  border: '1.5px solid rgba(26,111,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)',
                }}>
                  <ArrowRight size={22} />
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--accent)', letterSpacing: '-0.01em' }}>
                  View All Services
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Explore our complete service catalogue in detail.
                </p>
              </Link>
            </motion.div>
          </div>


        </div>
      </section>

      {/* ══════════════════════════════════
          STARIO SPOTLIGHT
      ══════════════════════════════════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,60,180,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="two-col" style={{ gap: 56, alignItems: 'center' }}>
            <AnimatedSection>
              <span className="tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
                <Mic size={12} /> AI Voice Agent
              </span>
              <h2 className="section-heading">
                Meet <span className="cyan-text">Stario.</span>
                <br />Your 24/7 AI Voice Agent.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 36, fontWeight: 400 }}>
                Automate customer support and lead qualification with natural voice responses and multi-language support. Never miss a lead again.
              </p>
              <div className="responsive-stack">
                <Link to="/stario">
                  <motion.button className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    See Stario <ArrowRight size={15} />
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button className="btn-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    Request Demo
                  </motion.button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(255,255,255,0.95)',
                  borderRadius: 28, padding: 32,
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 16px 56px rgba(13,26,60,0.1), 0 4px 20px rgba(26,111,255,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1a6fff, #00b4ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 28px rgba(0,180,255,0.5)',
                  }}>
                    <Mic size={22} color="#fff" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>Stario AI</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}
                      />
                      Active — Listening
                    </p>
                  </div>
                </div>
                {/* Waveform */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 52 }}>
                  {[...Array(28)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${20 + Math.sin(i * 0.7) * 25}%`, `${60 + Math.cos(i * 0.4) * 35}%`, `${20 + Math.sin(i * 0.7) * 25}%`] }}
                      transition={{ duration: 0.75 + (i % 5) * 0.1, repeat: Infinity, delay: i * 0.03, ease: 'easeInOut' }}
                      style={{
                        flex: 1, borderRadius: 2,
                        background: 'linear-gradient(to top, #1a6fff, #00d8ff)',
                        opacity: 0.55 + (i % 4) * 0.12,
                        boxShadow: i % 5 === 0 ? '0 0 6px rgba(0,216,255,0.6)' : 'none',
                      }}
                    />
                  ))}
                </div>
                <div className="phone-feature-grid">
                  {['Natural Voice', 'Multi-Language', 'Industry Tuned', '24/7 Available'].map(text => (
                    <div key={text} style={{
                      padding: '9px 13px',
                      background: 'rgba(26,111,255,0.06)',
                      borderRadius: 11, fontSize: 12,
                      fontWeight: 500, color: 'var(--text-secondary)',
                      display: 'flex', alignItems: 'center', gap: 7,
                      border: '1px solid rgba(26,111,255,0.12)',
                    }}>
                      <span style={{ display: 'inline-flex', color: 'var(--accent)' }}>{renderVoiceFeatureIcon(text)}</span>{text}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          STATS
      ══════════════════════════════════ */}
      <section style={{ padding: '80px 0', background: 'var(--bg-tertiary)', borderTop: '1px solid rgba(26,111,255,0.1)' }}>
        <div className="container">
          <div className="grid-4" style={{ gap: 20 }}>
            {[
              { target: 22, suffix: '+', label: 'Projects Completed', icon: <Award size={20} /> },
              { target: 95, suffix: '%', label: 'Client Satisfaction', icon: <Star size={20} /> },
              { target: 6, suffix: '', label: 'Core Services', icon: <Zap size={20} /> },
              { target: 3, suffix: 'x', label: 'Faster Delivery', icon: <TrendingUp size={20} /> },
            ].map(({ target, suffix, label, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '28px 20px', textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.75)',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 20px rgba(13,26,60,0.07)',
                }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: 'rgba(26,111,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', margin: '0 auto 14px',
                }}>
                  {icon}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 44, fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8,
                }}>
                  <Counter target={target} suffix={suffix} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA BANNER
      ══════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div style={{
              background: 'linear-gradient(135deg, rgba(26,111,255,0.08) 0%, rgba(0,180,255,0.05) 50%, rgba(26,111,255,0.08) 100%)',
              border: '1px solid rgba(26,111,255,0.18)',
              borderRadius: 32, padding: 'clamp(36px, 6vw, 72px) clamp(24px, 5vw, 56px)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              background: 'rgba(255,255,255,0.75)',
              boxShadow: '0 20px 60px rgba(13,26,60,0.08)',
            }}>
              <div style={{
                position: 'absolute', top: -60, right: -60,
                width: 280, height: 280, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(26,111,255,0.12) 0%, transparent 70%)',
                filter: 'blur(20px)', pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', bottom: -40, left: -40,
                width: 220, height: 220, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,180,255,0.08) 0%, transparent 70%)',
                filter: 'blur(20px)', pointerEvents: 'none',
              }} />
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(30px, 4.5vw, 52px)',
                fontWeight: 800, letterSpacing: '-0.03em',
                color: 'var(--text-primary)', marginBottom: 14, position: 'relative',
              }}>
                Ready to build something{' '}
                <span className="cyan-text">remarkable?</span>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--text-secondary)', marginBottom: 40, fontWeight: 400, position: 'relative' }}>
                Let's talk about your project and how we can help.
              </p>
              <div className="responsive-stack" style={{ justifyContent: 'center', position: 'relative' }}>
                <Link to="/contact">
                  <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Start a Project <ArrowRight size={15} />
                  </motion.button>
                </Link>
                <a href="mailto:business@statbrio.com">
                  <motion.button className="btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    business@statbrio.com
                  </motion.button>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

