// src/components/WeeklySummary.js
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { day: 'Mon', amount: 400 },
//   { day: 'Tue', amount: 650 },
//   { day: 'Wed', amount: 300 },
//   { day: 'Thu', amount: 700 },
//   { day: 'Fri', amount: 500 },
//   { day: 'Sat', amount: 900 },
//   { day: 'Sun', amount: 450 },
// ];

// const WeeklySummary = () => {
//   return (
//     <ResponsiveContainer width="100%" height={500}>
//       <BarChart data={data}>
//         <XAxis dataKey="day" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="amount" fill="#60A5FA" radius={[8, 8, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default WeeklySummary;

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { transactionsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Define custom colors
const COLORS = ['#F7CFD8', '#FDDBBB', '#FFD09B', '#D2E0FB', '#93C5FD', '#BFDBFE', '#1E40AF'];

const WeeklySummary = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        setLoading(true);
        const transactions = await transactionsAPI.getAll();
        
        // Get the last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date;
        }).reverse();

        // Initialize data structure for each day
        const initialData = last7Days.map(date => ({
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          amount: 0,
          date: date.toISOString().split('T')[0]
        }));

        // Calculate daily totals
        const dailyTotals = transactions.reduce((acc, transaction) => {
          const transactionDate = new Date(transaction.date).toISOString().split('T')[0];
          const dayIndex = initialData.findIndex(day => day.date === transactionDate);
          
          if (dayIndex !== -1) {
            acc[dayIndex] = (acc[dayIndex] || 0) + 
              (transaction.type === 'expense' ? -transaction.amount : transaction.amount);
          }
          
          return acc;
        }, {});

        // Update initial data with actual totals
        const finalData = initialData.map((day, index) => ({
          ...day,
          amount: dailyTotals[index] || 0
        }));

        setWeeklyData(finalData);
      } catch (err) {
        setError('Failed to fetch weekly data');
        console.error('Error fetching weekly data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchWeeklyData();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] p-4">
      <h2 className="text-2xl font-bold text-center text-indigo-900 mb-4">Weekly Summary</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`₹${Math.abs(value)}`, value >= 0 ? 'Income' : 'Expense']}
          />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
            {weeklyData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.amount >= 0 ? '#10B981' : '#EF4444'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklySummary;

