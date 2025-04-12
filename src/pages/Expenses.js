import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transactionsAPI, budgetsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Expenses.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [budgetUpdate, setBudgetUpdate] = useState(null);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Fetch expenses and budgets from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [expensesData, budgetsData] = await Promise.all([
          transactionsAPI.getAll(),
          budgetsAPI.getAll()
        ]);
        
        // Filter to show only expenses (not income)
        const expenseData = expensesData.filter(tx => tx.type === 'expense');
        setExpenses(expenseData);
        setBudgets(budgetsData);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setBudgetUpdate(null);
    
    try {
      // Format the data for the API
      const expenseData = {
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category.toLowerCase().replace(/ & /g, '_').replace(/\s+/g, '_'),
        type: 'expense',
        date: newExpense.date,
      };
      
      // Send to backend
      const response = await transactionsAPI.create(expenseData);
      
      // Update local state
      setExpenses([response, ...expenses]);
      
      // Refresh budgets to update progress bars
      const updatedBudgets = await budgetsAPI.getAll();
      setBudgets(updatedBudgets);
      
      // Check if this expense affects any budget
      const affectedBudget = updatedBudgets.find(
        budget => budget.category.toLowerCase() === expenseData.category.toLowerCase()
      );
      
      if (affectedBudget) {
        const progress = (affectedBudget.spent / affectedBudget.limit) * 100;
        setBudgetUpdate({
          category: affectedBudget.category,
          spent: affectedBudget.spent,
          limit: affectedBudget.limit,
          progress: Math.min(progress, 100),
          period: affectedBudget.period
        });
        
        // Auto-hide the notification after 5 seconds
        setTimeout(() => {
          setBudgetUpdate(null);
        }, 5000);
      }
      
      // Reset form
      setNewExpense({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
      
      // Show success message or redirect
      navigate('/transactions');
    } catch (err) {
      setError('Failed to add expense: ' + (err.response?.data?.message || err.message));
      console.error('Error adding expense:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Check if a budget exists for the selected category
  const getBudgetForCategory = (category) => {
    const formattedCategory = category.toLowerCase().replace(/ & /g, '_').replace(/\s+/g, '_');
    return budgets.find(budget => budget.category.toLowerCase() === formattedCategory);
  };

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Health & Fitness',
    'Travel',
    'Other',
  ];

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h2>Track Your Expenses</h2>
        <p>Add and manage your daily expenses</p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {budgetUpdate && (
        <div className="budget-update-notification">
          <h4>Budget Update</h4>
          <p>
            {budgetUpdate.category.split('_').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')} ({budgetUpdate.period})
          </p>
          <div className="budget-progress">
            <div 
              className="progress-bar"
              style={{ 
                width: `${budgetUpdate.progress}%`,
                backgroundColor: budgetUpdate.progress > 90 ? '#dc3545' : 
                                budgetUpdate.progress > 75 ? '#ffc107' : '#28a745'
              }}
            ></div>
          </div>
          <p className="budget-amounts">
            Spent: ₹{budgetUpdate.spent.toFixed(2)} / ₹{budgetUpdate.limit.toFixed(2)}
          </p>
        </div>
      )}

      <div className="expenses-content">
        <div className="add-expense-card">
          <h3>Add New Expense</h3>
          <form onSubmit={handleSubmit} className="expense-form">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={newExpense.description}
                onChange={handleChange}
                placeholder="What did you spend on?"
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={newExpense.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={newExpense.category}
                onChange={handleChange}
                required
                disabled={submitting}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {newExpense.category && getBudgetForCategory(newExpense.category) && (
                <div className="budget-info">
                  <p>Budget: ₹{getBudgetForCategory(newExpense.category).limit.toFixed(2)}</p>
                  <p>Spent: ₹{getBudgetForCategory(newExpense.category).spent.toFixed(2)}</p>
                  <div className="budget-progress">
                    <div 
                      className="progress-bar"
                      style={{ 
                        width: `${Math.min((getBudgetForCategory(newExpense.category).spent / getBudgetForCategory(newExpense.category).limit) * 100, 100)}%`,
                        backgroundColor: (getBudgetForCategory(newExpense.category).spent / getBudgetForCategory(newExpense.category).limit) * 100 > 90 ? '#dc3545' : 
                                        (getBudgetForCategory(newExpense.category).spent / getBudgetForCategory(newExpense.category).limit) * 100 > 75 ? '#ffc107' : '#28a745'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={newExpense.date}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>

            <button 
              type="submit" 
              className="add-expense-button"
              disabled={submitting}
            >
              {submitting ? 'Adding...' : 'Add Expense'}
            </button>
          </form>
        </div>

        <div className="expenses-list">
          <h3>Recent Expenses</h3>
          {loading ? (
            <div className="loading-spinner">Loading expenses...</div>
          ) : expenses.length === 0 ? (
            <p className="no-expenses">No expenses added yet</p>
          ) : (
            <div className="expenses-grid">
              {expenses.map((expense) => (
                <div key={expense._id} className="expense-card">
                  <div className="expense-header">
                    <h4>{expense.description}</h4>
                    <span className="expense-category">
                      {expense.category.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </div>
                  <div className="expense-details">
                    <p className="expense-amount">₹{expense.amount}</p>
                    <p className="expense-date">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses; 