import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSection } from '../../context/SectionContext';

const recs = [
  { n: '01', title: 'Double down on youth.', body: 'Mobile-first social rewards targeting 18–34 to capitalise on high-value demographic trends.', color: '#00a862' },
  { n: '02', title: 'Personalise loyalty.', body: 'Shift from generic points to customisation-linked rewards. Make every syrup pump count.', color: '#c8a96e' },
  { n: '03', title: 'Win the morning rush.', body: 'Optimise staffing, queue tech, and mobile-order flow exclusively before noon.', color: '#00a862' },
  { n: '04', title: 'Protect menu variety.', body: 'Seasonal promotions across all drink categories beat narrowing the menu every time.', color: '#c8a96e' },
];

export const RecommendationsSection = ({ index }: { index: number }) => {
  const { currentSection, setHealingProgress } = useSection();
  const isActive = currentSection === index;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!isActive) return null;

  return (
    <div style={{ width: '100%', maxWidth: '840px' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        
        {/* Header section */}
        <div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ height: 2, width: 60, background: '#00a862', marginBottom: 16, transformOrigin: 'left' }}
          />
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: 15, letterSpacing: '0.4em', color: '#00a862', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
            Actionable Strategy
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(44px, 5vw, 84px)', color: '#f5f0e8', margin: 0, lineHeight: 1.1 }}>
            How To Fix <span style={{ color: '#00a862', fontStyle: 'italic' }}>The Cup.</span>
          </motion.h2>
        </div>

        {/* 2x2 Grid for Recommendations */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {recs.map((r, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <motion.div 
                key={r.n}
                initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 100 }}
                onAnimationComplete={() => { if (isActive) setHealingProgress(i + 1); }}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
                style={{ 
                  background: isHovered ? 'rgba(30, 30, 30, 0.6)' : 'rgba(15, 15, 15, 0.4)', 
                  backdropFilter: 'blur(16px)',
                  borderRadius: 20, 
                  padding: '28px 24px', 
                  border: `1px solid ${isHovered ? r.color : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: isHovered ? `0 10px 30px -10px ${r.color}40` : '0 4px 20px rgba(0,0,0,0.3)',
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 16,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'background 0.4s, border 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                {/* Decorative background number */}
                <div style={{ 
                  position: 'absolute', right: -10, top: -20, 
                  fontSize: '120px', fontWeight: 900, fontFamily: "'Playfair Display', serif",
                  color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', lineHeight: 1,
                  transition: 'color 0.4s'
                }}>
                  {r.n}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
                  <span style={{ 
                    fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, 
                    color: r.color, background: `${r.color}15`, padding: '6px 20px', borderRadius: 30,
                    transition: 'background 0.4s'
                  }}>
                    {r.n}
                  </span>
                  {isHovered && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{ width: 10, height: 10, borderRadius: '50%', background: r.color, boxShadow: `0 0 10px ${r.color}` }} />
                  )}
                </div>

                <div style={{ zIndex: 1 }}>
                  <p style={{ fontWeight: 800, color: isHovered ? '#fff' : '#f5f0e8', fontSize: 24, margin: '0 0 10px', transition: 'color 0.3s', lineHeight: 1.2 }}>
                    {r.title}
                  </p>
                  <p style={{ fontSize: 16, color: isHovered ? '#ccc' : '#888', lineHeight: 1.6, margin: 0, transition: 'color 0.3s' }}>
                    {r.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <div style={{ width: 50, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          <p style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em', color: '#888', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', margin: 0 }}>
            Hover cards to interact
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};
