const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/activity.json');

const INITIAL_LOGS = [
  {
    id: 'act-01',
    admin: 'VĀNYA Master Admin',
    action: 'Product Updated',
    resource: 'NOIR 01 Eau de Parfum',
    timestamp: new Date().toISOString(),
    status: 'Success',
  },
  {
    id: 'act-02',
    admin: 'VĀNYA Master Admin',
    action: 'Order Status Changed',
    resource: 'Order #VNY-10294 (Processing)',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'Success',
  },
];

function ensureStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_LOGS, null, 2), 'utf8');
  }
}

function getActivityLogs() {
  ensureStorage();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (error) {
    return INITIAL_LOGS;
  }
}

function logActivity(adminName, action, resource, status = 'Success') {
  const logs = getActivityLogs();
  const newLog = {
    id: `act-${Date.now()}`,
    admin: adminName || 'Admin',
    action,
    resource,
    timestamp: new Date().toISOString(),
    status,
  };
  logs.unshift(newLog);
  if (logs.length > 200) logs.pop(); // Keep recent 200 logs
  fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2), 'utf8');
  return newLog;
}

module.exports = { getActivityLogs, logActivity };
