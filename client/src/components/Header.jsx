import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-primary text-2xl font-bold mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-lg font-bold">Gujarat Blood Bank</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium">
              Contact
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">
                  Dashboard
                </Link>
                
                {hasRole('hospital') && (
                  <Link to="/request" className="text-gray-700 hover:text-primary font-medium">
                    Request Blood
                  </Link>
                )}
                
                {hasRole('admin') && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary font-medium">
                    Admin Panel
                  </Link>
                )}
                
                <div className="relative group">
                  <button className="flex items-center text-gray-700 font-medium group-hover:text-primary">
                    {user?.name?.split(' ')[0] || 'User'} 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-10 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline py-1.5 text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary py-1.5 text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-primary font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  
                  {hasRole('hospital') && (
                    <Link 
                      to="/request" 
                      className="text-gray-700 hover:text-primary font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Request Blood
                    </Link>
                  )}
                  
                  {hasRole('admin') && (
                    <Link 
                      to="/admin" 
                      className="text-gray-700 hover:text-primary font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-primary font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    className="btn-outline text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 