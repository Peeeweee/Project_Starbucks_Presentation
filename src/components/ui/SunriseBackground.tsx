import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

export const SunriseBackground = () => {
  const { currentSection } = useSection();

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#050608' }}>
      
      {/* 1. THE NIGHT SKY — visible on Slide 0 only, fades out on Slide 1 */}
      <AnimatePresence>
        {currentSection <= 1 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: currentSection === 0 ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 100%, #171124 0%, #050608 100%)',
              zIndex: 1
            }}
          >
            {/* Procedural Stars */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                initial={{ opacity: Math.random() }}
                animate={{ opacity: [Math.random(), 1, Math.random()] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. VIOLET DAWN — fades in on Slide 1, fades out before Slide 2 */}
      <motion.div
        animate={{ opacity: currentSection === 1 ? 1 : 0 }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 110%, #9d4edd 0%, #7b2cbf 22%, #5a189a 44%, #240046 70%, transparent 100%)',
          zIndex: 2
        }}
      />

      {/* 3. VIOLET GLOW ORB — rises on Slide 1 */}
      <motion.div
        animate={{ 
          y: currentSection === 1 ? -60 : 200, 
          opacity: currentSection === 1 ? 0.5 : 0,
          scale: currentSection === 1 ? 1 : 0.4
        }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          maxWidth: 700,
          maxHeight: 700,
          marginLeft: '-30vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(157, 78, 221, 0.55) 0%, rgba(90, 24, 154, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 3
        }}
      />

      {/* 4. ORANGE SUNRISE — fades in on Slide 2, then fades out on Slide 3+ */}
      <motion.div
        animate={{ opacity: currentSection === 2 ? 1 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 110%, #ff8c42 0%, #f4a261 22%, #e76f51 44%, #1a0f14 75%, transparent 100%)',
          zIndex: 2
        }}
      />

      {/* 5. ORANGE/GOLDEN GLOW ORB — rises on Slide 2 */}
      <motion.div
        animate={{ 
          y: currentSection === 2 ? -80 : 200, 
          opacity: currentSection === 2 ? 0.5 : 0,
          scale: currentSection === 2 ? 1 : 0.4
        }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          maxWidth: 700,
          maxHeight: 700,
          marginLeft: '-30vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 200, 100, 0.5) 0%, rgba(225, 120, 50, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 3
        }}
      />
    </div>
  );
};
