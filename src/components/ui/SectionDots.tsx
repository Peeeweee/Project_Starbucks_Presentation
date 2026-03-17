import { motion } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

export const SectionDots = () => {
  const { currentSection, setCurrentSection, totalSections } = useSection();

  return (
    <div style={{
      position: 'fixed',
      right: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: 'center',
    }}>
      {Array.from({ length: totalSections }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentSection(i)}
          title={`Slide ${i + 1}`}
          style={{
            width: 24, height: 24,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            animate={{
              width: currentSection === i ? 8 : 4,
              height: currentSection === i ? 8 : 4,
              backgroundColor: currentSection === i ? '#00a862' : 'rgba(255,255,255,0.2)',
              boxShadow: currentSection === i ? '0 0 12px rgba(0,168,98,0.6)' : 'none',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 35 }}
            style={{ borderRadius: 99 }}
          />
        </button>
      ))}
    </div>
  );
};
