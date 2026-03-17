import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import React, { useEffect } from 'react';

export type InsightAnimationType = 'bounce' | 'rotate' | 'slide' | 'clock' | 'fill' | 'none';

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  borderColor: string;
  delay: number;
  originPosition: { x: number; y: number };
  animationType?: InsightAnimationType;
  onVisiblePulse?: boolean;
}

export const InsightCard = ({ 
  icon, 
  title, 
  body, 
  borderColor, 
  delay, 
  originPosition,
  animationType = 'bounce',
  onVisiblePulse = false
}: InsightCardProps) => {
  const iconControls = useAnimation();
  const cardControls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const triggerIconAnim = async () => {
      await new Promise(resolve => setTimeout(resolve, (delay + 0.8) * 1000));
      
      switch (animationType) {
        case 'bounce':
          await iconControls.start({ scale: [1, 1.3, 1], transition: { duration: 0.3 } });
          break;
        case 'rotate':
          await iconControls.start({ rotate: 360, transition: { duration: 0.6 } });
          break;
        case 'slide':
          await iconControls.start({ x: [-10, 10, 0], transition: { duration: 0.4 } });
          break;
        case 'clock':
          await iconControls.start({ rotate: 720, transition: { duration: 0.8, ease: "easeInOut" } });
          break;
        case 'fill':
          await iconControls.start({ scale: [1, 1.1, 1], opacity: [1, 0.7, 1], transition: { duration: 0.5 } });
          break;
      }
    };

    triggerIconAnim();
  }, [animationType, iconControls, delay, shouldReduceMotion]);

  useEffect(() => {
    if (onVisiblePulse && !shouldReduceMotion) {
      cardControls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 0.4 }
      });
    }
  }, [onVisiblePulse, cardControls, shouldReduceMotion]);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { 
        x: originPosition.x / 2, 
        y: originPosition.y / 2, 
        scale: 0.8, 
        opacity: 0 
      }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={cardControls}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ 
        delay: shouldReduceMotion ? 0 : delay, 
        duration: 0.8, 
        type: shouldReduceMotion ? "tween" : "spring", 
        stiffness: 80,
        damping: 15
      }}
      whileHover={{ 
        y: -3, 
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        backgroundColor: "#161616" 
      }}
      className="bg-[#111] p-6 md:p-8 rounded-xl border-l-[4px] shadow-lg relative group h-full transition-colors flex flex-col"
      style={{ borderLeftColor: borderColor, willChange: 'transform, opacity' }}
    >
      <motion.div 
        animate={iconControls}
        className="text-4xl mb-6 inline-block w-fit"
      >
        {icon}
      </motion.div>
      
      <h3 className="text-lg md:text-xl font-display font-bold text-offWhite mb-3 md:mb-4 group-hover:text-gold transition-colors">
        {title}
      </h3>
      
      <p className="text-[13px] md:text-sm text-muted leading-relaxed font-body flex-grow">
        {body}
      </p>

      {/* Subtle background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ 
          background: `radial-gradient(circle at top left, ${borderColor}, transparent 70%)` 
        }}
      />
    </motion.div>
  );
};
