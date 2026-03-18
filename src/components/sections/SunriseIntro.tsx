import { motion } from 'framer-motion';
import { useSection } from '../../context/SectionContext';

export const SunriseIntro = ({ index }: { index: number }) => {
  const { currentSection } = useSection();
  const isActive = currentSection === index;

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 20
    }}>
      {/* THE TYPOGRAPHY */}
      <div style={{ zIndex: 10, position: 'absolute', bottom: '10vh', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={isActive ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, filter: 'blur(8px)' }}
          transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#ffc87a',
            fontSize: 'clamp(11px, 1.2vw, 15px)',
            fontWeight: 800,
            margin: '0 0 16px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.6)'
          }}>
            The Global Ritual
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: 'clamp(44px, 5.5vw, 84px)',
            color: '#fff',
            margin: 0,
            lineHeight: 1.15,
            textShadow: '0 8px 32px rgba(0,0,0,0.8)'
          }}>
            The first decision <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#f5dcb3' }}>of the day.</span>
          </h2>
        </motion.div>
      </div>
      
    </div>
  );
};
