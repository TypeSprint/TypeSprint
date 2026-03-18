import { useState } from 'react'
import { generateWords } from '../constants/words'
import { useTypingGame } from '../hooks/useTypingGame'

const DURATIONS = [15, 30, 60, 120];

export function TypingTest() {
  const [targetText, setTargetText] = useState(() => generateWords(50));
  const [duration, setDuration] = useState(60);
  
  const { userInput, timeLeft, isComplete, isActive, stats, restart } = useTypingGame({ 
    targetText,
    duration
  });

  const handleRestart = () => {
    setTargetText(generateWords(50));
    restart();
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    handleRestart();
  };

  return (
    <div>
      {/* Duration Selector */}
      <div className="flex justify-center gap-2 mb-8">
        {DURATIONS.map((dur) => (
          <button
            key={dur}
            onClick={() => handleDurationChange(dur)}
            disabled={isActive}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              duration === dur
                ? 'bg-yellow-500 text-gray-900'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {dur}s
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="flex justify-between items-center mb-8">
        {/* WPM */}
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">WPM</div>
          <div className="text-4xl font-bold text-blue-400">
            {stats.wpm}
          </div>
        </div>

        {/* Timer */}
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">Time</div>
          <div className="text-6xl font-bold text-yellow-400">
            {timeLeft}
          </div>
        </div>

        {/* Accuracy */}
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">Accuracy</div>
          <div className="text-4xl font-bold text-green-400">
            {stats.accuracy}%
          </div>
        </div>
      </div>

      {/* Typing Area */}
      <div className="text-2xl leading-relaxed font-mono p-6 bg-gray-800 rounded-lg">
        {targetText.split('').map((char, index) => {
          let color = 'text-gray-500';
          
          if (index < userInput.length) {
            color = userInput[index] === char ? 'text-white' : 'text-red-500';
          }
          
          const isCursor = index === userInput.length;
          
          return (
            <span 
              key={index} 
              className={`${color} ${isCursor && !isComplete ? 'bg-white bg-opacity-20 animate-pulse' : ''}`}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Restart Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleRestart}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-colors"
        >
          Restart
        </button>
      </div>

      {/* Test Complete Message */}
      {isComplete && (
        <div className="mt-8 text-center">
          <p className="text-3xl font-bold text-green-400 mb-4">Time's Up!</p>
          <div className="text-xl text-gray-300">
            <p>Final WPM: <span className="text-blue-400 font-bold">{stats.wpm}</span></p>
            <p>Accuracy: <span className="text-green-400 font-bold">{stats.accuracy}%</span></p>
          </div>
        </div>
      )}
    </div>
  );
}