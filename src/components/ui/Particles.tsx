import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

interface ParticlesProps {
  count?: number;
  color?: string;
  active?: boolean;
  type?: 'float' | 'burst';
}

export const Particles = ({ count = 25, color = '#00a862', active = true, type = 'float' }: ParticlesProps) => {
  const shouldReduceMotion = useReducedMotion();
  
  const particleArray = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * (type === 'burst' ? 4 : 2) + 2,
      startX: type === 'burst' ? 50 : Math.random() * 100,
      drift: (Math.random() - 0.5) * (type === 'burst' ? 60 : 15),
      duration: type === 'burst' ? 0.8 + Math.random() * 0.4 : 5 + Math.random() * 5,
      delay: type === 'burst' ? Math.random() * 0.2 : Math.random() * 5,
    }));
  }, [count, type]);

  if (!active || shouldReduceMotion) return null;

  return (
    <div className={`pointer-events-none z-0 ${type === 'float' ? 'fixed inset-0' : 'absolute inset-0'}`}>
      {particleArray.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: `${p.startX}%`, 
            y: type === 'burst' ? "50%" : "100vh", 
            opacity: 0,
            scale: 0
          }}
          animate={type === 'burst' ? {
            y: "-50%",
            x: `${p.startX + p.drift}%`,
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            rotate: [0, 180]
          } : { 
            y: ["100vh", "-10vh"],
            x: [`${p.startX}%`, `${p.startX + p.drift}%`],
            opacity: [0, 0.6, 0.6, 0],
            scale: 1
          }}
          transition={{
            duration: p.duration,
            repeat: type === 'burst' ? 0 : Infinity,
            delay: p.delay,
            ease: type === 'burst' ? "easeOut" : "linear"
          }}
          className="absolute"
          style={{ willChange: 'transform, opacity' }}
        >
           {type === 'burst' ? (
             <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={color}>
               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
             </svg>
           ) : (
             <div 
               className="rounded-full blur-[1px]" 
               style={{ 
                 width: p.size, 
                 height: p.size, 
                 backgroundColor: color 
               }} 
             />
           )}
        </motion.div>
      ))}
    </div>
  );
};
