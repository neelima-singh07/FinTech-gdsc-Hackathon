import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie, FaChartBar, FaTable, FaLightbulb, FaPlus, FaTrash, FaEdit, FaSync } from 'react-icons/fa';
import { budgetsAPI, transactionsAPI } from './services/api';
import { useAuth } from './contexts/AuthContext';
import './BudgetPage.css';

const BudgetPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const { isAuthenticated } = useAuth();

  const [newBudget, setNewBudget] = useState({
    category: '',
    limit: '',
    period: 'Monthly'
  });

  // Fetch budgets and transactions from the backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const [budgetsData, transactionsData] = await Promise.all([
        budgetsAPI.getAll(),
        transactionsAPI.getAll()
      ]);
      setBudgets(budgetsData);
      setTransactions(transactionsData);
    } catch (err) {
      setError('Failed to fetch data: ' + (err.response?.data?.message || err.message));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Refresh data periodically (every 30 seconds)
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        fetchData();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Calculate spent amount for a budget category
  const calculateSpentAmount = (category) => {
    const categoryTransactions = transactions.filter(transaction => 
      transaction.category.toLowerCase() === category.toLowerCase()
    );
    return categoryTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    if (!newBudget.category || !newBudget.limit) return;

    try {
      setIsSubmitting(true);
      const budgetData = {
        category: newBudget.category.toLowerCase().replace(/ & /g, '_').replace(/\s+/g, '_'),
        limit: parseFloat(newBudget.limit),
        period: newBudget.period
      };

      const response = await budgetsAPI.create(budgetData);
      
      // Add the new budget to the state
      setBudgets([...budgets, response]);
      
      // Reset form
      setNewBudget({ category: '', limit: '', period: 'Monthly' });
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to create budget: ' + (err.response?.data?.message || err.message));
      console.error('Error creating budget:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await budgetsAPI.delete(id);
      setBudgets(budgets.filter(budget => budget._id !== id));
    } catch (err) {
      setError('Failed to delete budget: ' + (err.response?.data?.message || err.message));
      console.error('Error deleting budget:', err);
    }
  };

  const handleUpdateBudget = async (id, updatedData) => {
    try {
      const response = await budgetsAPI.update(id, updatedData);
      setBudgets(budgets.map(budget => 
        budget._id === id ? response : budget
      ));
    } catch (err) {
      setError('Failed to update budget: ' + (err.response?.data?.message || err.message));
      console.error('Error updating budget:', err);
    }
  };

  const getProgressColor = (spent, limit) => {
    if (!spent || !limit) return '#28a745';
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return '#dc3545';
    if (percentage >= 75) return '#ffc107';
    return '#28a745';
  };

  if (loading) {
    return (
      <div className="budget-container">
        <div className="loading-spinner">Loading budgets...</div>
      </div>
    );
  }

  return (
    <div className="budget-container">
      <div className="budget-header">
        <h1>Budget Management</h1>
        <p>Track and manage your spending limits</p>
        <button 
          className="refresh-button"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <FaSync className={refreshing ? 'spinning' : ''} /> 
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="budget-actions">
        <button 
          className="add-budget-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FaPlus /> Add New Budget
        </button>
      </div>

      {showAddForm && (
        <form className="add-budget-form" onSubmit={handleAddBudget}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={newBudget.category}
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              required
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills & Utilities">Bills & Utilities</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="limit">Monthly Limit ($)</label>
            <input
              type="number"
              id="limit"
              value={newBudget.limit}
              onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
              placeholder="Enter monthly limit"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="period">Period</label>
            <select
              id="period"
              value={newBudget.period}
              onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
              disabled={isSubmitting}
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="save-budget-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Budget'}
          </button>
        </form>
      )}

      {budgets.length === 0 ? (
        <div className="no-budgets">
          <p>You don't have any budgets yet. Create one to start tracking your spending!</p>
        </div>
      ) : (
        <div className="budget-grid">
          {budgets.map(budget => {
            const spent = calculateSpentAmount(budget.category);
            const progress = budget.limit ? (spent / budget.limit) * 100 : 0;
            const progressColor = getProgressColor(spent, budget.limit);

            return (
              <div key={budget._id} className="budget-card">
                <div className="budget-card-header">
                  <h3>{budget.category.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}</h3>
                  <span className="budget-period">{budget.period}</span>
                </div>

                <div className="budget-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: progressColor
                      }}
                    />
                  </div>
                  <div className="progress-text">
                    ₹{spent.toFixed(2)} / ₹{budget.limit.toFixed(2)}
                  </div>
                </div>

                <div className="budget-actions">
                  <button
                    className="update-budget-button"
                    onClick={() => {
                      const newLimit = prompt('Enter new limit:', budget.limit);
                      if (newLimit !== null && !isNaN(newLimit)) {
                        handleUpdateBudget(budget._id, { limit: parseFloat(newLimit) });
                      }
                    }}
                  >
                    <FaEdit /> Update Limit
                  </button>
                  <button
                    className="delete-budget-button"
                    onClick={() => handleDeleteBudget(budget._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetPage; 