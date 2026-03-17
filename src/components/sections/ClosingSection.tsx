import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

const team = [
  { initials: 'KD', name: 'Kent Paulo Delgado' },
  { initials: 'ED', name: 'Earl Josh Delgado' },
  { initials: 'JL', name: 'John Renan Labay' },
];

export const ClosingSection = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="closing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            gap: 28, maxWidth: 640, padding: '0 24px',
          }}
        >

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontSize: 10, letterSpacing: '0.3em', color: '#333', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>
            100,000 orders · $1.49M revenue · 3.69/5 satisfaction
          </motion.p>

          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#f5f0e8', fontSize: 'clamp(26px, 4vw, 52px)', lineHeight: 1.15, margin: 0 }}>
            <span style={{ color: '#00a862', fontWeight: 900 }}>Starbucks</span> doesn't have a<br />one-size-fits-all customer.
          </motion.h2>

          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 900, color: '#00a862', fontSize: 'clamp(18px, 2.8vw, 36px)', margin: 0 }}>
            Now they have the data to prove it.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }}
            style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 16 }}>
            {team.map((m, i) => (
              <motion.div key={m.initials} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.0 + i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 48, height: 48, borderRadius: 99, background: '#111', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 14, color: '#c8a96e' }}>
                  {m.initials}
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase', maxWidth: 80, textAlign: 'center' }}>{m.name}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}
            style={{ fontSize: 9, color: '#2a2a2a', letterSpacing: '0.4em', textTransform: 'uppercase', margin: 0 }}>
            USeP · BSCS 3A · CIC · CSDS 327 · 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
