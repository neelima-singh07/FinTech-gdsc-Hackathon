// src/components/AITips.js
import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const AITips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const generateTips = async () => {
      try {
        setLoading(true);
        const transactions = await transactionsAPI.getAll();
        
        const newTips = [];
        
        // Calculate category totals
        const categoryTotals = transactions.reduce((acc, tx) => {
          if (tx.type === 'expense') {
            acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
          }
          return acc;
        }, {});

        // Find highest spending category
        const highestCategory = Object.entries(categoryTotals)
          .sort(([, a], [, b]) => b - a)[0];
        
        if (highestCategory) {
          newTips.push(
            `You spend the most on ${highestCategory[0]} (₹${highestCategory[1]}). Consider setting a budget for this category.`
          );
        }

        // Calculate weekly average
        const weeklyAverage = transactions.reduce((acc, tx) => {
          if (tx.type === 'expense') {
            acc += tx.amount;
          }
          return acc;
        }, 0) / 4; // Assuming 4 weeks of data

        if (weeklyAverage > 5000) {
          newTips.push(
            `Your weekly spending average is ₹${weeklyAverage.toFixed(2)}. Try to reduce it by 20% to save more.`
          );
        }

        // Check for frequent small transactions
        const smallTransactions = transactions.filter(tx => 
          tx.type === 'expense' && tx.amount < 100
        ).length;

        if (smallTransactions > 10) {
          newTips.push(
            `You have ${smallTransactions} small transactions. These can add up quickly - consider consolidating your spending.`
          );
        }

        // Add general tips if no specific tips were generated
        if (newTips.length === 0) {
          newTips.push(
            "Track your expenses regularly to maintain a healthy budget.",
            "Consider setting up automatic savings for long-term goals.",
            "Review your subscriptions and cancel any unused services."
          );
        }

        setTips(newTips);
      } catch (err) {
        setError('Failed to generate tips');
        console.error('Error generating tips:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      generateTips();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-32">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-center text-indigo-900 mb-4">AI Tips</h2>
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
