// src/components/AITips.js
import React from 'react';

const tips = [
  "You spent 20% more on snacks this week 🍟. Try meal prepping!",
  "Transport expenses dropped by ₹100. Nice savings! 🚲",
  "Try limiting entertainment to weekends only 🎮📅",
];

const AITips = () => {
  return (
    <div className="space-y-3">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="bg-green-50 text-green-900 border-l-4 border-green-400 px-4 py-3 rounded-md shadow-sm"
        >
          💡 {tip}
        </div>
      ))}
    </div>
  );
};

export default AITips;
