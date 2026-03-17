import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';
import React from 'react';

const team = [
  { initials: 'KD', name: 'Kent Paulo Delgado' },
  { initials: 'ED', name: 'Earl Josh Delgado' },
  { initials: 'JL', name: 'John Renan Labay' },
];

/**
 * Reusable typewriter text generator.
 * Splits string text into characters and staggers their opacity fade-in.
 */
const Typewriter = ({ text, delay = 0, speed = 0.05, style, tag: Tag = 'span' }: { text: string, delay?: number, speed?: number, style?: React.CSSProperties, tag?: any }) => {
  return (
    <Tag style={{ display: 'inline-block', ...style }}>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + index * speed }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
};

export const ClosingSection = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
           key="closing-unique"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: 60 }}
        >
          {/* Top Line Decorator */}
          <motion.div initial={{ width: 0 }} animate={{ width: 120 }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            style={{ height: 2, background: '#c8a96e' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div>
              <Typewriter 
                tag="p"
                text="100,000 ORDERS · $1.49M REVENUE · 3.69/5 SATISFACTION" 
                delay={1.5} speed={0.03} 
                style={{ fontSize: 11, letterSpacing: '0.4em', color: '#999', fontWeight: 800, margin: '0 0 24px', fontFamily: "'Inter', sans-serif" }} 
              />

              <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#f5f0e8', fontSize: 'clamp(38px, 5vw, 76px)', lineHeight: 1.05, margin: 0 }}>
                <Typewriter text="Starbucks doesn't have a" delay={3.5} speed={0.05} style={{ display: 'block' }} />
                <Typewriter text="one-size-fits-all customer." delay={5.2} speed={0.05} style={{ display: 'block', color: '#00a862', fontStyle: 'italic' }} />
              </h2>

              <Typewriter 
                tag="p"
                text="Now they have the data to prove it." 
                delay={7.5} speed={0.04} 
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: '#d1d1d1', fontSize: 'clamp(20px, 3vw, 36px)', margin: '32px 0 0 0' }} 
              />
            </div>

            {/* Presenters Grid appearing suddenly off-script */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 10.0, duration: 1.5 }}
              style={{ display: 'flex', gap: 40, marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40, flexWrap: 'wrap' }}
            >
              {team.map((m) => (
                <div key={m.initials} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ 
                    width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(200, 169, 110, 0.4)', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 900, 
                    fontSize: 14, color: '#c8a96e' 
                  }}>
                    {m.initials}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 11.5 }}
              style={{ fontSize: 9, color: '#aaa', letterSpacing: '0.6em', textTransform: 'uppercase', margin: '8px 0 0' }}>
              USeP · BSCS 3A · CIC · CSDS 327 · 2026
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
