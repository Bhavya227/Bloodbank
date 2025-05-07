import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();

  // Show loading spinner while authenticating
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has the required role
  if (roles && !hasRole(roles)) {
    // Redirect to dashboard if user doesn't have the required role
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated and has the required role, render the protected component
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default ProtectedRoute; 