// src/components/TransactionTable.js
import React from 'react';

const transactions = [
  { id: 1, category: 'Food', amount: '₹200', date: '2025-04-06' },
  { id: 2, category: 'Travel', amount: '₹150', date: '2025-04-07' },
  { id: 3, category: 'Entertainment', amount: '₹350', date: '2025-04-08' },
  { id: 4, category: 'Study', amount: '₹500', date: '2025-04-08' },
  { id: 5, category: 'Misc', amount: '₹120', date: '2025-04-09' },
];

const TransactionTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-center border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-blue-50">
              <td className="py-2 px-4 border-b">{tx.date}</td>
              <td className="py-2 px-4 border-b">{tx.category}</td>
              <td className="py-2 px-4 border-b text-green-600 font-semibold">{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
