import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

interface StatCardProps {
  number: React.ReactNode;
  label: string;
  source?: string;
  borderColor: string;
  delay?: number;
  strikethrough?: boolean;
}

export const StatCard = ({ number, label, source, borderColor, delay = 0, strikethrough = false }: StatCardProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { x: -30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delay: shouldReduceMotion ? 0 : delay, duration: 0.7 }}
      className="bg-[#111] p-5 rounded-[8px] border-l-[4px] relative flex flex-col justify-center min-w-[140px]"
      style={{ borderLeftColor: borderColor, willChange: 'transform, opacity' }}
    >
      <div className="font-display font-black text-offWhite leading-none">{number}</div>
      
      <div className="relative inline-block mt-1">
        <span className="text-[10px] uppercase tracking-[1px] md:tracking-[2px] text-muted font-bold whitespace-nowrap">
          {label}
        </span>
        {strikethrough && (
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : delay + 0.6, duration: 0.6, ease: "easeInOut" }}
            className="absolute top-[55%] left-0 h-[1.5px] bg-brightGreen origin-left"
          />
        )}
      </div>

      {source && (
        <div className="mt-3 pt-3 border-t border-white/5">
           <span className="text-[9px] text-muted/40 italic uppercase tracking-tighter">
             Source: {source}
           </span>
        </div>
      )}
    </motion.div>
  );
};
