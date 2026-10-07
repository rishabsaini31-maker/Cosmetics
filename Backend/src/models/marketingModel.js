const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/marketing.json');

const INITIAL_MARKETING = {
  coupons: [
    {
      id: 'coup-01',
      code: 'VANYAWELCOME10',
      discountType: 'percentage',
      discountValue: 10,
      minPurchase: 2000,
      usageCount: 48,
      status: 'Active',
      expiresAt: '2026-12-31T23:59:59.000Z',
    },
    {
      id: 'coup-02',
      code: 'HARVESTLUXURY',
      discountType: 'fixed',
      discountValue: 500,
      minPurchase: 5000,
      usageCount: 19,
      status: 'Active',
      expiresAt: '2026-11-30T23:59:59.000Z',
    },
  ],
  promotions: [
    {
      id: 'prom-01',
      title: 'Complimentary Discovery Sample Set',
      description: 'Receive 2 complimentary 2ml extrait samples with orders above ₹3,000.',
      status: 'Active',
    },
  ],
  reviews: [
    {
      id: 'rev-01',
      productName: 'NOIR 01 Eau de Parfum',
      customerName: 'Kavita M.',
      rating: 5,
      comment: 'An intoxicating, sultry fragrance with incredible longevity.',
      status: 'Approved',
      date: '2026-10-04T12:00:00.000Z',
    },
  ],
};

function ensureStorage() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_MARKETING, null, 2), 'utf8');
  }
}

function getMarketingData() {
  ensureStorage();
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content || '{}');
  } catch (error) {
    return INITIAL_MARKETING;
  }
}

function saveMarketingData(data) {
  ensureStorage();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

module.exports = { getMarketingData, saveMarketingData };
