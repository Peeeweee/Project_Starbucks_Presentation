import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useSection } from '../../context/SectionContext';

// Every meaningful word / stat from the dataset
const DATASET_WORDS = [
  'Frappuccino', 'Latte', 'Espresso', 'Cappuccino', 'Cold Brew',
  'Americano', 'Macchiato', 'Mocha', 'Iced Coffee', 'Green Tea',
  'Chai Latte', 'Matcha', 'Hot Cocoa', 'Smoothie', 'Refresher',
  '$4.15', '$6.20', '$5.45', '$7.80', '$3.99',
  '47.7%', '3.69 ★', '$1.49M', '100K', '18–34',
  'Urban', 'Rural', 'Loyalty', 'Members', 'Morning',
  'Afternoon', 'Evening', 'Weekday', 'Weekend', 'Peak Hours',
  'Revenue', 'Satisfaction', 'Orders', 'Customization', 'Trending',
  '8AM', '12PM', 'Oat Milk', 'Almond Milk', 'Soy Milk',
  'Extra Shot', 'Whipped Cream', 'Caramel', 'Vanilla', 'Hazelnut',
  'Sweet', 'Strong', 'Regular', 'Decaf', 'Large',
  'Medium', 'Small', 'Hot', 'Iced', 'Blended',
  '↑28%', '2× Rate', '<3% Var', 'Tier 1', 'BSCS 3A',
  'Youth', 'Adults', 'Seniors', 'Students', 'Professionals',
  'Region 1', 'Region 2', 'NCR', 'Cebu', 'Davao',
  'Drive-Thru', 'Dine-In', 'Takeout', 'Delivery', 'Mobile Order',
  'Rewards', 'Gold Star', 'Bonus', 'Points', 'Redeem',
  '45% AM', '23% PM', 'Q1', 'Q2', 'Q3',
  'Gender', 'Age Group', 'Frequency', 'Spend', 'Habits',
  'Insights', 'Patterns', 'Data', 'Analysis', 'Strategy',
];

const COLS = 12;
const ROWS = 8;
const TOTAL = COLS * ROWS;

const COLORS = [
  '#00a862', '#1e3932', '#006241', '#00704a',
  '#c8a96e', '#8b6914', '#2d1a07',
  '#1a1a1a', '#111111', '#222222',
];

interface Tile {
  id: number;
  word: string;
  color: string;
  textColor: string;
  col: number;
  row: number;
}

export const MosaicEnding = ({ index, onReveal }: { index: number; onReveal: () => void }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;
  const [phase, setPhase] = useState<'idle' | 'rush' | 'done'>('idle');

  const tiles = useMemo<Tile[]>(() => {
    return Array.from({ length: TOTAL }, (_, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const isDark = ['#1a1a1a', '#111111', '#222222'].includes(color);
      return {
        id: i,
        word: DATASET_WORDS[i % DATASET_WORDS.length],
        color,
        textColor: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
        col,
        row,
      };
    });
  }, []);

  // Reset on slide entry + trigger rush after 7s
  useEffect(() => {
    if (isActive) {
      setPhase('idle');
      const t = setTimeout(() => setPhase('rush'), 7000);
      return () => clearTimeout(t);
    }
  }, [isActive]);

  // Call onReveal after rush settles (~1.4s) so App zooms the cup
  useEffect(() => {
    if (phase !== 'rush') return;
    const t = setTimeout(() => {
      setPhase('done');
      onReveal();
    }, 1400);
    return () => clearTimeout(t);
  }, [phase, onReveal]);

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* Full-screen puzzle tile grid */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        zIndex: 5,
      }}>
        {tiles.map((tile) => {
          // Each tile rushes toward the center
          const targetX = (COLS / 2 - tile.col - 0.5) * (100 / COLS);
          const targetY = (ROWS / 2 - tile.row - 0.5) * (100 / ROWS);

          return (
            <motion.div
              key={tile.id}
              initial={{ x: 0, y: 0, scale: 1, opacity: 0 }}
              animate={
                phase === 'rush' || phase === 'done'
                  ? { x: `${targetX}vw`, y: `${targetY}vh`, scale: 0, opacity: 0 }
                  : { x: 0, y: 0, scale: 1, opacity: 1 }
              }
              transition={
                phase === 'rush' || phase === 'done'
                  ? {
                      duration: 0.8 + Math.random() * 0.5,
                      ease: [0.4, 0, 1, 1],
                      delay: Math.random() * 0.25,
                    }
                  : {
                      duration: 0.4,
                      delay: tile.id * 0.004,
                      ease: 'easeOut',
                    }
              }
              style={{
                backgroundColor: tile.color,
                border: '1px solid rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Puzzle highlight sheen */}
              <div style={{
                position: 'absolute', inset: 0,
                boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.09), inset -1px -1px 0 rgba(0,0,0,0.25)',
                pointerEvents: 'none',
              }} />
              <span style={{
                fontSize: 'clamp(7px, 0.78vw, 12px)',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                color: tile.textColor,
                textAlign: 'center',
                padding: '0 3px',
                lineHeight: 1.2,
                userSelect: 'none',
              }}>
                {tile.word}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
