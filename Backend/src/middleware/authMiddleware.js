const jwt = require('jsonwebtoken');
const { findUserById, sanitizeUser } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'vanya_haute_parfumerie_secret_key_2025';

function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. No authentication token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token. User no longer exists.' });
    }

    req.user = sanitizeUser(user);
    req.rawUser = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Authentication token is invalid or expired.' });
  }
}

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = {
  requireAuth,
  generateToken,
};
