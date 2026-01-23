// Authentication utility functions

const AUTH_TOKEN_KEY = 'petzi_pal_auth_token';
const USER_DATA_KEY = 'petzi_pal_user_data';

// Get backend URL from environment
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Save authentication token to localStorage
export const saveAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

// Get authentication token from localStorage
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Remove authentication token from localStorage
export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }
};

// Save user data to localStorage
export const saveUserData = (userData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
};

// Get user data from localStorage
export const getUserData = () => {
  if (typeof window === 'undefined') return null;
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

// Convert image file to base64
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// API call for user registration
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${backendUrl}/api/v1/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

// API call for user login
export const loginUser = async (credentials) => {
  // Mock login for testing
  if (credentials.username === 'test@test.com' && credentials.password === 'test1234') {
    const mockData = {
      access_token: 'mock_token_123',
      user: {
        id: 'mock_user_id',
        username: 'test@test.com',
        name: 'Test Provider',
        role: 'SERVICE_PROVIDER'
      }
    };
    saveAuthToken(mockData.access_token);
    saveUserData(mockData.user);
    return { success: true, data: mockData };
  }

  try {
    // Ensure we send username and password as expected by the API
    const loginData = {
      username: credentials.username,
      password: credentials.password
    };

    if (!backendUrl) {
      console.error("Error: NEXT_PUBLIC_BACKEND_URL is not set.");
      return { success: false, error: "Application is not configured." };
    }

    const response = await fetch(`${backendUrl}/api/v1/user/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Use the error message from the API if available
      throw new Error(data.message || 'Login failed');
    }

    // --- START OF CORRECTION ---
    // The API nests the token and user inside a 'data' object
    if (data.data && data.data.access_token) {
      saveAuthToken(data.data.access_token);
    } else {
      // Handle case where login is successful but no token is returned
      throw new Error('Login successful but no authentication token was received.');
    }

    if (data.data && data.data.user) {
      saveUserData(data.data.user);
    }
    // --- END OF CORRECTION ---

    // Return the nested data object
    return { success: true, data: data.data };

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = () => {
  removeAuthToken();
  // Optionally redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

// Get authorization header for API calls
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validate phone number
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};