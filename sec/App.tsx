import React, { useState } from 'react';
import { Timer, Settings, Trophy, RotateCcw } from 'lucide-react';
import SchulteTable from './components/SchulteTable';
import StatsDisplay from './components/StatsDisplay';

function App() {
  const [gridSize, setGridSize] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [timer, setTimer] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const startGame = () => {
    setGameStarted(true);
    setCurrentNumber(1);
    setTimer(0);
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    setTimerInterval(Number(interval));
  };

  const handleNumberClick = (number: number) => {
    if (number === currentNumber) {
      if (number === gridSize * gridSize) {
        clearInterval(timerInterval!);
        if (!bestTime || timer < bestTime) {
          setBestTime(timer);
        }
        setGameStarted(false);
      } else {
        setCurrentNumber(prev => prev + 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Schulte Table</h1>
            <p className="text-gray-600">Find numbers in ascending order as quickly as possible</p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-600" />
                <select 
                  className="bg-gray-100 rounded-lg px-3 py-2 text-gray-700"
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  disabled={gameStarted}
                >
                  <option value={3}>3x3</option>
                  <option value={4}>4x4</option>
                  <option value={5}>5x5</option>
                  <option value={6}>6x6</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-gray-600" />
                <span className="text-xl font-mono">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={startGame}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                disabled={gameStarted}
              >
                {gameStarted ? 'Playing...' : 'Start Game'}
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex-1">
              <SchulteTable 
                size={gridSize}
                onNumberClick={handleNumberClick}
                currentNumber={currentNumber}
                gameStarted={gameStarted}
              />
            </div>
            
            <div className="w-64">
              <StatsDisplay
                currentNumber={currentNumber}
                totalNumbers={gridSize * gridSize}
                bestTime={bestTime}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;