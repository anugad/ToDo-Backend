const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');
  
  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);

    // Assign the decoded token payload to req.user, so you can access it in routes
    req.user = decoded.user;

    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    next(); // Move to the next middleware/route handler
  } catch (err) {
    console.error('Something wrong with auth middleware', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

module.exports = authMiddleware;
