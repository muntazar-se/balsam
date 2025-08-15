// API Configuration - Switch between mock and real APIs
import mockApiService from '../services/mockApiService';

// Set this to true to use mock data, false to use real backend
export const USE_MOCK_API = true;

// Export the appropriate API service
export const apiService = USE_MOCK_API ? mockApiService : null;

// Mock credentials for testing
export const MOCK_CREDENTIALS = {
  // Regular user
  user: {
    email: "ahmed.mohammed@example.com",
    password: "password"
  },
  // Doctor user
  doctor: {
    email: "fatima.ahmed@balsam.com",
    password: "password"
  },
  // Admin user
  admin: {
    email: "admin@balsam.com",
    password: "123456"
  }
};

// Configuration for different environments
export const config = {
  development: {
    useMock: true,
    apiBaseUrl: "http://localhost:5800/api",
    mockDelay: 300
  },
  production: {
    useMock: false,
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "/api",
    mockDelay: 100
  }
};

// Get current environment config
export const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return config[env];
};

// Helper function to check if mock API is enabled
export const isMockEnabled = () => {
  const currentConfig = getCurrentConfig();
  return currentConfig.useMock || USE_MOCK_API;
}; 