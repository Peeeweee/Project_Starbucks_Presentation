import { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

export const Opening = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const [scope, animate] = useAnimate();
  const isActive = currentSection === index;

  useEffect(() => {
    if (!isActive) return;
    const run = async () => {
      await new Promise(r => setTimeout(r, 300));
      animate('.h1a', { y: 0, opacity: 1 }, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
      setTimeout(() => animate('.h1b', { y: 0, opacity: 1 }, { duration: 0.9, ease: [0.22, 1, 0.36, 1] }), 200);
      setTimeout(() => animate('.sub', { opacity: 1 }, { duration: 0.8 }), 700);
      setTimeout(() => animate('.cta', { opacity: 1 }, { duration: 0.6 }), 1300);
    };
    run();
  }, [isActive, animate]);

  return (
    <div
      ref={scope}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <motion.h1
          initial={{ y: '100%', opacity: 0 }}
          className="h1a"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            lineHeight: 1,
            margin: 0,
            fontSize: 'clamp(52px, 9vw, 112px)',
            color: '#f5f0e8',
            letterSpacing: '-0.03em',
          }}
        >
          One Cup.
        </motion.h1>
      </div>
      <div style={{ overflow: 'hidden', marginBottom: 32 }}>
        <motion.h1
          initial={{ y: '100%', opacity: 0 }}
          className="h1b"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            lineHeight: 1,
            margin: 0,
            fontSize: 'clamp(52px, 9vw, 112px)',
            color: '#00a862',
            letterSpacing: '-0.03em',
          }}
        >
          100,000 Stories.
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        className="sub"
        style={{
          color: '#666',
          fontSize: 'clamp(14px, 1.4vw, 20px)',
          maxWidth: 520,
          lineHeight: 1.7,
          margin: '0 0 40px',
        }}
      >
        A data story about what drives <span style={{ color: '#00a862', fontWeight: 800 }}>Starbucks</span> customers — and what the numbers reveal.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} className="cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.35em', color: '#444', fontWeight: 700, textTransform: 'uppercase' }}>
          Arrow keys or scroll to navigate
        </span>
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: '#00a862' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
