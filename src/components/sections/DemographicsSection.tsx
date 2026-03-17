import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';
import { useScrambleText } from '../../hooks/useScrambleText';
import { CountUp } from '../ui/CountUp';

const Bar = ({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <span style={{ fontSize: 10, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em', width: 40, flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay, duration: 1 }} style={{ height: '100%', borderRadius: 99, background: color }} />
    </div>
    <span style={{ fontSize: 10, fontWeight: 900, color: '#f5f0e8', width: 36, textAlign: 'right' }}>
      <CountUp from={0} to={pct} duration={1000} suffix="%" />
    </span>
  </div>
);

export const DemographicsSection = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;
  const heading = useScrambleText('Who Is Holding The Cup?', isActive);

  return (
    <div style={{ width: '100%' }}>
      <AnimatePresence>
        {isActive && (
          <motion.div key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              style={{ fontSize: 10, letterSpacing: '0.35em', color: '#00a862', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              Demographics
            </motion.p>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(26px, 3vw, 46px)', color: '#f5f0e8', margin: 0, lineHeight: 1.1 }}>
              {heading}
            </motion.h2>
            {/* Age bars */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ background: '#111', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#444', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 4px' }}>Avg Spend by Age Group</p>
              <Bar label="18–34" pct={90} color="#00a862" delay={0.6} />
              <Bar label="35–44" pct={65} color="#c8a96e" delay={0.7} />
              <Bar label="45–54" pct={60} color="#1e3932" delay={0.8} />
              <Bar label="55+"   pct={25} color="#333"    delay={0.9} />
            </motion.div>
            {/* Insight pills */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[{ text: 'Gender split is equal', c: '#00a862' }, { text: 'Location has no effect', c: '#c8a96e' }].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#111', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: 99, background: item.c, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#f5f0e8', fontWeight: 700 }}>{item.text}</span>
                </div>
              ))}
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#00a862', fontWeight: 700, fontSize: 'clamp(13px, 1.3vw, 17px)', margin: 0 }}>
              Identified the audience. Now — what's inside? →
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
