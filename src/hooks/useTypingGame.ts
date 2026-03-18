import { useState, useEffect, useMemo } from 'react'
import { useTimer } from './useTimer'
import { calculateWPM, calculateAccuracy, getCharStats } from '../utils/calculations'

interface UseTypingGameProps {
  targetText: string;
  duration?: number;
}

export function useTypingGame({ targetText, duration = 60 }: UseTypingGameProps) {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const { timeLeft, isComplete, reset: resetTimer } = useTimer({ 
    duration, 
    isActive 
  });

  // Update elapsed time when active
  useEffect(() => {
    if (!isActive || !startTime) {
      return;
    }

    const interval = setInterval(() => {
      setTimeElapsed((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const stats = useMemo(() => {
    const charStats = getCharStats(userInput, targetText);
    
    return {
      ...charStats,
      wpm: calculateWPM(charStats.correctChars, timeElapsed),
      accuracy: calculateAccuracy(charStats.correctChars, charStats.totalChars),
    };
  }, [userInput, targetText, timeElapsed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete) {
        return;
      }

      if (userInput.length >= targetText.length) {
        return;
      }

      if (!isActive && e.key.length === 1) {
        setIsActive(true);
        setStartTime(Date.now());
      }

      if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
        return;
      }

      if (e.key.length === 1) {
        setUserInput(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, isComplete, userInput.length, targetText.length]);

  const restart = () => {
    setUserInput('');
    setStartTime(null);
    setTimeElapsed(0);
    setIsActive(false);
    resetTimer();
  };

  return {
    userInput,
    startTime,
    isActive,
    timeLeft,
    isComplete,
    stats,
    restart,
  };
}