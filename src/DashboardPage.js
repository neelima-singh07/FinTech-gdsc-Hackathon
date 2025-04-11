import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaChartPie, FaChartBar, FaHistory, FaLightbulb, FaUserCircle, FaHome, FaWallet, FaChartLine, FaCog, FaMoneyBillWave, FaCalendarAlt, FaTable } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  // Sample data for expense breakdown
  const expenseData = [
    { name: 'Food', value: 400 },
    { name: 'Transport', value: 300 },
    { name: 'Shopping', value: 200 },
    { name: 'Bills', value: 500 },
  ];

  // Sample data for weekly summary
  const weeklyData = [
    { name: 'Mon', income: 400, expenses: 240 },
    { name: 'Tue', income: 300, expenses: 139 },
    { name: 'Wed', income: 200, expenses: 980 },
    { name: 'Thu', income: 278, expenses: 390 },
    { name: 'Fri', income: 189, expenses: 480 },
    { name: 'Sat', income: 239, expenses: 380 },
    { name: 'Sun', income: 349, expenses: 430 },
  ];

  // Sample transactions
  const transactions = [
    { id: 1, date: '2024-03-15', description: 'Grocery Shopping', amount: -120.50, category: 'food' },
    { id: 2, date: '2024-03-14', description: 'Salary Deposit', amount: 3000.00, category: 'income' },
    { id: 3, date: '2024-03-13', description: 'Transportation', amount: -45.00, category: 'transport' },
    { id: 4, date: '2024-03-12', description: 'Online Shopping', amount: -89.99, category: 'shopping' },
    { id: 5, date: '2024-03-11', description: 'Utility Bill', amount: -150.00, category: 'bills' },
  ];

  // AI Tips
  const aiTips = [
    {
      title: 'Spending Alert',
      content: 'Your food expenses are 20% higher than last month. Consider meal planning to reduce costs.',
    },
    {
      title: 'Savings Opportunity',
      content: 'You could save $200 monthly by reducing dining out expenses.',
    },
    {
      title: 'Investment Tip',
      content: 'Based on your savings, consider investing in a diversified portfolio.',
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Financial Dashboard</h1>
          <p>Track your expenses and get AI-powered insights</p>
        </div>
        <div className="nav-buttons">
          
          <Link to="/budget"> 
          <button className="nav-button">
            <FaWallet className="nav-icon" />
            <span>Budget</span>
          </button>
          </Link>
          <Link to="/weekly-summary"> 
          <button className="nav-button">
            <FaCalendarAlt className="nav-icon" />
            <span>Weekly Summary</span>
          </button>
          </Link>
          <Link to="/profile"> 
          <div className="profile-icon">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Profile" 
              className="profile-image"
            />
          </div>
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Expense Breakdown */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Expense Breakdown</h2>
            <FaChartPie className="icon" />
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Weekly Summary</h2>
            <FaChartBar className="icon" />
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />
                <Bar dataKey="expenses" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="dashboard-card transactions">
          <div className="card-header">
            <h2>Recent Transactions</h2>
            <FaHistory className="icon" />
          </div>
          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td style={{ color: transaction.amount > 0 ? 'green' : 'red' }}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td>
                      <span className={`transaction-category category-${transaction.category}`}>
                        {transaction.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Tips */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>AI Insights</h2>
            <FaLightbulb className="icon" />
          </div>
          <div className="ai-tips-grid">
            {aiTips.map((tip, index) => (
              <div key={index} className="ai-tip-card">
                <h3>{tip.title}</h3>
                <p>{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
