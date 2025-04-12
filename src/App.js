import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import React from 'react';

import TransactionTable from './components/TransactionTable';
import WeeklySummary from './components/WeeklySummary';
import ApexChart from './expanse_tracker';
import DashboardPage from './DashboardPage';
import AITips from './components/AITips';
import Chatbot from './components/Chatbot';
import './index.css';

import HeroSection from './hero_section';
import Login from './pages/Login';
import Register from './pages/Signup';
import Expenses from './pages/Expenses';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import BudgetPage from './BudgetPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">

          {/* Navbar */}
          <Navbar/>
          {/* { <div className="hero">
                <h2></h2>
                <HeroSection />
              </div> } */}
          {/* ROUTED PAGES */}
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={
                <div className="Tracker_parent">
                  <h2>Your Expense Tracker</h2>
                  <div className="chart-container">
                    <ApexChart />
                  </div>
                </div>
              } />
              
              <Route path="/weekly-summary" element={
                <div className="Weekly_summary">
                  {/* <h2>Week2345678-879+ly Summary</h2> */}
                  <WeeklySummary />
                </div>
              } />
              
              <Route path="/transactions" element={
                <div className="Transactions">
                  <h2></h2>
                  <TransactionTable />
                </div>
              } />
              
              <Route path="/dashboard" element={
                <div className="Dashboard_page">
                  <h2>Dashboard Page</h2>
                  <DashboardPage />
                </div>
              } />
              
              <Route path="/ai-tips" element={
                <div className="AI">
                  {/* <h2>AI Tips</h2> */}
                  <AITips />
                </div>
              } />
              
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/budget" element={<BudgetPage />} />
              <Route path="/chatbot" element={
                <div className="chatbot-page">
                  <Chatbot />
                </div>
              } />
            </Route>
            
            {/* Redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          
              
        </div>
        <footer className="footer text-center p-3 mt-5 bg-dark text-light">
          &copy; {new Date().getFullYear()} FinBuddy. All rights reserved.
        </footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
