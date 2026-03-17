import { useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

export const SceneCut = () => {
  const { currentSection } = useSection();
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const triggerFlash = async () => {
      const isSection7 = currentSection === 7;

      if (isSection7) {
        await controls.start({
          opacity: 1,
          transition: { duration: 0.1 }
        });
        await new Promise(resolve => setTimeout(resolve, 500));
        await controls.start({
          opacity: 0,
          transition: { duration: 0.3 }
        });
      } else {
        await controls.start({
          opacity: 0.6,
          transition: { duration: 0.1 }
        });
        await new Promise(resolve => setTimeout(resolve, 150));
        await controls.start({
          opacity: 0,
          transition: { duration: 0.15 }
        });
      }
    };

    if (currentSection !== 0) {
      triggerFlash();
    }
  }, [currentSection, controls, shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ 
        backgroundColor: currentSection === 6 ? '#00a862' : '#1e3932',
        willChange: 'opacity'
      }}
    />
  );
};
