import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: 'https://gdg-backend-bay.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials in cross-origin requests
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  register: async (username, email, password) => {
    try {
      const response = await api.post('/auth/register', { username, email, password });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
};

// Transactions API
export const transactionsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/transactions');
      return response.data;
    } catch (error) {
      console.error('Get transactions error:', error);
      throw error;
    }
  },
  create: async (transactionData) => {
    try {
      const response = await api.post('/transactions', transactionData);
      return response.data;
    } catch (error) {
      console.error('Create transaction error:', error);
      throw error;
    }
  },
  update: async (id, transactionData) => {
    try {
      const response = await api.put(`/transactions/${id}`, transactionData);
      return response.data;
    } catch (error) {
      console.error('Update transaction error:', error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete transaction error:', error);
      throw error;
    }
  },
};

// Reports API
export const reportsAPI = {
  getWeekly: async () => {
    try {
      const response = await api.get('/reports/weekly');
      return response.data;
    } catch (error) {
      console.error('Get weekly report error:', error);
      throw error;
    }
  },
  getMonthly: async () => {
    try {
      const response = await api.get('/reports/monthly');
      return response.data;
    } catch (error) {
      console.error('Get monthly report error:', error);
      throw error;
    }
  },
};

// Budgets API
export const budgetsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/budgets');
      return response.data;
    } catch (error) {
      console.error('Get budgets error:', error);
      throw error;
    }
  },
  create: async (budgetData) => {
    try {
      const response = await api.post('/budgets', budgetData);
      return response.data;
    } catch (error) {
      console.error('Create budget error:', error);
      throw error;
    }
  },
  update: async (id, budgetData) => {
    try {
      const response = await api.put(`/budgets/${id}`, budgetData);
      return response.data;
    } catch (error) {
      console.error('Update budget error:', error);
      throw error;
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/budgets/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete budget error:', error);
      throw error;
    }
  },
};

export default api; 