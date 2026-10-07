const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/content.json');

const INITIAL_CONTENT = {
  announcements: [
    'COMPLIMENTARY SHIPPING ABOVE ₹999',
    'BESPOKE PACKAGING & ARTISANAL SAMPLES INCLUDED',
    'DISCOVER BEAUTY & FRAGRANCE',
    'CURATED HAMPERS FOR EVERY OCCASION',
    'EXPLORE SIGNATURE COMBOS',
  ],
  homepage: {
    hero: {
      eyebrow: 'VĀNYA HAUTE PARFUMERIE',
      headline: 'BEAUTY, FRAGRANCE & THE ART OF RITUAL',
      description: 'Indian botanical luxury, slow hydro-distillations, and haute perfumery crafted in small batches.',
      primaryCta: 'EXPLORE SHOP',
      primaryCtaLink: '/shop',
      secondaryCta: 'DISCOVER FRAGRANCES',
      secondaryCtaLink: '/fragrance',
    },
    sectionsOrder: [
      'announcementBar',
      'hero',
      'featuredProducts',
      'fragranceSection',
      'beautySection',
      'hampers',
      'combos',
      'giftingEdit',
      'editorialBanner',
      'newsletter',
    ],
  },
  navigation: [
    { label: 'SHOP', href: '/shop', visible: true },
    { label: 'FRAGRANCE', href: '/fragrance', visible: true },
    { label: 'BEAUTY', href: '/beauty', visible: true },
    { label: 'HAMPERS', href: '/hampers', visible: true },
    { label: 'COMBOS', href: '/combos', visible: true },
    { label: 'DISCOVER', href: '/discover', visible: true },
    { label: 'ABOUT', href: '/about', visible: true },
  ],
};

function ensureStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_CONTENT, null, 2), 'utf8');
  }
}

function getContent() {
  ensureStorage();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '{}');
  } catch (error) {
    console.error('Error reading content storage:', error);
    return INITIAL_CONTENT;
  }
}

function updateContent(newContent) {
  ensureStorage();
  try {
    const current = getContent();
    const updated = { ...current, ...newContent };
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  } catch (error) {
    console.error('Error updating content storage:', error);
    return null;
  }
}

module.exports = { getContent, updateContent };
