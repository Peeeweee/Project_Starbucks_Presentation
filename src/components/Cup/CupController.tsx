import { useCupState } from '../../hooks/useCupState';
import { StarbucksCup } from './StarbucksCup';
import { useSection } from '../../context/SectionContext';
import { useState, useEffect } from 'react';

export const CupController = () => {
  const { currentSection, healingProgress } = useSection();
  const state = useCupState(currentSection);
  const [size, setSize] = useState(window.innerWidth < 768 ? 220 : 360);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth < 768 ? 220 : 360);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <StarbucksCup
        state={state}
        size={size}
        currentSection={currentSection}
        healingProgress={healingProgress}
      />
    </div>
  );
};
