const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/theme.json');

const INITIAL_THEME = {
  published: {
    brandName: 'VĀNYA Haute Parfumerie',
    primaryColor: '#161616',
    secondaryColor: '#725b33',
    backgroundColor: '#fbf9f5',
    surfaceColor: '#f5f3ef',
    fontDisplay: 'Playfair Display, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    lastPublishedAt: new Date().toISOString(),
    publishedBy: 'Master Admin',
  },
  draft: {
    brandName: 'VĀNYA Haute Parfumerie',
    primaryColor: '#161616',
    secondaryColor: '#725b33',
    backgroundColor: '#fbf9f5',
    surfaceColor: '#f5f3ef',
    fontDisplay: 'Playfair Display, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
    lastModifiedAt: new Date().toISOString(),
    modifiedBy: 'Master Admin',
  },
};

function ensureStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_THEME, null, 2), 'utf8');
  }
}

function getTheme() {
  ensureStorage();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '{}');
  } catch (error) {
    return INITIAL_THEME;
  }
}

function saveDraftTheme(draftData, adminName = 'Admin') {
  ensureStorage();
  const theme = getTheme();
  theme.draft = {
    ...theme.draft,
    ...draftData,
    lastModifiedAt: new Date().toISOString(),
    modifiedBy: adminName,
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(theme, null, 2), 'utf8');
  return theme;
}

function publishTheme(adminName = 'Admin') {
  ensureStorage();
  const theme = getTheme();
  theme.published = {
    ...theme.draft,
    lastPublishedAt: new Date().toISOString(),
    publishedBy: adminName,
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(theme, null, 2), 'utf8');
  return theme;
}

module.exports = { getTheme, saveDraftTheme, publishTheme };
