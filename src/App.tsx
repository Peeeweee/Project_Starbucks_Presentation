import { useEffect } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { SectionProvider, useSection } from './context/SectionContext';
import { CupController } from './components/Cup/CupController';
import { Opening } from './components/sections/Opening';
import { ProblemSection } from './components/sections/ProblemSection';
import { DemographicsSection } from './components/sections/DemographicsSection';
import { BehavioralSection } from './components/sections/BehavioralSection';
import { OrderingSection } from './components/sections/OrderingSection';
import { InsightsSection } from './components/sections/InsightsSection';
import { RecommendationsSection } from './components/sections/RecommendationsSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { SectionDots } from './components/ui/SectionDots';
import { PresenterTag } from './components/ui/PresenterTag';
import { Particles } from './components/ui/Particles';

/* ─────────────────────────────────────────────
   ROOT STYLES (inline guarantees they work)
───────────────────────────────────────────── */
const ROOT: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  overflow: 'hidden',
  background: '#080808',
  color: '#f5f0e8',
  fontFamily: "'Inter', sans-serif",
};

const SLIDE_STYLE: React.CSSProperties = {
  position: 'relative',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const LAYOUT_CONFIGS: Record<number, { 
  cup: { x: string; y: string; scale: number; opacity: number; rotate?: number };
  content: { x: string; y: string; width: string; textAlign: 'left' | 'center' | 'right'; justifyContent: string };
  bg: string;
}> = {
  0: { // Opening - Center
    cup: { x: '0%', y: '-26%', scale: 0.45, opacity: 1, rotate: 0 },
    content: { x: '0', y: '16vh', width: '90%', textAlign: 'center', justifyContent: 'center' },
    bg: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #080808 100%)'
  },
  1: { // Problem - Left
    cup: { x: '25%', y: '0%', scale: 0.72, opacity: 1, rotate: 0 },
    content: { x: '0', y: '0', width: '50%', textAlign: 'left', justifyContent: 'flex-start' },
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #151515 100%)'
  },
  2: { // Demographics - Right
    cup: { x: '-25%', y: '0%', scale: 0.72, opacity: 1, rotate: -3 },
    content: { x: '0', y: '0', width: '50%', textAlign: 'right', justifyContent: 'flex-end' },
    bg: 'linear-gradient(225deg, #0d1210 0%, #0d0d0d 100%)'
  },
  3: { // Behavioral - Left
    cup: { x: '25%', y: '0%', scale: 0.72, opacity: 1, rotate: 2 },
    content: { x: '0', y: '0', width: '50%', textAlign: 'left', justifyContent: 'flex-start' },
    bg: 'radial-gradient(circle at 50% 80%, #162620 0%, #080808 100%)'
  },
  4: { // Ordering - Right
    cup: { x: '-25%', y: '0%', scale: 0.72, opacity: 1, rotate: 4 },
    content: { x: '0', y: '0', width: '50%', textAlign: 'right', justifyContent: 'flex-end' },
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #121815 100%)'
  },
  5: { // Insights - Left
    cup: { x: '25%', y: '0%', scale: 0.70, opacity: 1, rotate: -2 },
    content: { x: '0', y: '0', width: '50%', textAlign: 'left', justifyContent: 'flex-start' },
    bg: 'linear-gradient(225deg, #121212 0%, #0d0d0d 100%)'
  },
  6: { // Recommendations - Unique Grid Layout
    cup: { x: '26%', y: '0%', scale: 0.70, opacity: 1, rotate: 4 },
    content: { x: '0', y: '0', width: '55%', textAlign: 'left', justifyContent: 'flex-start' },
    bg: 'radial-gradient(circle at 75% 50%, #1e3932 0%, #0a0f0d 100%)'
  },
  7: { // Closing - Cinematic Typist Stage
    cup: { x: '35%', y: '5%', scale: 1.1, opacity: 0.15, rotate: -8 },
    content: { x: '0', y: '0', width: '75%', textAlign: 'left', justifyContent: 'flex-start' },
    bg: 'radial-gradient(circle at 80% 50%, #151005 0%, #050505 100%)'
  }
};

const AppContent = () => {
  const { currentSection, totalSections, nextSection, prevSection } = useSection();
  const activeLayout = LAYOUT_CONFIGS[currentSection] || LAYOUT_CONFIGS[1];

  // Debounced wheel navigation
  useEffect(() => {
    let locked = false;
    const handle = (e: WheelEvent) => {
      e.preventDefault();
      if (locked || Math.abs(e.deltaY) < 30) return;
      locked = true;
      if (e.deltaY > 0) nextSection(); else prevSection();
      setTimeout(() => { locked = false; }, 950);
    };
    window.addEventListener('wheel', handle, { passive: false });
    return () => window.removeEventListener('wheel', handle);
  }, [nextSection, prevSection]);

  return (
    <motion.div 
      style={ROOT}
      animate={{ background: activeLayout.bg }}
      transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* ── Fixed UI chrome ── */}
      <Particles />
      <SectionDots />
      <PresenterTag />

      {/* ── Progress bar (left edge) ── */}
      <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 3, background: 'rgba(255,255,255,0.06)', zIndex: 200 }}>
        <motion.div
          style={{ background: '#00a862', transformOrigin: 'top', height: '100%', willChange: 'transform' }}
          animate={{ scaleY: currentSection / (totalSections - 1) }}
          transition={{ type: 'spring', stiffness: 100, damping: 25 }}
        />
      </div>

      {/* ── DYNAMIC CUP CONTAINER ── */}
      <motion.div
        animate={{
          x: activeLayout.cup.x,
          y: activeLayout.cup.y,
          scale: activeLayout.cup.scale,
          opacity: activeLayout.cup.opacity,
          rotate: activeLayout.cup.rotate ?? 0
        }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <CupController />
        </motion.div>
      </motion.div>

      {/* ── Nav buttons ── */}
      <div style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 200, display: 'flex', gap: 12 }}>
        {[{ dir: 'up', fn: prevSection, disabled: currentSection === 0 }, { dir: 'down', fn: nextSection, disabled: currentSection === totalSections - 1 }].map(b => (
          <button
            key={b.dir}
            onClick={b.fn}
            disabled={b.disabled}
            style={{
              width: 48, height: 48, borderRadius: 9999,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(8px)',
              color: '#f5f0e8',
              cursor: b.disabled ? 'default' : 'pointer',
              opacity: b.disabled ? 0 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'opacity 0.3s, background 0.2s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points={b.dir === 'up' ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
            </svg>
          </button>
        ))}
      </div>

      {/* ── Slide stack ── */}
      <motion.div 
        animate={{ 
          y: `${-currentSection * 100}vh`,
          scale: 1, 
        }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          willChange: 'transform'
        }}
      >
        {[
          <Opening index={0} />,
          <ProblemSection index={1} />,
          <DemographicsSection index={2} />,
          <BehavioralSection index={3} />,
          <OrderingSection index={4} />,
          <InsightsSection index={5} />,
          <RecommendationsSection index={6} />,
          <ClosingSection index={7} />
        ].map((child, i) => {
          const cfg = LAYOUT_CONFIGS[i] || LAYOUT_CONFIGS[1];
          return (
            <div key={i} style={SLIDE_STYLE}>
              <motion.div
                animate={{
                  x: cfg.content.x,
                  y: cfg.content.y,
                  width: cfg.content.width,
                  textAlign: cfg.content.textAlign,
                  justifyContent: cfg.content.justifyContent,
                }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  paddingTop: '48px',
                  paddingBottom: '48px',
                  margin: cfg.content.textAlign === 'center' ? '0 auto' : (cfg.content.textAlign === 'left' ? '0 auto 0 10vw' : '0 10vw 0 auto'),
                  textAlign: cfg.content.textAlign,
                }}
              >
                <div style={{ width: '100%', textAlign: cfg.content.textAlign }}>
                  {child}
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

function App() {
  return (
    <SectionProvider>
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </SectionProvider>
  );
}

export default App;
