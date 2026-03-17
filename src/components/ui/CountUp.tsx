import { useEffect, useState } from 'react';
import { useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  from: number;
  to: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const CountUp = ({ from, to, duration, prefix = '', suffix = '', decimals = 0 }: CountUpProps) => {
  const { ref, inView } = useInView({ 
    threshold: 0.2, 
    triggerOnce: true,
    rootMargin: "0px 0px -10% 0px"
  });
  const count = useMotionValue(from);
  const shouldReduceMotion = useReducedMotion();
  
  const display = useTransform(count, (latest) => {
    const formatted = latest.toFixed(decimals);
    const value = `${prefix}${formatted}${suffix}`;
    return value;
  });

  const [current, setCurrent] = useState(`${prefix}${from.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (inView) {
      if (shouldReduceMotion) {
        count.set(to);
        setCurrent(`${prefix}${to.toFixed(decimals)}${suffix}`);
        return;
      }

      const controls = animate(count, to, {
        duration: duration / 1000,
        ease: [0.165, 0.84, 0.44, 1],
      });
      return controls.stop;
    }
  }, [inView, count, to, duration, shouldReduceMotion, decimals, prefix, suffix]);

  useEffect(() => {
    return display.onChange((v) => setCurrent(v));
  }, [display]);

  return <span ref={ref}>{current}</span>;
};
