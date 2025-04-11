import React, { useState } from 'react';
import '../styles/Expenses.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    setNewExpense({
      description: '',
      amount: '',
      category: '',
      date: '',
    });
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
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
              />
            </div>

            <button type="submit" className="add-expense-button">
              Add Expense
            </button>
          </form>
        </div>

        <div className="expenses-list">
          <h3>Recent Expenses</h3>
          {expenses.length === 0 ? (
            <p className="no-expenses">No expenses added yet</p>
          ) : (
            <div className="expenses-grid">
              {expenses.map((expense) => (
                <div key={expense.id} className="expense-card">
                  <div className="expense-header">
                    <h4>{expense.description}</h4>
                    <span className="expense-category">{expense.category}</span>
                  </div>
                  <div className="expense-details">
                    <p className="expense-amount">${expense.amount}</p>
                    <p className="expense-date">{expense.date}</p>
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