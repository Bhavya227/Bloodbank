// Middleware to check if user has the required role
module.exports = function(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ msg: 'No user found, authorization denied' });
    }

    // If roles is a string, convert to array
    const allowedRoles = typeof roles === 'string' ? [roles] : roles;

    // Check if user role is in the allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden: insufficient permissions' });
    }

    next();
  };
}; 