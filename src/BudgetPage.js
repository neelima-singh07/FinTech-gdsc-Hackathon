import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie, FaChartBar, FaTable, FaLightbulb, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import './BudgetPage.css';

const BudgetPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: 'Food',
      limit: 500,
      spent: 350,
      period: 'Monthly'
    },
    {
      id: 2,
      category: 'Transportation',
      limit: 300,
      spent: 150,
      period: 'Monthly'
    },
    {
      id: 3,
      category: 'Entertainment',
      limit: 200,
      spent: 180,
      period: 'Monthly'
    }
  ]);

  const [newBudget, setNewBudget] = useState({
    category: '',
    limit: '',
    period: 'Monthly'
  });

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!newBudget.category || !newBudget.limit) return;

    const budget = {
      id: Date.now(),
      ...newBudget,
      spent: 0
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ category: '', limit: '', period: 'Monthly' });
    setShowAddForm(false);
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  const handleUpdateSpent = (id) => {
    const budget = budgets.find(b => b.id === id);
    const newSpent = prompt('Enter new spent amount:', budget.spent);
    
    if (newSpent !== null && !isNaN(newSpent)) {
      setBudgets(budgets.map(b => 
        b.id === id 
          ? { ...b, spent: parseFloat(newSpent) }
          : b
      ));
    }
  };

  const getProgressColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return '#dc3545';
    if (percentage >= 75) return '#ffc107';
    return '#28a745';
  };

  return (
    <div className="budget-container">

      <div className="budget-header">
        <h1>Budget Management</h1>
        <p>Track and manage your spending limits</p>
      </div>

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
            <input
              type="text"
              id="category"
              value={newBudget.category}
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              placeholder="e.g., Food, Transportation"
              required
            />
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="period">Period</label>
            <select
              id="period"
              value={newBudget.period}
              onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <button type="submit" className="save-budget-button">
            Save Budget
          </button>
        </form>
      )}

      <div className="budget-grid">
        {budgets.map(budget => {
          const progress = (budget.spent / budget.limit) * 100;
          const progressColor = getProgressColor(budget.spent, budget.limit);

          return (
            <div key={budget.id} className="budget-card">
              <div className="budget-card-header">
                <h3>{budget.category}</h3>
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
                  ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                </div>
              </div>

              <div className="budget-actions">
                <button
                  className="update-budget-button"
                  onClick={() => handleUpdateSpent(budget.id)}
                >
                  <FaEdit /> Update Spent
                </button>
                <button
                  className="delete-budget-button"
                  onClick={() => handleDeleteBudget(budget.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetPage; 