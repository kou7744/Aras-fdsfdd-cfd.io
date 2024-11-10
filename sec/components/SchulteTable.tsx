import React, { useEffect, useState } from 'react';

interface SchulteTableProps {
  size: number;
  onNumberClick: (number: number) => void;
  currentNumber: number;
  gameStarted: boolean;
}

function SchulteTable({ size, onNumberClick, currentNumber, gameStarted }: SchulteTableProps) {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    const nums = Array.from({ length: size * size }, (_, i) => i + 1);
    setNumbers(shuffle(nums));
  }, [size, gameStarted]);

  const shuffle = (array: number[]): number[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div 
      className="grid gap-2" 
      style={{ 
        gridTemplateColumns: `repeat(${size}, 1fr)`,
      }}
    >
      {numbers.map((number, index) => (
        <button
          key={index}
          onClick={() => gameStarted && onNumberClick(number)}
          className={`
            aspect-square flex items-center justify-center text-xl font-bold rounded-lg
            transition-all duration-200 transform hover:scale-105
            ${!gameStarted ? 'bg-gray-100 text-gray-400' : 
              number === currentNumber ? 'bg-indigo-100 text-indigo-600 shadow-md' :
              'bg-white text-gray-700 shadow-sm hover:shadow-md'}
            ${number < currentNumber ? 'bg-green-50 text-green-600' : ''}
          `}
          disabled={!gameStarted}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default SchulteTable;