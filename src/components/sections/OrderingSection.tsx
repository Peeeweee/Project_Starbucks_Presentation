import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';
import { CountUp } from '../ui/CountUp';

const TimeBar = ({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <span style={{ fontSize: 10, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', width: 64, flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay, duration: 1 }} style={{ height: '100%', borderRadius: 99, background: color }} />
    </div>
    <span style={{ fontSize: 10, fontWeight: 900, color: '#f5f0e8', width: 32, textAlign: 'right' }}>
      <CountUp from={0} to={pct} duration={1000} suffix="%" />
    </span>
  </div>
);

const DrinkPill = ({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) => (
  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderRadius: 10, background: '#111', border: '1px solid rgba(255,255,255,0.05)' }}>
    <span style={{ fontSize: 11, color: '#f5f0e8', fontWeight: 700 }}>{label}</span>
    <span style={{ fontSize: 11, fontWeight: 900, color }}>{pct}%</span>
  </motion.div>
);

export const OrderingSection = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;

  return (
    <div style={{ width: '100%' }}>
      <AnimatePresence>
        {isActive && (
          <motion.div key="o" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              style={{ fontSize: 10, letterSpacing: '0.35em', color: '#00a862', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              Patterns
            </motion.p>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(26px, 3vw, 48px)', color: '#f5f0e8', margin: 0, lineHeight: 1.15 }}>
              When Do They<br />Drink It?
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              style={{ background: '#111', borderRadius: 20, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#444', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 4px' }}>Time of Day</p>
              <TimeBar label="Morning" pct={45} color="#00a862" delay={0.5} />
              <TimeBar label="Afternoon" pct={33} color="#c8a96e" delay={0.62} />
              <TimeBar label="Evening" pct={16} color="#1e3932" delay={0.74} />
              <TimeBar label="Night" pct={6} color="#333" delay={0.86} />
              <p style={{ fontSize: 11, color: '#444', fontStyle: 'italic', margin: '4px 0 0' }}>45% of orders happen before noon.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#444', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 10px' }}>Drink Type Split</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <DrinkPill label="Refresher" pct={17} color="#00a862" delay={0.9} />
                <DrinkPill label="Tea" pct={17} color="#c8a96e" delay={1.0} />
                <DrinkPill label="Espresso" pct={17} color="#888" delay={1.1} />
                <DrinkPill label="Frappuccino" pct={16} color="#555" delay={1.2} />
              </div>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#00a862', fontWeight: 700, fontSize: 'clamp(13px, 1.3vw, 17px)', margin: 0 }}>
              No single drink dominates — the balance matters →
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
