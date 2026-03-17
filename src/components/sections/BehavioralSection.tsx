import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';
import { CountUp } from '../ui/CountUp';

const Row = ({ label, mv, gv, prefix = '', suffix = '', dec = 0, delay }: {
  label: string; mv: number; gv: number; prefix?: string; suffix?: string; dec?: number; delay: number;
}) => (
  <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <span style={{ fontSize: 10, letterSpacing: '0.15em', color: '#555', fontWeight: 700, textTransform: 'uppercase' }}>{label}</span>
    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#00a862', fontSize: 18, textAlign: 'center' }}>
      <CountUp from={0} to={mv} duration={1200} prefix={prefix} suffix={suffix} decimals={dec} />
    </span>
    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#c8a96e', fontSize: 18, textAlign: 'center' }}>
      <CountUp from={0} to={gv} duration={1200} prefix={prefix} suffix={suffix} decimals={dec} />
    </span>
  </motion.div>
);

export const BehavioralSection = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;

  return (
    <div style={{ width: '100%' }}>
      <AnimatePresence>
        {isActive && (
          <motion.div key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              style={{ fontSize: 10, letterSpacing: '0.35em', color: '#00a862', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              Behavior
            </motion.p>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(26px, 3vw, 48px)', color: '#f5f0e8', margin: 0, lineHeight: 1.15 }}>
              What Is Inside<br />The Cup?
            </motion.h2>
            {/* Comparison table */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ background: '#111', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, padding: '14px 20px', background: 'rgba(255,255,255,0.03)' }}>
                <span style={{ fontSize: 9, letterSpacing: '0.2em', color: '#444', fontWeight: 900, textTransform: 'uppercase' }}>Metric</span>
                <span style={{ fontSize: 9, letterSpacing: '0.2em', color: '#00a862', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center' }}>Members</span>
                <span style={{ fontSize: 9, letterSpacing: '0.2em', color: '#c8a96e', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center' }}>General</span>
              </div>
              <div style={{ padding: '0 20px 8px' }}>
                <Row label="Avg Spend" mv={15.43} gv={14.21} prefix="$" dec={2} delay={0.6} />
                <Row label="Order Ahead" mv={40} gv={20} suffix="%" delay={0.72} />
                <Row label="Satisfaction" mv={3.7} gv={3.7} suffix="/5" dec={1} delay={0.84} />
              </div>
            </motion.div>
            {/* Mini chart */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
              style={{ background: '#111', borderRadius: 20, padding: 20 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.3em', color: '#444', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 12px' }}>
                Customisation → Spend Uplift
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 64 }}>
                {[20, 30, 42, 54, 65, 77, 89, 100].map((h, i) => (
                  <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 1.1 + i * 0.06, duration: 0.5 }}
                    style={{ flex: 1, borderRadius: '4px 4px 0 0', background: 'linear-gradient(to top, #1e3932, #00a862)' }} />
                ))}
              </div>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#00a862', fontWeight: 700, fontSize: 'clamp(13px, 1.3vw, 17px)', margin: 0 }}>
              Members order ahead at 2× the rate →
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
