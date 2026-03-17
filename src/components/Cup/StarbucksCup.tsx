import { motion, AnimatePresence, useAnimation, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import type { CupProps } from './cup.types';

export const StarbucksCup = ({ state, size = 280, onHealComplete, currentSection }: CupProps) => {
  const [hasRotated, setHasRotated] = useState(false);
  const prevSectionRef = useRef(currentSection);
  const writingControls = useAnimation();
  const rotationControls = useAnimation();
  const introControls = useAnimation();
  const glowControls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (currentSection === 0) {
      if (shouldReduceMotion) { introControls.set({ scale: 1, opacity: 1, y: 0 }); glowControls.set({ opacity: 0.15 }); return; }
      const run = async () => {
        await new Promise(r => setTimeout(r, 450));
        await introControls.start({ 
          y: [30, 0],
          scale: [0.98, 1], 
          opacity: [0, 1], 
          transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } 
        });
        glowControls.start({ opacity: 0.2, transition: { duration: 2.5 } });
      };
      run();
    } else {
      introControls.set({ scale: 1, opacity: 1, y: 0 });
      glowControls.set({ opacity: state.isGlowing ? 0.4 : 0.1 });
    }
  }, [currentSection, introControls, glowControls, state.isGlowing, shouldReduceMotion]);

  useEffect(() => {
    if (prevSectionRef.current === 2 && currentSection === 3 && !hasRotated) {
      if (shouldReduceMotion) { setHasRotated(true); return; }
      rotationControls.start({ rotate: 360, transition: { duration: 1.8, ease: [0.65, 0, 0.35, 1] } })
        .then(() => setHasRotated(true));
    }
    prevSectionRef.current = currentSection;
  }, [currentSection, hasRotated, rotationControls, shouldReduceMotion]);

  useEffect(() => {
    if (state.isWriting) {
      if (shouldReduceMotion) { writingControls.set({ opacity: 1, strokeDashoffset: 0 }); return; }
      if (currentSection === 3 && !hasRotated) return;
      writingControls.start({
        strokeDashoffset: 0, opacity: 1,
        transition: { strokeDashoffset: { duration: 1.5, ease: "linear" }, opacity: { delay: 1.5, duration: 0.3 } }
      });
    } else {
      writingControls.start({ opacity: 0, transition: { duration: 0.3 } });
    }
  }, [state.isWriting, writingControls, currentSection, hasRotated, shouldReduceMotion]);

  useEffect(() => {
    if (state.isHealing) {
      const run = async () => {
        await new Promise(r => setTimeout(r, shouldReduceMotion ? 0 : 2500));
        onHealComplete?.();
      };
      run();
    }
  }, [state.isHealing, onHealComplete, shouldReduceMotion]);

  // Viewbox & Dimensions
  const W = 400; // Even wider for label safety
  const H = 340; 
  const cx = W / 2;

  const bodyTopW = 110;
  const bodyBotW = 126;
  const rimY = 40;
  const bodyBotY = H - 50;

  const TL = cx - bodyTopW / 2;
  const TR = cx + bodyTopW / 2;
  const BL = cx - bodyBotW / 2;
  const BR = cx + bodyBotW / 2;

  const bodyPath = `M${TL},${rimY} L${TR},${rimY} L${BR},${bodyBotY} L${BL},${bodyBotY} Z`;
  const lidTopY = rimY - 14;
  const lidW = bodyTopW + 10;
  const lidPath = `M${cx - lidW/2},${rimY + 2} L${cx + lidW/2},${rimY + 2} L${cx + lidW/2 - 4},${lidTopY + 2} L${cx - lidW/2 + 4},${lidTopY + 2} Z`;
  
  const strawX = cx + 18;
  const strawPath = `M${strawX - 4},${lidTopY - 4} L${strawX + 4},${lidTopY - 4} L${strawX + 5},${lidTopY - 120} L${strawX - 5},${lidTopY - 120} Z`;

  const sleeveTop = rimY + (bodyBotY - rimY) * 0.34;
  const sleeveBotY = rimY + (bodyBotY - rimY) * 0.76;
  const sleevePath = `M${TL + (BL - TL) * 0.34},${sleeveTop} L${TR + (BR - TR) * 0.34},${sleeveTop} L${TR + (BR - TR) * 0.76},${sleeveBotY} L${TL + (BL - TL) * 0.76},${sleeveBotY} Z`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10, overflow: 'visible' }}>
      <motion.div
        animate={introControls}
        initial={currentSection === 0 ? { scale: 0.05, opacity: 0 } : { scale: 1, opacity: 1 }}
        style={{ width: size * (W/200), height: size * (H/200), willChange: 'transform, opacity', position: 'relative' }}
      >
        {/* ATMOSPHERIC GLOW */}
        <motion.div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: size * 2.2, height: size * 2.2,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${state.glowColor} at center, transparent 75%)`,
            willChange: 'opacity',
            zIndex: 0,
          }}
          animate={{ opacity: state.isGlowing ? 0.35 : 0.08 }}
        />

        <motion.div animate={rotationControls} style={{ width: '100%', height: '100%', position: 'relative' }}>
          <motion.svg
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0px 32px 64px rgba(0,0,0,0.65))' }}
            animate={{ rotate: state.tilt, x: 0 }}
          >
            <defs>
              <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d0ddd6" />
                <stop offset="50%" stopColor="#f8fdf9" />
                <stop offset="100%" stopColor="#b8cfc0" />
              </linearGradient>
              <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a3a2e" />
                <stop offset="40%" stopColor="#1e3932" />
                <stop offset="100%" stopColor="#152e24" />
              </linearGradient>
              <linearGradient id="sleeveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a3a2e" />
                <stop offset="30%" stopColor="#00a862" />
                <stop offset="100%" stopColor="#152e24" />
              </linearGradient>
              <linearGradient id="liquidGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#004d2e" />
                <stop offset="100%" stopColor="#00a862" />
              </linearGradient>
              <clipPath id="cupClip"><path d={bodyPath} /></clipPath>
            </defs>

            {/* LIQUID FILL */}
            <g clipPath="url(#cupClip)">
              <motion.rect
                x={0} y={bodyBotY} width={W}
                fill="url(#liquidGrad)"
                initial={{ height: 0 }}
                animate={{ height: `${state.fillLevel}%`, y: bodyBotY - (state.fillLevel/100)*(bodyBotY-rimY) }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </g>

            {/* BODY */}
            <path d={bodyPath} fill="url(#cupGrad)" opacity="0.95" />
            <path d={sleevePath} fill="url(#sleeveGrad)" />
            
            {/* LOGO */}
            <g transform={`translate(${cx}, ${(sleeveTop + sleeveBotY) / 2})`}>
              <circle r="28" fill="#00a862" />
              <circle r="26" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
              <ellipse cx="0" cy="-6" rx="6" ry="7" fill="white" />
              <path d="M-8,-1 Q-10,10 -15,14 Q0,10 15,14 Q10,10 8,-1 Z" fill="white" />
            </g>

            {/* BRANDING TEXT */}
            <motion.text 
              x={cx} 
              y={sleeveTop - 16} 
              textAnchor="middle" 
              fontSize="8.5" 
              fontWeight="900" 
              fontFamily="'Montserrat', sans-serif" 
              fill="white" 
              letterSpacing="3.5" 
              animate={{
                opacity: state.isGlowing ? [0.5, 0.9, 0.5] : 0.6,
                filter: state.isGlowing 
                  ? ['drop-shadow(0px 0px 2px rgba(255,255,255,0.2))', 'drop-shadow(0px 0px 8px rgba(255,255,255,0.6))', 'drop-shadow(0px 0px 2px rgba(255,255,255,0.2))']
                  : 'drop-shadow(0px 0px 1px rgba(255,255,255,0.1))'
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              STARBUCKS
            </motion.text>

            {/* LID & STRAW */}
            <path d={lidPath} fill="url(#lidGrad)" />
            <path d={strawPath} fill="#00704a" />

            {/* THE "RECEIPT" STICKER (Formatted & Centered) */}
            <motion.g animate={writingControls} initial={{ opacity: 0 }}>
              <rect x={cx - 50} y={rimY + 8} width="100" height="34" rx="1" fill="white" stroke="#eee" />
              <text x={cx - 45} y={rimY + 22} fontSize="7" fontWeight="900" fontFamily="monospace" fill="#111">
                {state.writeText.includes('•') ? state.writeText.split('•')[0].trim() : state.writeText}
              </text>
              <text x={cx - 45} y={rimY + 36} fontSize="6" fontWeight="700" fontFamily="monospace" fill="#777">
                {state.writeText.includes('•') ? state.writeText.split('•')[1].trim() : 'CUSTOM ORDER'}
              </text>
            </motion.g>

            {/* STANDARDIZED DATA CALLOUTS (No conflict format) */}
            <AnimatePresence>
              {state.isOverflowing && (
                <g>
                  {[
                    /* LEFT CALLOUT */
                    { l: "MORNING RUSH", c: "#00a862", x: 40, y: 140, lx1: TL+10, ly1: 140, lx2: 120, ly2: 140 },
                    /* RIGHT CALLOUT */
                    { l: "ALL WEEK", c: "#c8a96e", x: 260, y: 140, lx1: TR-10, ly1: 140, lx2: 260, ly2: 140 },
                    /* BOTTOM CALLOUT */
                    { l: "EVERY DRINK", c: "#f5f0e8", x: cx-50, y: bodyBotY + 22, lx1: cx, ly1: sleeveBotY+5, lx2: cx, ly2: bodyBotY+22 }
                  ].map((s, i) => (
                    <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
                      {/* Leader Line */}
                      <motion.line 
                        x1={s.lx1} y1={s.ly1} x2={s.lx2} y2={s.ly2} 
                        stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} 
                      />
                      {/* Standard Format Tag */}
                      <rect x={s.x} y={s.y} width="100" height="22" rx="2" fill="#080808" stroke={s.c} strokeWidth="2" />
                      <text x={s.x + 50} y={s.y + 14} textAnchor="middle" fontSize="9" fontWeight="900" fill="white" fontFamily="sans-serif" letterSpacing="0.1em">{s.l}</text>
                    </motion.g>
                  ))}
                </g>
              )}
            </AnimatePresence>

          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
};
