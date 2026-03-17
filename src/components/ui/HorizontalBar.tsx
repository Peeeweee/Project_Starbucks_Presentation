import { motion, useReducedMotion } from 'framer-motion';
import { CountUp } from './CountUp';
import React from 'react';

interface HorizontalBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  displayValue?: string;
  delay: number;
  icon?: React.ReactNode;
}

export const HorizontalBar = ({ label, value, maxValue, color, delay, icon }: HorizontalBarProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full relative group" style={{ willChange: 'transform, opacity' }}>
      <div className="flex justify-between items-end mb-2 md:mb-3">
        <span className="text-[10px] md:text-[11px] uppercase font-bold text-muted tracking-[1px] md:tracking-[2px] group-hover:text-offWhite transition-colors">
          {label}
        </span>
        <span className="text-base md:text-lg font-display font-black text-offWhite translate-y-1">
           <CountUp from={0} to={value} duration={1200} />
        </span>
      </div>
      
      <div className="relative flex items-center h-1.5 md:h-2 w-full bg-white/5 rounded-full overflow-visible">
         <motion.div
           initial={{ width: "0%", opacity: 0 }}
           whileInView={{ width: `${percentage}%`, opacity: 1 }}
           viewport={{ once: true, margin: "0px 0px -10% 0px" }}
           transition={{ delay: shouldReduceMotion ? 0 : delay, duration: 1, ease: "easeOut" }}
           className="h-full rounded-full relative shadow-[0_0_15px_rgba(0,0,0,0.3)]"
           style={{ backgroundColor: color, willChange: 'width' }}
         >
            {/* Gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
            
            {/* Spinning Icon at the end of the bar */}
            {icon && !shouldReduceMotion && (
              <motion.div
                className="absolute right-[-8px] top-1/2 -translate-y-1/2 z-10 text-offWhite"
                initial={{ rotate: 0, scale: 0, opacity: 0 }}
                whileInView={{ rotate: 360, scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 1, duration: 0.5, ease: "backOut" }}
              >
                {icon}
              </motion.div>
            )}
         </motion.div>
      </div>
    </div>
  );
};
