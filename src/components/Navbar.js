import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaChartPie, FaWallet, FaChartLine, FaUser, FaCog, FaMoneyBillWave, FaCalendarAlt, FaChartBar } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
// import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()

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
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
          <Link className="navbar-exp nav-link" to="/" style={{ color: "white" }}>Expense Tracker</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/transactions">Recent Transactions</Link>
            </li> */}
           
            <li className="nav-item">
              <Link to="/expenses" className={`nav-link ${isActive('/expenses')}`}>
                <FaMoneyBillWave /> Add Expenses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chatbot" className={`nav-link ${isActive('/expenses')}`}>
                <FaMoneyBillWave /> Chatbot
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                <FaHome /> Dashboard
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className={`nav-link ${isActive('/profile')}`}>
                    <FaUser /> {user?.username || 'Profile'}
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link" 
                    onClick={logout}
                    style={{ color: "white", border: "none", background: "none" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <FaUser /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
