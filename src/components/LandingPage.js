import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie, FaWallet, FaRobot, FaChartLine, FaLightbulb, FaUserShield } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  const features = [
    {
      icon: <FaChartPie />,
      title: 'Smart Expense Tracking',
      description: 'Track your daily expenses with AI-powered categorization and real-time analytics. Get insights into your spending patterns instantly.'
    },
    {
      icon: <FaWallet />,
      title: 'Intelligent Budgeting',
      description: 'Set smart budgets that adapt to your lifestyle. Our AI helps you stay on track with personalized spending recommendations.'
    },
    {
      icon: <FaChartLine />,
      title: 'Financial Insights',
      description: 'Get detailed weekly and monthly reports with actionable insights. Visualize your financial journey with interactive charts.'
    },
    {
      icon: <FaLightbulb />,
      title: 'AI-Powered Tips',
      description: 'Receive personalized financial advice based on your spending habits. Get smart suggestions to optimize your savings.'
    },
    {
      icon: <FaRobot />,
      title: '24/7 Financial Assistant',
      description: 'Chat with our AI assistant anytime. Get instant answers to your financial questions and personalized guidance.'
    },
    {
      icon: <FaUserShield />,
      title: 'Bank-Grade Security',
      description: 'Your financial data is protected with enterprise-grade encryption. Rest easy knowing your information is secure.'
    }
  ];

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to FinBuddy</h1>
          <p className="tagline">Your intelligent financial companion for smarter money management</p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-button primary">Get Started</Link>
            <Link to="/register" className="cta-button secondary">Sign Up</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero.jpg" alt="FinBuddy Dashboard" />
        </div>
      </div>

      <div className="features-section">
        <h2>What FinBuddy Can Do For You</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Take Control of Your Finances?</h2>
        <p>Join thousands of users who are already managing their money smarter with FinBuddy.</p>
        <Link to="/register" className="cta-button primary">Create Your Free Account</Link>
      </div>
    </div>
  );
};

export default LandingPage; 