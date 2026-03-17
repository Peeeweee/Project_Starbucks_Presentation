import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

const map: Record<number, string> = {
  0: '',
  1: 'All Presenters',
  2: 'Earl Josh Delgado — Demographics',
  3: 'Kent Paulo Delgado — Behavior',
  4: 'John Renan Labay — Patterns',
  5: 'All Presenters — Key Insights',
  6: 'All Presenters — Recommendations',
  7: 'All Presenters',
};

export const PresenterTag = () => {
  const { currentSection } = useSection();
  const text = map[currentSection] || '';

  return (
    <div style={{ position: 'fixed', bottom: 28, left: 20, zIndex: 200, pointerEvents: 'none' }}>
      <AnimatePresence mode="wait">
        {text && (
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <div style={{ width: 5, height: 5, borderRadius: 99, background: '#00a862' }} />
            <span style={{ fontSize: 9, fontWeight: 800, color: '#333', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
