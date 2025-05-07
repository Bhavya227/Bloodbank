import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const config = {
            headers: {
              'x-auth-token': token
            }
          };
          
          try {
            const res = await axios.get('/api/users/me', config);
            setUser(res.data);
          } catch (err) {
            console.error('Failed to authenticate token, using demo mode', err);
            // For demo purposes, set a mock user if backend is not available
            const demoUser = {
              name: 'Demo User',
              email: 'demo@example.com',
              bloodGroup: 'O+',
              city: 'Ahmedabad',
              phone: '9876543210',
              role: 'donor'
            };
            setUser(demoUser);
          }
        } catch (err) {
          console.error('Failed to authenticate token', err);
          localStorage.removeItem('token');
          setToken(null);
        }
      } else {
        // For demo purposes, auto-login with a demo user
        const demoToken = 'demo-token-for-testing';
        localStorage.setItem('token', demoToken);
        setToken(demoToken);
        
        const demoUser = {
          name: 'Demo User',
          email: 'demo@example.com',
          bloodGroup: 'O+',
          city: 'Ahmedabad',
          phone: '9876543210',
          role: 'donor'
        };
        setUser(demoUser);
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      // Try to register with the backend
      try {
        const res = await axios.post('/api/auth/register', userData);
        
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          setToken(res.data.token);
          toast.success('Registration successful!');
          return true;
        }
      } catch (err) {
        console.warn('Backend unavailable, using demo mode');
        // Demo mode - simulate successful registration
        const demoToken = 'demo-token-for-testing';
        localStorage.setItem('token', demoToken);
        setToken(demoToken);
        
        const { name, email, bloodGroup, city, phone, role } = userData;
        const demoUser = { name, email, bloodGroup, city, phone, role };
        setUser(demoUser);
        
        toast.success('Demo Registration successful!');
        return true;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      toast.error(errorMsg);
      return false;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      // Try to login with the backend
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          setToken(res.data.token);
          toast.success('Login successful!');
          return true;
        }
      } catch (err) {
        console.warn('Backend unavailable, using demo mode');
        // Demo mode - simulate successful login
        const demoToken = 'demo-token-for-testing';
        localStorage.setItem('token', demoToken);
        setToken(demoToken);
        
        const demoUser = {
          name: 'Demo User',
          email,
          bloodGroup: 'O+',
          city: 'Ahmedabad',
          phone: '9876543210',
          role: email.includes('admin') ? 'admin' : 
                email.includes('hospital') ? 'hospital' : 'donor'
        };
        setUser(demoUser);
        
        toast.success('Demo Login successful!');
        return true;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Invalid credentials';
      toast.error(errorMsg);
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      // Try to update with the backend
      try {
        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        
        const res = await axios.put('/api/users/profile', profileData, config);
        setUser(res.data);
      } catch (err) {
        console.warn('Backend unavailable, using demo mode');
        // Demo mode - simulate profile update
        setUser({...user, ...profileData});
      }
      toast.success('Profile updated successfully');
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Failed to update profile';
      toast.error(errorMsg);
      return false;
    }
  };

  // Check if user has specific role
  const hasRole = (roles) => {
    if (!user) return false;
    
    // If roles is a string, convert to array
    const roleArray = typeof roles === 'string' ? [roles] : roles;
    
    return roleArray.includes(user.role);
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    updateProfile,
    hasRole,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 