import { useState, useEffect, useMemo } from 'react';
import { useSpring, useMotionValueEvent } from 'framer-motion';
import type { CupState } from '../components/Cup/cup.types';
import { useSection } from '../context/SectionContext';

const SECTION_CUP_STATES: Record<number, CupState> = {
  0: { // Opening
    fillLevel: 0,
    isSteaming: false,
    isWriting: false,
    writeText: '',
    crackLevel: 0,
    isHealing: false,
    isOverflowing: false,
    isGlowing: true,
    glowColor: '#00a862',
    tilt: 0,
    isShaking: false
  },
  1: { // Problem
    fillLevel: 20,
    isSteaming: false,
    isWriting: false,
    writeText: '',
    crackLevel: 1,
    isHealing: false,
    isOverflowing: false,
    isGlowing: false,
    glowColor: '#00a862',
    tilt: 0,
    isShaking: false
  },
  2: { // Demographics
    fillLevel: 50,
    isSteaming: true,
    isWriting: false,
    writeText: '',
    crackLevel: 1,
    isHealing: false,
    isOverflowing: false,
    isGlowing: false,
    glowColor: '#00a862',
    tilt: 0,
    isShaking: false
  },
  3: { // Behavioral
    fillLevel: 70,
    isSteaming: true,
    isWriting: true,
    writeText: '47.7% Members • Customize Everything',
    crackLevel: 1,
    isHealing: false,
    isOverflowing: false,
    isGlowing: false,
    glowColor: '#00a862',
    tilt: 0,
    isShaking: false
  },
  4: { // Ordering
    fillLevel: 100,
    isSteaming: true,
    isWriting: true,
    writeText: '47.7% Members • Customize Everything',
    crackLevel: 1,
    isHealing: false,
    isOverflowing: true,
    isGlowing: false,
    glowColor: '#00a862',
    tilt: 0,
    isShaking: true
  },
  5: { // Insights
    fillLevel: 100,
    isSteaming: false,
    isWriting: false,
    writeText: '',
    crackLevel: 2,
    isHealing: false,
    isOverflowing: false,
    isGlowing: true,
    glowColor: '#ff6b35',
    tilt: -5,
    isShaking: true
  },
  6: { // Recommendations
    fillLevel: 100,
    isSteaming: false,
    isWriting: false,
    writeText: '',
    crackLevel: 2,
    isHealing: false,
    isOverflowing: false,
    isGlowing: true,
    glowColor: '#00a862',
    tilt: 0,
    isShaking: false
  },
  7: { // Closing
    fillLevel: 100,
    isSteaming: true,
    isWriting: false,
    writeText: '',
    crackLevel: 0,
    isHealing: false,
    isOverflowing: false,
    isGlowing: true,
    glowColor: '#00a862',
    tilt: 0,
    isShaking: false
  }
};

export const useCupState = (currentSection: number): CupState => {
  const { cupState: customCupState } = useSection();
  const [debouncedSection, setDebouncedSection] = useState(currentSection);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSection(currentSection);
    }, 100);

    return () => clearTimeout(handler);
  }, [currentSection]);

  const targetState = useMemo(() => {
    if (customCupState) return customCupState;
    return SECTION_CUP_STATES[debouncedSection] || SECTION_CUP_STATES[0];
  }, [debouncedSection, customCupState]);

  const fillSpring = useSpring(targetState.fillLevel, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentFillLevel, setCurrentFillLevel] = useState(targetState.fillLevel);

  useEffect(() => {
    fillSpring.set(targetState.fillLevel);
  }, [targetState.fillLevel, fillSpring]);

  useMotionValueEvent(fillSpring, "change", (latest) => {
    setCurrentFillLevel(latest);
  });

  return {
    ...targetState,
    fillLevel: currentFillLevel
  };
};
