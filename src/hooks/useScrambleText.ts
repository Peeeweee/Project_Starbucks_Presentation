import { useState, useEffect } from 'react';

export const useScrambleText = (targetText: string, triggered: boolean) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+-=/?';

  useEffect(() => {
    if (!triggered) {
      setDisplayText('');
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, [targetText, triggered]);

  return displayText;
};
