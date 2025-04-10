import React from 'react';
import ApexChart from './expanse_tracker';
import WeeklySummary from './components/WeeklySummary';
import TransactionTable from './components/TransactionTable';
import AITips from './components/AITips';

function DashboardPage() {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen space-y-10">
      <div className="text-center text-4xl font-bold mb-6">Your Expense Tracker</div>

      {/* 🍩 Keep Pie Chart Here */}
      <div className="flex justify-center">
        <ApexChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-blue-400">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">📊 Weekly Summary</h3>
          <WeeklySummary />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-purple-400">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">💳 Recent Transactions</h3>
          <TransactionTable />
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-green-400 mt-6">
        <h3 className="text-xl font-semibold text-green-700 mb-4">🤖 AI Tips</h3>
        <AITips />
      </div>
    </div>
  );
}

export default DashboardPage;
