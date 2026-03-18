import { motion, AnimatePresence, useAnimation, useReducedMotion, animate } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import type { CupProps } from './cup.types';

export const StarbucksCup = ({ state, size = 280, onHealComplete, currentSection }: CupProps) => {
  const [hasRotated, setHasRotated] = useState(false);
  const [crumple, setCrumple] = useState(0);
  const crumpleRef = useRef(0);
  const prevSectionRef = useRef(currentSection);
  const writingControls = useAnimation();
  const rotationControls = useAnimation();
  const introControls = useAnimation();
  const glowControls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const controls = animate(crumpleRef.current, currentSection === 8 ? 80 : 0, {
      duration: 1.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (val) => {
        crumpleRef.current = val;
        setCrumple(val);
      }
    });
    return controls.stop;
  }, [currentSection]);

  const shadowIntensity = (crumple / 80) * 1.5;

  useEffect(() => {
    if (currentSection === 1) {
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
    } else if ((currentSection || 0) > 1) {
      introControls.set({ scale: 1, opacity: 1, y: 0 });
      glowControls.set({ opacity: state.isGlowing ? 0.4 : 0.1 });
    }
  }, [currentSection, introControls, glowControls, state.isGlowing, shouldReduceMotion]);

  useEffect(() => {
    if (prevSectionRef.current === 4 && currentSection === 5 && !hasRotated) {
      if (shouldReduceMotion) { setHasRotated(true); return; }
      rotationControls.start({ rotate: 360, transition: { duration: 1.8, ease: [0.65, 0, 0.35, 1] } })
        .then(() => setHasRotated(true));
    }
    prevSectionRef.current = currentSection;
  }, [currentSection, hasRotated, rotationControls, shouldReduceMotion]);

  useEffect(() => {
    if (state.isWriting) {
      if (shouldReduceMotion) { writingControls.set({ opacity: 1, strokeDashoffset: 0 }); return; }
      if (currentSection === 5 && !hasRotated) return;
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

  // Viewbox & Dimensions — Hot cup proportions
  const W = 340;
  const H = 400;
  const cx = W / 2;

  // Cup body — classic hot cup tapered shape (wider at bottom)
  const cupTopY = 60;
  const cupBotY = H - 40;
  const cupTopHalfW = 85;
  const cupBotHalfW = 105;

  // Hot cup Lid — flat dome with sipping tab
  const lidBotY = cupTopY + 2;
  const lidTopY = cupTopY - 28;
  const lidW = cupTopHalfW + 16;

  // Sleeve occupies middle third of body
  const sleeveTop = cupTopY + (cupBotY - cupTopY) * 0.35;
  const sleeveBotY = cupTopY + (cupBotY - cupTopY) * 0.68;
  const sleeveTopHalfW = cupTopHalfW + (cupBotHalfW - cupTopHalfW) * 0.35;
  const sleeveBotHalfW = cupTopHalfW + (cupBotHalfW - cupTopHalfW) * 0.68;

  const bodyPath = `M${cx - cupTopHalfW},${cupTopY} L${cx + cupTopHalfW},${cupTopY} L${cx + cupBotHalfW},${cupBotY} L${cx - cupBotHalfW},${cupBotY} Z`;
  const sleevePath = `M${cx - sleeveTopHalfW},${sleeveTop} L${cx + sleeveTopHalfW},${sleeveTop} L${cx + sleeveBotHalfW},${sleeveBotY} L${cx - sleeveBotHalfW},${sleeveBotY} Z`;

  const logoY = (sleeveTop + sleeveBotY) / 2;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10, overflow: 'visible' }}>
      <motion.div
        animate={introControls}
        initial={currentSection === 1 ? { scale: 0.05, opacity: 0 } : (currentSection === 0 ? { opacity: 0 } : { scale: 1, opacity: 1 })}
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
            style={{ width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0px 24px 48px rgba(0,0,0,0.55))' }}
            animate={{ rotate: state.tilt, x: 0 }}
          >
            <defs>
              {/* White cup body gradient */}
              <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c8d4ce" />
                <stop offset="25%" stopColor="#eef3f0" />
                <stop offset="55%" stopColor="#f9fcfa" />
                <stop offset="80%" stopColor="#e8f0ec" />
                <stop offset="100%" stopColor="#bfcec8" />
              </linearGradient>
              {/* Lid gradient — slightly warm white */}
              <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c0cbc7" />
                <stop offset="45%" stopColor="#e8edeb" />
                <stop offset="100%" stopColor="#b8c4c0" />
              </linearGradient>
              {/* Sleeve — dark green */}
              <linearGradient id="sleeveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1a3a2e" />
                <stop offset="35%" stopColor="#1e3932" />
                <stop offset="100%" stopColor="#152e24" />
              </linearGradient>
              {/* Liquid fill */}
              <linearGradient id="liquidGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#3d1c02" />
                <stop offset="100%" stopColor="#7c3a10" />
              </linearGradient>
              <clipPath id="cupClip"><path d={bodyPath} /></clipPath>
              {/* Crumple filter */}
              <filter id="crumpleFilter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale={crumple} xChannelSelector="R" yChannelSelector="G" result="displaced" />
                <feColorMatrix type="matrix" in="noise" result="shadows" values={`0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0 0 0 ${shadowIntensity} 0`} />
                <feComposite operator="in" in="shadows" in2="displaced" result="maskedShadows" />
                <feBlend mode="multiply" in="displaced" in2="maskedShadows" />
              </filter>
            </defs>

            {/* LIQUID FILL inside body */}
            <g clipPath="url(#cupClip)" filter="url(#crumpleFilter)">
              <motion.rect
                x={0} y={cupBotY} width={W}
                fill="url(#liquidGrad)"
                initial={{ height: 0 }}
                animate={{ height: `${state.fillLevel}%`, y: cupBotY - (state.fillLevel/100)*(cupBotY - cupTopY) }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </g>

            {/* CUP BODY */}
            <g filter="url(#crumpleFilter)">
              <path d={bodyPath} fill="url(#cupGrad)" opacity="0.96" />

              {/* THE LID — flat hot cup dome shape */}
              {/* Base ring of lid */}
              <rect
                x={cx - lidW} y={lidBotY - 10}
                width={lidW * 2} height={12}
                rx={4}
                fill="url(#lidGrad)"
              />
              {/* Dome top */}
              <ellipse cx={cx} cy={lidTopY + 6} rx={lidW - 4} ry={18} fill="url(#lidGrad)" />
              {/* Sip hole / tab */}
              <rect x={cx - 18} y={lidTopY - 2} width={36} height={10} rx={5} fill="#b0bfba" opacity="0.8" />
              <rect x={cx - 14} y={lidTopY} width={28} height={6} rx={3} fill="#8fa89e" opacity="0.6" />

              {/* SLEEVE */}
              <path d={sleevePath} fill="url(#sleeveGrad)" />

              {/* ── SIREN LOGO on sleeve ── */}
              <g transform={`translate(${cx}, ${logoY})`}>
                {/* Outer ring */}
                <circle r={30} fill="#00a862" />
                <circle r={28} fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
                {/* Stylized Siren — simplified iconic silhouette */}
                {/* Head */}
                <ellipse cx={0} cy={-10} rx={7} ry={8} fill="white" />
                {/* Crown/star */}
                <path d="M-5,-18 L0,-24 L5,-18" fill="white" stroke="white" strokeWidth="1" />
                <path d="M-9,-16 L-14,-20 L-10,-14" fill="white" stroke="white" strokeWidth="0.5" />
                <path d="M9,-16 L14,-20 L10,-14" fill="white" stroke="white" strokeWidth="0.5" />
                {/* Body / tail fins */}
                <path d="M-7,-3 Q-16,8 -22,18 Q-10,14 0,16 Q10,14 22,18 Q16,8 7,-3 Z" fill="white" />
                {/* Tail split */}
                <path d="M-14,14 Q-18,22 -22,26 Q-16,24 -10,22 Z" fill="white" opacity="0.7" />
                <path d="M14,14 Q18,22 22,26 Q16,24 10,22 Z" fill="white" opacity="0.7" />
                {/* Inner circle detail */}
                <circle r={12} fill="none" stroke="white" strokeWidth="0.8" opacity="0.4" />
              </g>

              {/* STARBUCKS COFFEE text above sleeve */}
              <motion.text
                x={cx}
                y={sleeveTop - 14}
                textAnchor="middle"
                fontSize="9"
                fontWeight="900"
                fontFamily="'Montserrat', sans-serif"
                fill="#1e3932"
                letterSpacing="4"
                animate={{
                  opacity: state.isGlowing ? [0.6, 1, 0.6] : 0.75,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                STARBUCKS
              </motion.text>
              <text
                x={cx}
                y={sleeveTop - 4}
                textAnchor="middle"
                fontSize="6"
                fontWeight="600"
                fontFamily="'Montserrat', sans-serif"
                fill="#1e3932"
                letterSpacing="3"
                opacity="0.55"
              >
                COFFEE
              </text>

              {/* ── HAND-DRAWN DOODLES on cup body (above sleeve) ── */}
              <g opacity="0.7" fontSize="12" fontFamily="'Segoe Script', 'Comic Sans MS', cursive" fill="#2a2a2a">
                {/* ENJOY text — handwritten style */}
                <text x={cx - 28} y={cupTopY + 36} fontSize="16" fontWeight="bold" fill="#1a1a1a" opacity="0.8"
                  style={{ fontFamily: "'Segoe Script', cursive", transform: 'rotate(-4deg)', transformOrigin: `${cx}px ${cupTopY + 36}px` }}>
                  Enjoy!
                </text>
                {/* Smiley face */}
                <circle cx={cx + 38} cy={cupTopY + 26} r={10} fill="none" stroke="#333" strokeWidth="1.5" />
                <circle cx={cx + 34} cy={cupTopY + 24} r={1.5} fill="#333" />
                <circle cx={cx + 42} cy={cupTopY + 24} r={1.5} fill="#333" />
                <path d={`M${cx+34},${cupTopY+30} Q${cx+38},${cupTopY+34} ${cx+42},${cupTopY+30}`} stroke="#333" strokeWidth="1.5" fill="none" />
                {/* Star doodle top left */}
                <text x={cx - 70} y={cupTopY + 28} fontSize="14" fill="#555" opacity="0.7">★</text>
                {/* Heart doodles */}
                <text x={cx - 68} y={cupTopY + 52} fontSize="13" fill="#c0392b" opacity="0.65">♥</text>
                <text x={cx + 52} y={cupTopY + 48} fontSize="11" fill="#c0392b" opacity="0.5">♥</text>
                {/* Small coffee cup icon doodle */}
                <rect x={cx - 62} y={cupTopY + 58} width={14} height={11} rx={2} fill="none" stroke="#555" strokeWidth="1.5" />
                <path d={`M${cx-48},${cupTopY+62} Q${cx-44},${cupTopY+62} ${cx-44},${cupTopY+66} Q${cx-44},${cupTopY+70} ${cx-48},${cupTopY+70}`} fill="none" stroke="#555" strokeWidth="1.5" />
                {/* Wavy steam lines above coffee doodle */}
                <path d={`M${cx-55},${cupTopY+56} Q${cx-53},${cupTopY+50} ${cx-55},${cupTopY+45}`} fill="none" stroke="#888" strokeWidth="1" />
                <path d={`M${cx-51},${cupTopY+56} Q${cx-49},${cupTopY+50} ${cx-51},${cupTopY+45}`} fill="none" stroke="#888" strokeWidth="1" />
                {/* Flower doodle top right area */}
                <circle cx={cx + 62} cy={cupTopY + 26} r={6} fill="none" stroke="#888" strokeWidth="1.2" />
                <circle cx={cx + 62} cy={cupTopY + 26} r={2} fill="#888" />
                <path d={`M${cx+62},${cupTopY+20} L${cx+62},${cupTopY+16}`} stroke="#888" strokeWidth="1.2" />
                <path d={`M${cx+68},${cupTopY+26} L${cx+72},${cupTopY+26}`} stroke="#888" strokeWidth="1.2" />
                <path d={`M${cx+62},${cupTopY+32} L${cx+62},${cupTopY+36}`} stroke="#888" strokeWidth="1.2" />
                <path d={`M${cx+56},${cupTopY+26} L${cx+52},${cupTopY+26}`} stroke="#888" strokeWidth="1.2" />
              </g>
            </g>

            {/* RECEIPT STICKER */}
            <motion.g animate={writingControls} initial={{ opacity: 0 }}>
              <rect x={cx - 50} y={cupTopY + 80} width="100" height="34" rx="2" fill="white" stroke="#ddd" strokeWidth="1" />
              <text x={cx - 44} y={cupTopY + 96} fontSize="7" fontWeight="900" fontFamily="monospace" fill="#111">
                {state.writeText.includes('•') ? state.writeText.split('•')[0].trim() : state.writeText}
              </text>
              <text x={cx - 44} y={cupTopY + 108} fontSize="6" fontWeight="700" fontFamily="monospace" fill="#777">
                {state.writeText.includes('•') ? state.writeText.split('•')[1].trim() : 'CUSTOM ORDER'}
              </text>
            </motion.g>

            {/* DATA CALLOUTS */}
            <AnimatePresence>
              {state.isOverflowing && (
                <g>
                  {[
                    { l: "MORNING RUSH", c: "#00a862", x: 20, y: 160, lx1: cx - cupTopHalfW + 10, ly1: 160, lx2: 110, ly2: 160 },
                    { l: "ALL WEEK",     c: "#c8a96e", x: 210, y: 160, lx1: cx + cupTopHalfW - 10, ly1: 160, lx2: 220, ly2: 160 },
                    { l: "EVERY DRINK", c: "#f5f0e8", x: cx-50, y: cupBotY + 18, lx1: cx, ly1: sleeveBotY + 5, lx2: cx, ly2: cupBotY + 18 }
                  ].map((s, i) => (
                    <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
                      <motion.line x1={s.lx1} y1={s.ly1} x2={s.lx2} y2={s.ly2}
                        stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      />
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
