import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await transactionsAPI.getAll();
        setTransactions(data);
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchTransactions();
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
    <div className="w-full flex justify-center">
      <div className="overflow-x-auto w-full max-w-4xl px-4">
        <h2 className="text-2xl font-bold text-center text-indigo-900 mb-4">Transaction History</h2>
        {transactions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No transactions found</div>
        ) : (
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-blue-50">
                  <td className="py-2 px-4 border-b">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b capitalize">{tx.category}</td>
                  <td className="py-2 px-4 border-b">{tx.description}</td>
                  <td className={`py-2 px-4 border-b font-semibold ${
                    tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
