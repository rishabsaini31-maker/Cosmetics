export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Parfum Extrait' | 'Botanical Mist' | 'Skincare' | 'Body Nectars' | 'Archival Sets' | 'Hampers' | 'Combos' | 'Makeup' | 'Beauty Essentials';
  subCategory?: string;
  price: number;
  formattedPrice: string;
  badge?: string;
  image: string;
  gallery?: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sillage: 'Moderate' | 'Intense' | 'Enveloping';
  longevity: '8-10 Hours' | '12+ Hours' | 'All Day';
  volume: string[];
  description: string;
  craftDetails: string;
  ingredients: string[];
  includedProducts?: string[];
  occasion?: string;
  rating?: number;
  reviewsCount?: number;
  craftTag?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'NOIR 01 Eau de Parfum',
    tagline: 'Smoked Oudh, Wild Bergamot & Teak Resin',
    category: 'Parfum Extrait',
    price: 6800,
    formattedPrice: '₹6,800',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Wild Bergamot', 'Green Cardamom', 'Pink Pepper'],
      heart: ['Mysore Sandalwood', 'Night Bloom Jasmine', 'Cypriol'],
      base: ['Smoked Oudh', 'Dry Amber', 'Teak Resin'],
    },
    sillage: 'Intense',
    longevity: '12+ Hours',
    volume: ['50 ml / 1.7 fl. oz.', '100 ml / 3.4 fl. oz.'],
    description:
      'A nocturnal olfactory masterpiece. NOIR 01 marries sun-baked Calabrian bergamot with rare Kannauj hydro-distilled teak resin and 15-year aged Assam oudh.',
    craftDetails:
      'Hand-distilled in traditional copper degs over wood fires. Aged for 180 days in neutral teakwood casks before hand-filling.',
    ingredients: ['Alcohol Denat.', 'Parfum (Fragrance)', 'Aqua (Water)', 'Santalum Album (Sandalwood) Oil', 'Limonene', 'Linalool'],
  },
  {
    id: 'prod-02',
    name: 'Saffron Lip Salve',
    tagline: 'Kashmiri Mongra Saffron & Cold Almond Butter',
    category: 'Skincare',
    price: 1450,
    formattedPrice: '₹1,450',
    badge: 'Harvest Special',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Crushed Mongra Saffron'],
      heart: ['Sweet Almond Nectar'],
      base: ['Organic Wild Beeswax', 'Raw Honey Cask'],
    },
    sillage: 'Moderate',
    longevity: '8-10 Hours',
    volume: ['15g Solid Jar'],
    description:
      'An ultra-nourishing lipid salve infused with hand-plucked Kashmiri Mongra saffron threads, organic unrefined beeswax, and cold-pressed Mamra almond butter.',
    craftDetails:
      'Infused at low temperature for 72 hours in small porcelain pots to retain bioactive carotenoids and delicate fragrance notes.',
    ingredients: ['Prunus Amygdalus Dulcis Oil', 'Cera Alba (Beeswax)', 'Crocus Sativus (Saffron) Stigma Extract', 'Tocopherol'],
  },
  {
    id: 'prod-03',
    name: 'Madurai Jasmine Cream',
    tagline: 'Night-Blooming Jasmine & Cold Lipid Nectar',
    category: 'Skincare',
    price: 3200,
    formattedPrice: '₹3,200',
    badge: 'Limited Batch',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597263-00079e96047c?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Fresh Dawn Jasmine Sambac'],
      heart: ['White Gardenia', 'Neroli Hydrosol'],
      base: ['Cold Lipid Complex', 'Vetiver Extract'],
    },
    sillage: 'Enveloping',
    longevity: '12+ Hours',
    volume: ['50 ml Glass Vessel'],
    description:
      'Rich, velvety lipid cream infused with night-harvested Madurai jasmine enfleurage. Restores lipid moisture barriers while imparting an ethereal floral halo.',
    craftDetails:
      'Jasmine blossoms are gathered at midnight when scent release peaks and cold-extracted into organic cold-pressed jojoba oils.',
    ingredients: ['Jasmine Sambac Extract', 'Jojoba Seed Oil', 'Shea Butter', 'Squalane', 'Rosemary Extract'],
  },
  {
    id: 'prod-04',
    name: 'Kannauj Clay Mist',
    tagline: 'Clay Steam Distillate & Morning Rose Water',
    category: 'Botanical Mist',
    price: 2100,
    formattedPrice: '₹2,100',
    badge: 'Pure Hydrophile',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Bhakti River Clay Steam'],
      heart: ['Kannauj Damascena Rose'],
      base: ['Spring Dew Drops'],
    },
    sillage: 'Moderate',
    longevity: '8-10 Hours',
    volume: ['100 ml Fine Mist Spray'],
    description:
      'The iconic Mitti Attar experience transformed into a hydrating facial mist. Captures the intoxicating scent of rain striking dry monsoon earth (*petrichor*).',
    craftDetails:
      'Baked sun-dried clay discs from the Ganges basin are hydro-distilled into chilled receivers containing natural rose hydrosols.',
    ingredients: ['Baked Clay Steam Distillate', 'Rosa Damascena Flower Water', 'Glycerin', 'Citric Acid'],
  },
  {
    id: 'prod-05',
    name: 'Amber Sandalwood Extrait',
    tagline: 'Mysore Sandalwood, Golden Amber & Vetiver',
    category: 'Parfum Extrait',
    price: 7500,
    formattedPrice: '₹7,500',
    badge: 'Artisanal Reserve',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Sweet Orange Blossom', 'Nutmeg'],
      heart: ['Mysore Sandalwood Heartwood'],
      base: ['Golden Amber Resin', 'Khus Vetiver Roots'],
    },
    sillage: 'Intense',
    longevity: '12+ Hours',
    volume: ['50 ml / 1.7 fl. oz.'],
    description:
      'Creamy Mysore sandalwood aged for two decades, blended with warm golden amber and wild vetiver roots harvested from Rajasthan riversides.',
    craftDetails:
      'Crafted with 35% perfume oil concentration for unmatched warmth, projection, and skin-bond longevity.',
    ingredients: ['Santalum Album Oil', 'Parfum', 'Vetiveria Zizanioides Root Oil', 'Amber Extract'],
  },
  {
    id: 'prod-06',
    name: 'Himalayan Cedar & Vetiver Nectar',
    tagline: 'Deodar Wood, Wild Khus & Cold Pressed Sesame Oil',
    category: 'Body Nectars',
    price: 4100,
    formattedPrice: '₹4,100',
    badge: 'Body Oil',
    image: 'https://images.unsplash.com/photo-1608248597263-00079e96047c?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1608248597263-00079e96047c?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Himalayan Deodar Needles'],
      heart: ['Wild River Khus Vetiver'],
      base: ['Toasted Sesame Lipid'],
    },
    sillage: 'Enveloping',
    longevity: 'All Day',
    volume: ['150 ml Glass Dropper Bottle'],
    description:
      'A rich grounding body nectar formulated to replenish parched skin. Smells like a crisp walk through high-altitude pine forests.',
    craftDetails:
      'Cold-infused with wild vetiver roots and deodar shavings for 30 lunar cycles.',
    ingredients: ['Sesamum Indicum Seed Oil', 'Cedrus Deodara Wood Oil', 'Vetiver Root Extract'],
  },
  {
    id: 'prod-07',
    name: 'Archival Discovery Vault',
    tagline: 'Curated 5 x 5ml Miniature Flacons Collection',
    category: 'Archival Sets',
    price: 5600,
    formattedPrice: '₹5,600',
    badge: 'Gift Set',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Five Signature Scent Monographs'],
      heart: ['Kannauj Clay, Jasmine, NOIR 01, Sandalwood, Rose'],
      base: ['Includes Handspun Ahimsa Silk Pouch'],
    },
    sillage: 'Moderate',
    longevity: '12+ Hours',
    volume: ['5 x 5ml Miniature Vials'],
    description:
      'The ultimate introduction to VĀNYA. Contains 5 miniature 5ml glass vials of our most celebrated extraits de parfum and hydro-distillates.',
    craftDetails:
      'Encased in hand-pressed rigid linen box with gold-embossed wax seal.',
    ingredients: ['Varies per flacon included'],
  },

  // HAMPERS CATEGORY
  {
    id: 'hamper-01',
    name: 'The Royal Botanical Hamper',
    tagline: 'NOIR 01 Parfum + Jasmine Cream + Saffron Lip Salve',
    category: 'Hampers',
    subCategory: 'Beauty + Fragrance Hampers',
    price: 8900,
    formattedPrice: '₹8,900',
    badge: 'Signature Hamper',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['NOIR 01 Extrait de Parfum (50ml)'],
      heart: ['Madurai Jasmine Lipids (50ml)'],
      base: ['Saffron Lip Salve (15g)', 'Rigid Velvet Presentation Box'],
    },
    sillage: 'Intense',
    longevity: '12+ Hours',
    volume: ['3 Full Size Ritual Vessels'],
    description:
      'Our most celebrated luxury hamper. Thoughtfully combining haute perfumery with decadent skin lipids, packaged in a handcrafted velvet gift box.',
    craftDetails:
      'Tied with handspun silk ribbon and accompanied by a personalized wax-sealed monograph card.',
    ingredients: ['See individual product components'],
    includedProducts: ['NOIR 01 Eau de Parfum (50ml)', 'Madurai Jasmine Cream (50ml)', 'Saffron Lip Salve (15g)'],
    occasion: 'Festive',
  },
  {
    id: 'hamper-02',
    name: 'Festive Silk Fragrance Coffret',
    tagline: 'Amber Sandalwood Extrait + Kannauj Clay Mist',
    category: 'Hampers',
    subCategory: 'Fragrance Hampers',
    price: 6400,
    formattedPrice: '₹6,400',
    badge: 'Festive Edition',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Amber Sandalwood Extrait (50ml)'],
      heart: ['Kannauj Clay Hydrosol Mist (100ml)'],
      base: ['Ahimsa Silk Pouch', 'Brass Incense Monograph'],
    },
    sillage: 'Intense',
    longevity: '12+ Hours',
    volume: ['2 Full Size Olfactory Vessels'],
    description:
      'A festive celebration of Indian botanical hydro-distillation. Features our rich Amber Sandalwood Extrait paired with the petrichor Kannauj Clay Mist.',
    craftDetails:
      'Housed in an embossed linen coffret box with golden wax seal.',
    ingredients: ['See individual product components'],
    includedProducts: ['Amber Sandalwood Extrait (50ml)', 'Kannauj Clay Mist (100ml)'],
    occasion: 'Wedding',
  },
  {
    id: 'hamper-03',
    name: 'Atelier Corporate Treasury Hamper',
    tagline: '5-Flacon Vault + Body Nectar + Saffron Lip Salve',
    category: 'Hampers',
    subCategory: 'Corporate Gifting',
    price: 12500,
    formattedPrice: '₹12,500',
    badge: 'Luxury Executive',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
    ],
    notes: {
      top: ['Archival Discovery Vault (5x5ml)'],
      heart: ['Himalayan Cedar Body Nectar (150ml)'],
      base: ['Saffron Lip Salve (15g)', 'Handcrafted Teak Keepsake Box'],
    },
    sillage: 'Enveloping',
    longevity: 'All Day',
    volume: ['Full Treasury Collection'],
    description:
      'The ultimate bespoke corporate gesture. Includes our entire discovery vault alongside rich body oils in a reusable carved teakwood box.',
    craftDetails:
      'Includes custom company logo engraving on gold foil band upon request.',
    ingredients: ['See individual product components'],
    includedProducts: ['Archival Discovery Vault', 'Himalayan Cedar & Vetiver Nectar', 'Saffron Lip Salve'],
    occasion: 'Corporate',
  },

  // COMBOS CATEGORY
  {
    id: 'combo-01',
    name: 'The Daily Glow Ritual Combo',
    tagline: 'Madurai Jasmine Cream + Saffron Lip Salve Duo',
    category: 'Combos',
    subCategory: 'Skincare Combos',
    price: 4200,
    formattedPrice: '₹4,200',
    badge: 'Curated Pair',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    notes: {
      top: ['Madurai Jasmine Cream (50ml)'],
      heart: ['Saffron Lip Salve (15g)'],
      base: ['Lipid Moisture Barrier Protection'],
    },
    sillage: 'Moderate',
    longevity: '12+ Hours',
    volume: ['2 Essential Skincare Steps'],
    description:
      'Thoughtfully paired to nourish facial lipid barriers while revitalizing dry lips with hand-plucked Kashmiri saffron.',
    craftDetails:
      'Cold-blended formulations designed to work synergistically for glowing, deeply hydrated skin.',
    ingredients: ['See individual product components'],
    includedProducts: ['Madurai Jasmine Cream (50ml)', 'Saffron Lip Salve (15g)'],
  },
  {
    id: 'combo-02',
    name: 'Scent & Hydration Duo',
    tagline: 'NOIR 01 Eau de Parfum + Kannauj Clay Mist',
    category: 'Combos',
    subCategory: 'Fragrance Combos',
    price: 7900,
    formattedPrice: '₹7,900',
    badge: 'Signature Duo',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
    notes: {
      top: ['NOIR 01 Extrait (50ml)'],
      heart: ['Kannauj Clay Mist (100ml)'],
      base: ['Layering Scent Ritual'],
    },
    sillage: 'Intense',
    longevity: '12+ Hours',
    volume: ['50ml Extrait + 100ml Mist'],
    description:
      'Mist skin with Kannauj petrichor clay steam before applying NOIR 01 to anchor perfume molecules for 16+ hours of projection.',
    craftDetails:
      'Paired for optimal olfactory layering.',
    ingredients: ['See individual product components'],
    includedProducts: ['NOIR 01 Eau de Parfum (50ml)', 'Kannauj Clay Mist (100ml)'],
  },
  {
    id: 'combo-03',
    name: 'Grounding Body & Soul Combo',
    tagline: 'Amber Sandalwood Extrait + Himalayan Cedar Nectar',
    category: 'Combos',
    subCategory: 'Ritual Combos',
    price: 9800,
    formattedPrice: '₹9,800',
    badge: 'Luxury Ritual',
    image: 'https://images.unsplash.com/photo-1608248597263-00079e96047c?q=80&w=800&auto=format&fit=crop',
    notes: {
      top: ['Amber Sandalwood Extrait (50ml)'],
      heart: ['Himalayan Cedar Nectar (150ml)'],
      base: ['Woody & Sandal Resonance'],
    },
    sillage: 'Enveloping',
    longevity: 'All Day',
    volume: ['50ml Extrait + 150ml Body Nectar'],
    description:
      'Apply Himalayan Cedar oil post-bath, then spray Amber Sandalwood Extrait on pulse points for an all-over meditative sanctuary.',
    craftDetails:
      'Rich in Mysore Sandalwood and wild Deodar wood lipids.',
    ingredients: ['See individual product components'],
    includedProducts: ['Amber Sandalwood Extrait (50ml)', 'Himalayan Cedar Nectar (150ml)'],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
