import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';
import { CountUp } from '../ui/CountUp';

const Stat = ({ value, label, color, delay }: { value: React.ReactNode; label: string; color: string; delay: number }) => (
  <motion.div
    initial={{ x: -24, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay, duration: 0.6 }}
    style={{ display: 'flex', flexDirection: 'column', background: '#111', borderRadius: 16, padding: '24px', borderLeft: `4px solid ${color}` }}
  >
    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(52px, 6vw, 84px)', color, lineHeight: 1 }}>
      {value}
    </span>
    <span style={{ fontSize: 13, letterSpacing: '0.15em', color: '#555', fontWeight: 700, textTransform: 'uppercase', marginTop: 8 }}>{label}</span>
  </motion.div>
);

export const ProblemSection = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <AnimatePresence>
        {isActive && (
          <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              style={{ fontSize: 14, letterSpacing: '0.35em', color: '#00a862', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              The Problem
            </motion.p>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(40px, 5vw, 72px)', color: '#f5f0e8', margin: 0, lineHeight: 1.15 }}>
              Why Does<br />This Matter?
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Stat value={<CountUp from={0} to={7} duration={1500} suffix="%" />} label="Same-store sales drop" color="#00a862" delay={0.4} />
              <Stat value={<CountUp from={0} to={10} duration={1500} suffix="%" />} label="Transaction decline" color="#c8a96e" delay={0.55} />
            </div>
            <motion.blockquote initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              style={{ margin: 0, padding: '20px 24px', borderLeft: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', borderRadius: '0 16px 16px 0' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(245,240,232,0.85)', fontSize: 'clamp(18px, 2vw, 28px)', margin: 0, lineHeight: 1.6 }}>
                "<span style={{ color: '#00a862', fontWeight: 800 }}>Starbucks</span> does not fully understand what its customers want. We analysed 100,000 orders to find out."
              </p>
            </motion.blockquote>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#00a862', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 26px)', margin: 0 }}>
              So — who is holding the cup? →
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
