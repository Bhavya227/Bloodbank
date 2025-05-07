import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bloodGroup: '',
    city: '',
    role: 'donor'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const gujaratCities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 
    'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Nadiad', 
    'Mehsana', 'Bharuch', 'Navsari', 'Vapi', 'Gandhidham', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }
    
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;
      
      const success = await register(registerData);
      
      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="text-primary text-2xl font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {errors.submit && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-field ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <div className="mt-1">
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={`input-field ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                {errors.bloodGroup && <p className="mt-1 text-sm text-red-600">{errors.bloodGroup}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1">
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`input-field ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select City</option>
                  {gujaratCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Register as</label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    id="role-donor"
                    name="role"
                    type="radio"
                    value="donor"
                    checked={formData.role === 'donor'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label htmlFor="role-donor" className="ml-3 block text-sm font-medium text-gray-700">
                    Donor
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="role-hospital"
                    name="role"
                    type="radio"
                    value="hospital"
                    checked={formData.role === 'hospital'}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <label htmlFor="role-hospital" className="ml-3 block text-sm font-medium text-gray-700">
                    Hospital / Blood Requester
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary py-2 px-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-xs text-gray-600">
              By signing up, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary-dark">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary-dark">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 