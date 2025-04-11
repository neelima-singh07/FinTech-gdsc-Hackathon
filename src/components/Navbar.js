import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaChartPie, FaWallet, FaChartLine, FaUser, FaCog, FaMoneyBillWave, FaCalendarAlt, FaChartBar } from 'react-icons/fa'
// import './Navbar.css'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <div>
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
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                <FaHome /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/budget" className={`nav-link ${isActive('/budget')}`}>
                <FaChartBar /> Budget
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/expenses" className={`nav-link ${isActive('/expenses')}`}>
                <FaMoneyBillWave /> Expenses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
                <FaUser /> Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ai-tips">AI-Chatbot</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
