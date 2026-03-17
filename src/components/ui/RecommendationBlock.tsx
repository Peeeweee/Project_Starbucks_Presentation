import { motion, useReducedMotion } from 'framer-motion';

interface RecommendationBlockProps {
  number: string;
  title: string;
  body: string;
  delay: number;
  onVisible?: () => void;
}

export const RecommendationBlock = ({ number, title, body, delay, onVisible }: RecommendationBlockProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      onAnimationComplete={() => onVisible?.()}
      transition={{ delay: shouldReduceMotion ? 0 : delay, duration: 0.7 }}
      whileHover={{ y: -3 }}
      className="flex gap-6 md:gap-10 group items-start p-6 rounded-3xl transition-all border border-transparent hover:border-white/5 hover:bg-white/[0.02]"
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div
        initial={{ color: "#f5f0e8" }}
        whileInView={{ color: "#00a862" }}
        viewport={{ once: true }}
        transition={{ delay: shouldReduceMotion ? 0 : delay + 0.3, duration: 0.3 }}
        className="text-[48px] md:text-[80px] font-display font-black leading-[0.8] select-none opacity-90"
      >
        {number}
      </motion.div>
      
      <div className="flex flex-col pt-2">
        <h3 className="text-xl md:text-2xl font-display font-bold text-offWhite mb-3 md:mb-4 group-hover:text-brightGreen transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-[14px] md:text-base text-muted font-body leading-relaxed max-w-xl">
          {body}
        </p>
      </div>
    </motion.div>
  );
};
