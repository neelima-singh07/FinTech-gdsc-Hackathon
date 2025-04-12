import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaExclamationCircle, FaCheck } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (Object.values(passwordStrength).some(value => !value)) {
      errors.password = 'Password does not meet requirements';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Check password strength when password field changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSocialSignup = (provider) => {
    // This would be implemented with actual social signup functionality
    console.log(`Signing up with ${provider}`);
    // For now, just show a message
    setError(`Social signup with ${provider} is not implemented yet.`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us to start managing your finances</p>
        
        {error && (
          <div className="alert alert-danger">
            <FaExclamationCircle />
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={formErrors.name ? 'error' : ''}
              disabled={isLoading}
            />
            {formErrors.name && (
              <span className="error-message">{formErrors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={formErrors.email ? 'error' : ''}
              disabled={isLoading}
            />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={formErrors.password ? 'error' : ''}
              disabled={isLoading}
            />
            <span 
              className="password-toggle" 
              onClick={() => togglePasswordVisibility('password')}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formErrors.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
            
            {formData.password && (
              <div className="password-strength">
                <div className={`strength-item ${passwordStrength.length ? 'valid' : ''}`}>
                  <span className="icon">{passwordStrength.length ? <FaCheck /> : ''}</span>
                  <span>At least 8 characters</span>
                </div>
                <div className={`strength-item ${passwordStrength.uppercase ? 'valid' : ''}`}>
                  <span className="icon">{passwordStrength.uppercase ? <FaCheck /> : ''}</span>
                  <span>One uppercase letter</span>
                </div>
                <div className={`strength-item ${passwordStrength.lowercase ? 'valid' : ''}`}>
                  <span className="icon">{passwordStrength.lowercase ? <FaCheck /> : ''}</span>
                  <span>One lowercase letter</span>
                </div>
                <div className={`strength-item ${passwordStrength.number ? 'valid' : ''}`}>
                  <span className="icon">{passwordStrength.number ? <FaCheck /> : ''}</span>
                  <span>One number</span>
                </div>
                <div className={`strength-item ${passwordStrength.special ? 'valid' : ''}`}>
                  <span className="icon">{passwordStrength.special ? <FaCheck /> : ''}</span>
                  <span>One special character</span>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={formErrors.confirmPassword ? 'error' : ''}
              disabled={isLoading}
            />
            <span 
              className="password-toggle" 
              onClick={() => togglePasswordVisibility('confirm')}
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {formErrors.confirmPassword && (
              <span className="error-message">{formErrors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="divider">or sign up with</div>

        {/* <div className="social-login">
          <button 
            className="social-button google" 
            onClick={() => handleSocialSignup('Google')}
            disabled={isLoading}
          >
            <FaGoogle />
            <span>Google</span>
          </button>
          <button 
            className="social-button facebook" 
            onClick={() => handleSocialSignup('Facebook')}
            disabled={isLoading}
          >
            <FaFacebook />
            <span>Facebook</span>
          </button>
          <button 
            className="social-button apple" 
            onClick={() => handleSocialSignup('Apple')}
            disabled={isLoading}
          >
            <FaApple />
            <span>Apple</span>
          </button>
        </div> */}

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 