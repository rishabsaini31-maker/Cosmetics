const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/settings.json');

const INITIAL_SETTINGS = {
  storeName: 'VĀNYA Haute Parfumerie',
  storeEmail: 'contact@vanya-haute-parfumerie.com',
  currency: 'INR (₹)',
  taxRatePercentage: 18,
  freeShippingThreshold: 999,
  defaultFlatShippingFee: 150,
  orderNotificationsEmail: 'orders@vanya-haute-parfumerie.com',
  autoFulfillDigital: false,
  maintenanceMode: false,
};

function ensureStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_SETTINGS, null, 2), 'utf8');
  }
}

function getSettings() {
  ensureStorage();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '{}');
  } catch (error) {
    return INITIAL_SETTINGS;
  }
}

function updateSettings(newSettings) {
  ensureStorage();
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), 'utf8');
  return updated;
}

module.exports = { getSettings, updateSettings };
