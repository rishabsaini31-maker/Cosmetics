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
      heroImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop',
    },
    featuredSection: {
      title: 'CURATED SELECTIONS',
      subtitle: 'Handpicked icons of scent & skin ritual',
      bannerImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    },
    fragranceSection: {
      title: 'HAUTE PARFUMERIE',
      subtitle: 'Rare extraits distilled in copper degs',
      description: 'Pure botanical essences harvested at peak bloom in Kannauj & Madurai.',
      bannerImage: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1200&auto=format&fit=crop',
    },
    beautySection: {
      title: 'SKIN & BEAUTY RITUALS',
      subtitle: 'Kashmiri saffron, sandalwood & cold-pressed oils',
      description: 'Nourishing serums, lip balms, and face mists formulated for radiant skin.',
      bannerImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
    },
    giftingEdit: {
      title: 'ARTISANAL GIFTING',
      subtitle: 'Bespoke hampers & pairing combos for moments of joy',
      description: 'Housed in velvet boxes sealed with traditional wax seals.',
      bannerImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200&auto=format&fit=crop',
    },
    editorialBanner: {
      title: 'OUR PHILOSOPHY',
      quote: '"Scent is the most intimate form of memory, woven from flowers, earth, and time."',
      author: 'VĀNYA Master Perfumer',
      bgImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1600&auto=format&fit=crop',
    },
  },
  pages: {
    about: {
      title: 'OUR STORY & HERITAGE',
      subtitle: 'The House of VĀNYA',
      heroImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1600&auto=format&fit=crop',
      philosophyText: 'Founded on the traditions of Indian hydro-distillation and slow beauty rituals.',
      craftImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
      sourcingText: 'Every flower is handpicked at dawn by heritage farming families across Kannauj, Kashmir, and Tamil Nadu.',
    },
    fragrance: {
      title: 'SIGNATURE PARFUM EXTRAITS',
      subtitle: 'Artisanal Perfumery',
      heroImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop',
      description: 'Explore high-concentration extraits de parfum crafted with rare absolute oils.',
    },
    skincare: {
      title: 'BOTANICAL BEAUTY & SKINCARE',
      subtitle: 'Nourishing Formulas',
      heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600&auto=format&fit=crop',
      description: 'Ancient Ayurvedic wisdom meets modern high-performance botanical chemistry.',
    },
    makeup: {
      title: 'BEAUTY & COLOR RITUALS',
      subtitle: 'Pure Pigments & Balms',
      heroImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop',
      description: 'Enriched with cold-pressed rosehip and saffron oils for a natural luminous glow.',
    },
    bodycare: {
      title: 'BODY & BATH ESSENTIALS',
      subtitle: 'Indulgent Self-Care',
      heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1600&auto=format&fit=crop',
      description: 'Body lotions, aromatic oils, and botanical cleansers scented with royal florals.',
    },
    hampers: {
      title: 'ROYAL GIFT HAMPERS',
      subtitle: 'Curated Celebrations',
      heroImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop',
      description: 'Artisanal gift sets wrapped in silk ribbons and personalized calligraphic notes.',
    },
    combos: {
      title: 'SIGNATURE COMBOS & PAIRINGS',
      subtitle: 'Perfectly Matched Sets',
      heroImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1600&auto=format&fit=crop',
      description: 'Complementary perfume and skincare duos curated for layerable fragrance.',
    },
  },
  footer: {
    tagline: 'VĀNYA HAUTE PARFUMERIE & BOTANICAL BEAUTY',
    bioText: 'Crafting slow luxury fragrance, skincare, and gifting hampers infused with pure Indian botanical distillations.',
    copyrightText: '© 2026 VĀNYA HAUTE PARFUMERIE. ALL RIGHTS RESERVED.',
    logoImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop',
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
