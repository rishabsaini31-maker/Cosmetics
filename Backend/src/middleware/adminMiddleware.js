const jwt = require('jsonwebtoken');
const { findUserById, sanitizeUser } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'vanya_haute_parfumerie_secret_key_2025';

function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Admin access denied. No authentication token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid admin token. User no longer exists.' });
    }

    // Allow admin role or master admin email
    if (user.role !== 'admin' && user.email.toLowerCase() !== 'admin@vanya.com') {
      return res.status(403).json({ success: false, message: 'Access forbidden. Administrator privileges required.' });
    }

    req.user = sanitizeUser(user);
    req.rawUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Admin session is invalid or expired. Please sign in.' });
  }
}

module.exports = { requireAdmin };
