import { useState, useEffect, useRef } from 'react'

interface UseTimerProps {
  duration: number;
  isActive: boolean;
}

export function useTimer({ duration, isActive }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsComplete(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const reset = () => {
    setTimeLeft(duration);
    setIsComplete(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return {
    timeLeft,
    isComplete,
    reset,
  };
}