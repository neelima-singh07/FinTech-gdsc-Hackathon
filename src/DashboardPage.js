import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaChartPie, FaChartBar, FaHistory, FaLightbulb, FaUserCircle, FaHome, FaWallet, FaChartLine, FaCog, FaMoneyBillWave, FaCalendarAlt, FaTable } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { transactionsAPI, reportsAPI } from './services/api';
import { useAuth } from './contexts/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [aiTips, setAiTips] = useState([]);
  
  const { isAuthenticated, user } = useAuth();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  // Fetch transactions and reports data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch transactions
        const transactionsData = await transactionsAPI.getAll();
        setTransactions(transactionsData);
        
        // Process expense breakdown data
        const expenseBreakdown = processExpenseBreakdown(transactionsData);
        setExpenseData(expenseBreakdown);
        
        // Fetch weekly report from API
        const weeklyReport = await reportsAPI.getWeekly();
        
        // Format weekly data for the chart
        const formattedWeeklyData = weeklyReport.categories.map(category => ({
          name: category.category.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          value: category.total,
          percentage: category.percentage
        }));
        
        setWeeklyData(formattedWeeklyData);
        
        // Generate AI tips
        const tips = generateAiTips(transactionsData);
        setAiTips(tips);
      } catch (err) {
        setError('Failed to fetch data: ' + (err.response?.data?.message || err.message));
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Process expense breakdown for pie chart
  const processExpenseBreakdown = (transactions) => {
    // Filter expenses only
    const expenses = transactions.filter(tx => tx.type === 'expense');
    
    // Group by category and sum amounts
    const categoryTotals = expenses.reduce((acc, tx) => {
      const category = tx.category;
      acc[category] = (acc[category] || 0) + tx.amount;
      return acc;
    }, {});
    
    // Convert to array format for chart
    return Object.entries(categoryTotals).map(([name, value]) => ({
      name: name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      value
    }));
  };

  // Generate AI tips based on transaction data
  const generateAiTips = (transactions) => {
    const tips = [];
    
    // Calculate total expenses
    const totalExpenses = transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    // Calculate total income
    const totalIncome = transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    // Calculate savings rate
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    // Calculate monthly averages
    const monthlyExpenses = totalExpenses / 12; // Assuming data represents a year
    const monthlyIncome = totalIncome / 12;
    
    // Calculate expense-to-income ratio
    const expenseToIncomeRatio = totalIncome > 0 ? totalExpenses / totalIncome : 0;
    
    // Group transactions by month to detect trends
    const monthlyTransactions = transactions.reduce((acc, tx) => {
      const month = new Date(tx.date).toLocaleString('default', { month: 'long' });
      if (!acc[month]) {
        acc[month] = { income: 0, expenses: 0 };
      }
      if (tx.type === 'income') {
        acc[month].income += tx.amount;
      } else {
        acc[month].expenses += tx.amount;
      }
      return acc;
    }, {});
    
    // Detect spending trends
    const months = Object.keys(monthlyTransactions);
    let increasingSpending = false;
    let decreasingSpending = false;
    
    if (months.length >= 2) {
      const lastMonth = months[months.length - 1];
      const previousMonth = months[months.length - 2];
      
      if (monthlyTransactions[lastMonth].expenses > monthlyTransactions[previousMonth].expenses * 1.1) {
        increasingSpending = true;
      } else if (monthlyTransactions[lastMonth].expenses < monthlyTransactions[previousMonth].expenses * 0.9) {
        decreasingSpending = true;
      }
    }
    
    // Add personalized tips based on data analysis
    
    // Savings rate tip
    if (savingsRate < 20) {
      tips.push({
        title: 'Savings Alert',
        content: `Your current savings rate is ${savingsRate.toFixed(1)}%. Financial experts recommend saving at least 20% of your income. Try setting up automatic transfers to a savings account.`,
        priority: 'high',
        action: 'Set up automatic savings'
      });
    } else if (savingsRate > 30) {
      tips.push({
        title: 'Great Savings!',
        content: `You're saving ${savingsRate.toFixed(1)}% of your income, which is excellent! Consider investing some of these savings for long-term growth.`,
        priority: 'medium',
        action: 'Explore investment options'
      });
    }
    
    // Expense-to-income ratio tip
    if (expenseToIncomeRatio > 0.8) {
      tips.push({
        title: 'High Expense Ratio',
        content: `Your expenses are ${(expenseToIncomeRatio * 100).toFixed(0)}% of your income. Try to reduce this ratio to below 70% for better financial health.`,
        priority: 'high',
        action: 'Review monthly subscriptions'
      });
    }
    
    // Spending trend tips
    if (increasingSpending) {
      tips.push({
        title: 'Spending Trend Alert',
        content: 'Your spending has increased compared to last month. Review your recent expenses to identify areas where you can cut back.',
        priority: 'high',
        action: 'Review recent expenses'
      });
    } else if (decreasingSpending) {
      tips.push({
        title: 'Positive Spending Trend',
        content: 'Your spending has decreased compared to last month. Keep up the good work!',
        priority: 'medium',
        action: 'Set a savings goal'
      });
    }
    
    return tips;
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Financial Dashboard</h1>
          <p>Welcome back, {user?.username || 'User'}</p>
        </div>
        <div className="nav-buttons">
          <Link to="/expenses"> 
            <button className="nav-button">
              <FaMoneyBillWave className="nav-icon" />
              <span>Add Expense</span>
            </button>
          </Link>
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
          <Link to="/transactions"> 
            <button className="nav-button">
              <FaTable className="nav-icon" />
              <span>Recent Transactions</span>
            </button>
          </Link>
          <Link to="/profile"> 
            <div className="profile-icon">
              <FaUserCircle className="profile-image" />
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
            {expenseData.length > 0 ? (
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
                  <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No expense data available</div>
            )}
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Weekly Summary</h2>
            <FaChartBar className="icon" />
          </div>
          <div className="chart-container">
            {weeklyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="value" name="Spent" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No weekly data available</div>
            )}
          </div>
          <div className="weekly-summary-details">
            {weeklyData.length > 0 && (
              <div className="category-breakdown">
                <h4>Category Breakdown</h4>
                <ul>
                  {weeklyData.map((category, index) => (
                    <li key={index} className="category-item">
                      <span className="category-name">{category.name}</span>
                      <span className="category-amount">₹{category.value.toFixed(2)}</span>
                      <span className="category-percentage">{category.percentage}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="dashboard-card transactions">
          <div className="card-header">
            <h2>Recent Transactions</h2>
            <FaHistory className="icon" />
          </div>
          <div className="transactions-table-wrapper">
            {transactions.length > 0 ? (
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
                  {transactions.slice(0, 5).map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>{transaction.description}</td>
                      <td style={{ color: transaction.type === 'income' ? 'green' : 'red' }}>
                        {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount).toFixed(2)}
                      </td>
                      <td>
                        <span className={`transaction-category category-${transaction.category}`}>
                          {transaction.category.split('_').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">No transactions available</div>
            )}
          </div>
        </div>

        {/* AI Tips */}
        {/* <div className="dashboard-card" id="insights">
          <div className="card-header">
            <h2>AI Insights</h2>
            <FaLightbulb className="icon" />
          </div>
          <div className="ai-tips-grid">
            {aiTips.length > 0 ? (
              aiTips.slice(0, 4).map((tip, index) => (
                <div key={index} className={`ai-tip-card priority-${tip.priority || 'medium'}`}>
                  <h3>{tip.title}</h3>
                  <p>{tip.content}</p>
                  {tip.action && (
                    <button className="tip-action-button">
                      {tip.action}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="no-data">No insights available yet</div>
            )}
            {aiTips.length > 4 && (
              <div className="more-insights">
                <Link to="/ai-tips">
                  <button className="tip-action-button">
                    View {aiTips.length - 4} more insights
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
