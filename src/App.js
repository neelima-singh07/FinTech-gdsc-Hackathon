import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TransactionTable from './components/TransactionTable';
import WeeklySummary from './components/WeeklySummary';
import ApexChart from './expanse_tracker';
import DashboardPage from './DashboardPage';
import AITips from './components/AITips';
import './index.css';

import HeroSection from './hero_section';

function App() {
  return (
    <Router>
      <div className="App">

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
          <Link className="navbar-brand" to="/" style={{ fontSize: "17px", color: "white", textDecoration: "none" }}>FinBuddy</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-exp nav-link" to="/" style={{ color: "white" }}>Expense Tracker</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/weekly-summary">Weekly Summary</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transactions">Recent Transactions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ai-tips">AI-Chatbot</Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* { <div className="hero">
              <h2></h2>
              <HeroSection />
            </div> } */}
        {/* ROUTED PAGES */}
        <Routes>
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
              <h2>Weekly Summary</h2>
              <WeeklySummary />
            </div>
          } />

          <Route path="/transactions" element={
            <div className="Transactions">
              <h2>Transaction History</h2>
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
              <h2>AI Tips</h2>
              <AITips />
            </div>
          } />
        </Routes>
        
            



      </div>
      <footer className="footer text-center p-3 mt-5 bg-dark text-light">
        &copy; {new Date().getFullYear()} FinBuddy. All rights reserved.
      </footer>
    </Router>
    
  );
}

export default App;
