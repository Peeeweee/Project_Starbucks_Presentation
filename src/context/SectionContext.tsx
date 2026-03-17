import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { CupState } from '../components/Cup/cup.types';

interface SectionContextType {
  currentSection: number;
  setCurrentSection: (section: number) => void;
  nextSection: () => void;
  prevSection: () => void;
  cupState: CupState | null;
  setCupState: (state: CupState | null) => void;
  healingProgress: number;
  setHealingProgress: (progress: number) => void;
  totalSections: number;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [cupState, setCupState] = useState<CupState | null>(null);
  const [healingProgress, setHealingProgress] = useState(0);
  const totalSections = 8; // Opening, Problem, Demo, Behavioral, Ordering, Insights, Recs, Closing

  const nextSection = () => {
    setCurrentSection((prev) => Math.min(prev + 1, totalSections - 1));
  };

  const prevSection = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSection();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SectionContext.Provider value={{ 
      currentSection, 
      setCurrentSection,
      nextSection,
      prevSection,
      cupState,
      setCupState,
      healingProgress,
      setHealingProgress,
      totalSections
    }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};
