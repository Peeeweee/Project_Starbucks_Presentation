import { motion, useSpring, useTransform } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

export const ScrollProgress = () => {
  const { currentSection, totalSections } = useSection();
  const progress = currentSection / (totalSections - 1);

  const scaleY = useSpring(progress, { stiffness: 100, damping: 30 });
  const dotTop = useTransform(scaleY, [0, 1], ['0%', '100%']);

  return (
    <div className="fixed left-0 top-0 h-screen w-[3px] bg-white/5 z-[200] pointer-events-none">
      <motion.div
        className="absolute top-0 left-0 w-full bg-[#00a862] origin-top"
        style={{ scaleY, willChange: 'transform' }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00a862]"
        style={{ top: dotTop, marginTop: -4, boxShadow: '0 0 10px rgba(0,168,98,0.8)', willChange: 'top' }}
      />
    </div>
  );
};
