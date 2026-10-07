const bcrypt = require('bcryptjs');
const {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  sanitizeUser,
} = require('../models/userModel');
const { generateOtp, sendOtpEmail } = require('../services/emailService');
const { generateToken } = require('../middleware/authMiddleware');

const OTP_EXPIRE_MINUTES = 10;

// POST /api/auth/signup
async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = findUserByEmail(normalizedEmail);

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists. Please sign in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiresAt = Date.now() + OTP_EXPIRE_MINUTES * 60 * 1000;

    let user;
    if (existingUser && !existingUser.isVerified) {
      user = updateUser(existingUser.id, {
        name,
        password: hashedPassword,
        otp,
        otpExpiresAt,
      });
    } else {
      user = createUser({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        isVerified: false,
        otp,
        otpExpiresAt,
      });
    }

    await sendOtpEmail(normalizedEmail, otp, 'Email Verification');

    return res.status(201).json({
      success: true,
      requiresOtp: true,
      email: normalizedEmail,
      message: `Account created! Verification OTP sent to ${normalizedEmail}.`,
      demoOtpHint: process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
}

// POST /api/auth/verify-otp
async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and 6-digit OTP are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    if (user.isVerified && !user.otp) {
      return res.status(400).json({ success: false, message: 'Email is already verified. Please log in.' });
    }

    if (user.otp !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid 6-digit OTP code.' });
    }

    if (user.otpExpiresAt && Date.now() > user.otpExpiresAt) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new code.' });
    }

    const updatedUser = updateUser(user.id, {
      isVerified: true,
      otp: null,
      otpExpiresAt: null,
    });

    const token = generateToken(updatedUser);
    const safeUser = sanitizeUser(updatedUser);

    return res.json({
      success: true,
      message: 'Email verified successfully! Welcome to VĀNYA.',
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during OTP verification.' });
  }
}

// POST /api/auth/resend-otp
async function resendOtp(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    const otp = generateOtp();
    const otpExpiresAt = Date.now() + OTP_EXPIRE_MINUTES * 60 * 1000;

    updateUser(user.id, { otp, otpExpiresAt });
    await sendOtpEmail(normalizedEmail, otp, 'Resend Verification');

    return res.json({
      success: true,
      message: `A new 6-digit OTP has been sent to ${normalizedEmail}.`,
      demoOtpHint: process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Check if user is unverified
    if (!user.isVerified) {
      const otp = generateOtp();
      const otpExpiresAt = Date.now() + OTP_EXPIRE_MINUTES * 60 * 1000;
      updateUser(user.id, { otp, otpExpiresAt });

      await sendOtpEmail(normalizedEmail, otp, 'Login Verification');

      return res.status(200).json({
        success: false,
        requiresOtp: true,
        email: normalizedEmail,
        message: `Your email is not verified yet. A new OTP was sent to ${normalizedEmail}.`,
        demoOtpHint: process.env.NODE_ENV !== 'production' ? otp : undefined,
      });
    }

    const token = generateToken(user);
    const safeUser = sanitizeUser(user);

    return res.json({
      success: true,
      message: `Welcome back, ${safeUser.name}!`,
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication.' });
  }
}

// GET /api/auth/me
async function getMe(req, res) {
  return res.json({
    success: true,
    user: req.user,
  });
}

// POST /api/auth/forgot-password
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account registered with this email.' });
    }

    const otp = generateOtp();
    const otpExpiresAt = Date.now() + OTP_EXPIRE_MINUTES * 60 * 1000;
    updateUser(user.id, { otp, otpExpiresAt });

    await sendOtpEmail(normalizedEmail, otp, 'Password Reset');

    return res.json({
      success: true,
      message: `Password reset OTP sent to ${normalizedEmail}.`,
      demoOtpHint: process.env.NODE_ENV !== 'production' ? otp : undefined,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}

// POST /api/auth/reset-password
async function resetPassword(req, res) {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = findUserByEmail(normalizedEmail);

    if (!user || user.otp !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    if (user.otpExpiresAt && Date.now() > user.otpExpiresAt) {
      return res.status(400).json({ success: false, message: 'OTP has expired.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = updateUser(user.id, {
      password: hashedPassword,
      isVerified: true,
      otp: null,
      otpExpiresAt: null,
    });

    const token = generateToken(updatedUser);
    const safeUser = sanitizeUser(updatedUser);

    return res.json({
      success: true,
      message: 'Password reset successfully! You are now logged in.',
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}

module.exports = {
  signup,
  verifyOtp,
  resendOtp,
  login,
  getMe,
  forgotPassword,
  resetPassword,
};
