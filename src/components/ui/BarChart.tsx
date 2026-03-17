import { motion, useReducedMotion } from 'framer-motion';
import { CountUp } from './CountUp';

interface BarData {
  label: string;
  value: number;
  color?: string;
  displayValue?: string;
}

interface BarChartProps {
  bars: BarData[];
  delay?: number;
}

export const BarChart = ({ bars, delay = 0 }: BarChartProps) => {
  const maxVal = Math.max(...bars.map(b => b.value), 1);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex items-end justify-between h-56 md:h-72 gap-3 md:gap-6 w-full pt-12" style={{ willChange: 'transform, opacity' }}>
      {bars.map((bar, i) => {
        const barColor = bar.color || (i === 1 ? "#00a862" : "#333");
        
        return (
          <div key={i} className="relative flex flex-col items-center flex-1 h-full group">
            {/* Numeric Label */}
            <div className="absolute -top-10 text-offWhite font-display font-bold text-base md:text-lg">
               <CountUp from={0} to={bar.value} duration={1500} />
            </div>

            {/* Vertical Bar */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ 
                delay: shouldReduceMotion ? 0 : delay + (i * 0.08), 
                duration: 0.9, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
              className="w-full relative rounded-t-lg md:rounded-t-xl overflow-hidden flex flex-col justify-end"
              style={{ 
                height: `${(bar.value / maxVal) * 100}%`,
                backgroundColor: barColor,
                transformOrigin: "bottom",
                willChange: 'transform, opacity'
              }}
            >
              {/* Shimmer sweep */}
              {barColor === "#00a862" && !shouldReduceMotion && (
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: delay + (bars.length * 0.1) + 0.9, 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              )}
              
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
            </motion.div>

            {/* Bottom Label */}
            <div className="mt-4 md:mt-6 text-[9px] md:text-[10px] uppercase font-bold text-muted tracking-[1px] md:tracking-[2px] text-center w-full transform group-hover:text-gold transition-colors">
              {bar.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
