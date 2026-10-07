const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Ensure data directory and users.json exist
function ensureStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function getAllUsers() {
  ensureStorage();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (error) {
    console.error('Error reading users storage:', error);
    return [];
  }
}

function saveUsers(users) {
  ensureStorage();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing users storage:', error);
  }
}

function findUserByEmail(email) {
  if (!email) return null;
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
}

function findUserById(id) {
  const users = getAllUsers();
  return users.find((u) => u.id === id);
}

function createUser(userData) {
  const users = getAllUsers();
  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name: userData.name,
    email: userData.email.toLowerCase().trim(),
    password: userData.password, // Expect hashed password
    isVerified: userData.isVerified || false,
    otp: userData.otp || null,
    otpExpiresAt: userData.otpExpiresAt || null,
    role: userData.role || 'user',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

function updateUser(id, updateData) {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updateData };
  saveUsers(users);
  return users[index];
}

function sanitizeUser(user) {
  if (!user) return null;
  const { password, otp, otpExpiresAt, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  getAllUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  sanitizeUser,
};
