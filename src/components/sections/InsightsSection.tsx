import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';
import { useScrambleText } from '../../hooks/useScrambleText';

const findings = [
  { n: '01', title: 'Youth drives spend.', body: '18–34 leads average order value consistently.', color: '#00a862' },
  { n: '02', title: 'Location is neutral.', body: 'Urban vs. Rural shows <3% variance in habits.', color: '#c8a96e' },
  { n: '03', title: 'Loyalty changes habits.', body: 'Members order ahead at 2× the rate of others.', color: '#00a862' },
  { n: '04', title: 'Customization = revenue.', body: 'Every extra item added raises the ticket size.', color: '#c8a96e' },
  { n: '05', title: 'The morning is everything.', body: '45% of daily revenue happens before noon.', color: '#00a862' },
  { n: '06', title: 'Menu balance matters.', body: 'No single category can carry the entire brand.', color: '#c8a96e' },
];

export const InsightsSection = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;
  const heading = useScrambleText('What The Data Tells Us', isActive);

  return (
    <div style={{ width: '100%' }}>
      <AnimatePresence>
        {isActive && (
          <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              style={{ fontSize: 10, letterSpacing: '0.35em', color: '#00a862', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
              Key Insights
            </motion.p>
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(24px, 2.8vw, 44px)', color: '#f5f0e8', margin: 0, lineHeight: 1.1 }}>
              {heading}
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {findings.map((f, i) => (
                <motion.div key={f.n} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
                  style={{ background: '#111', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 12 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 11, color: f.color, flexShrink: 0, marginTop: 1 }}>{f.n}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: '#f5f0e8', fontSize: 12, margin: '0 0 3px' }}>{f.title}</p>
                    <p style={{ fontSize: 11, color: '#555', lineHeight: 1.5, margin: 0 }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#c8a96e', fontWeight: 700, fontSize: 'clamp(13px, 1.3vw, 17px)', margin: 0 }}>
              Six patterns. One clear picture. →
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
