import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

const recs = [
  { n: '01', title: 'Double down on youth.', body: 'Mobile-first social rewards targeting 18–34 to capitalise on the highest-value demographic.', color: '#00a862' },
  { n: '02', title: 'Personalise loyalty.', body: 'Shift from generic points to customisation-linked rewards. Make every pump of syrup count.', color: '#c8a96e' },
  { n: '03', title: 'Win the morning rush.', body: 'Optimise staffing, queue tech, and mobile-order flow exclusively before noon.', color: '#00a862' },
  { n: '04', title: 'Protect menu variety.', body: 'Seasonal promotions across all drink categories beat narrowing the menu every time.', color: '#c8a96e' },
];

export const RecommendationsSection = ({ index }: { index: number }) => {
  const { currentSection, setHealingProgress } = useSection();
  const isActive = currentSection === index;

  return (
    <div style={{ width: '100%' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              style={{ fontSize: 10, letterSpacing: '0.35em', color: '#00a862', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              Recommendations
            </motion.p>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(26px, 3vw, 50px)', color: '#f5f0e8', margin: 0, lineHeight: 1.15 }}>
              How To Fix<br />The Cup.
            </motion.h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recs.map((r, i) => (
                <motion.div key={r.n}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
                  onAnimationComplete={() => { if (isActive) setHealingProgress(i + 1); }}
                  style={{ background: '#111', borderRadius: 16, padding: '16px 20px', borderLeft: `3px solid ${r.color}`, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 12, color: r.color, flexShrink: 0, marginTop: 1 }}>{r.n}</span>
                  <div>
                    <p style={{ fontWeight: 800, color: '#f5f0e8', fontSize: 13, margin: '0 0 4px' }}>{r.title}</p>
                    <p style={{ fontSize: 11, color: '#555', lineHeight: 1.6, margin: 0 }}>{r.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#00a862', fontWeight: 700, fontSize: 'clamp(13px, 1.3vw, 17px)', margin: 0 }}>
              Data confirmed. Cup restored. →
            </motion.p>
          </motion.div>
    </div>
  );
};
