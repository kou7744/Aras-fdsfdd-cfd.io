import React from 'react';
import { Trophy, Target } from 'lucide-react';

interface StatsDisplayProps {
  currentNumber: number;
  totalNumbers: number;
  bestTime: number | null;
}

function StatsDisplay({ currentNumber, totalNumbers, bestTime }: StatsDisplayProps) {
  const progress = ((currentNumber - 1) / totalNumbers) * 100;

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-600">Progress</span>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1 text-sm text-gray-600 text-right">
            {currentNumber - 1} / {totalNumbers}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-gray-600">Best Time</span>
          </div>
          <div className="text-2xl font-mono text-gray-800">
            {bestTime ? (
              `${Math.floor(bestTime / 60)}:${(bestTime % 60).toString().padStart(2, '0')}`
            ) : (
              '--:--'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsDisplay;