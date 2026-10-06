export interface IngredientItem {
  id: string;
  name: string;
  inciName: string;
  category: string;
  description: string;
  purpose: string;
  featuredIn: string[];
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  summary: string;
  description: string;
  linkHref: string;
  linkLabel: string;
}

export interface TimelineStep {
  stage: string;
  title: string;
  description: string;
}

export interface PressItem {
  id: string;
  publication: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  url?: string;
}

export interface JobPosition {
  id: string;
  title: string;
  department: 'Design' | 'Technology' | 'Marketing' | 'E-commerce' | 'Product' | 'Operations' | 'Customer Experience' | 'Content' | 'Photography';
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const ABOUT_HERO_DATA = {
  eyebrow: 'ABOUT VĀNYA',
  title: 'BEAUTY, FRAGRANCE & THE ART OF RITUAL',
  supportingCopy:
    'VĀNYA brings together fragrance, beauty and everyday rituals through thoughtfully considered products, refined design and a modern approach to self-expression.',
  ctaText: 'DISCOVER OUR STORY',
  ctaHref: '/about/our-story',
  heroImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
};

export const STORY_DATA = {
  beginning: {
    title: 'THE BEGINNING',
    eyebrow: 'ORIGINAL INSPIRATION',
    content: [
      'VĀNYA was conceived from a reverence for slow creation and sensory harmony. Inspired by traditional Indian botanical artistry and the timeless elegance of fine perfumery, the brand began as a quest to create objects of quiet luxury.',
      'In a world dominated by rapid cycles and fleeting trends, VĀNYA stands for intentionality—bringing depth, craftsmanship, and aesthetic quietude back to daily self-care.',
    ],
  },
  idea: {
    title: 'THE IDEA',
    eyebrow: 'A HARMONIOUS ECOSYSTEM',
    content: [
      'Rather than isolating scent from skincare or beauty from gifting, VĀNYA unifies Fragrance, Skincare, Body Care, and Curated Hampers into a singular, cohesive sensory universe.',
      'Every formula is designed to complement another—whether layering a botanical mist with a lipid salve or pairing a signature Eau de Parfum with a handcrafted keepsake hamper.',
    ],
  },
  evolution: [
    {
      stage: 'ORIGIN',
      title: 'Botanical Inspiration',
      description: 'Studying traditional hydro-distillation and natural plant lipids to establish our core sensory standards.',
    },
    {
      stage: 'FRAGRANCE',
      title: 'Haute Parfumerie',
      description: 'Formulating signature Extraits and Mists that celebrate complex notes and enduring sillage.',
    },
    {
      stage: 'BEAUTY',
      title: 'Skincare & Essentials',
      description: 'Expanding into essential lipid salves, botanical waters, and skin-nourishing creams.',
    },
    {
      stage: 'RITUALS',
      title: 'Everyday Self-Care',
      description: 'Designing daily practices that elevate routine tasks into moments of quiet reflection.',
    },
    {
      stage: 'GIFTING',
      title: 'Curated Sets & Hampers',
      description: 'Crafting thoughtful combinations for celebrations, weddings, and personal milestones.',
    },
    {
      stage: 'THE FUTURE',
      title: 'Thoughtful Expansion',
      description: 'Continuing to refine formulations, packaging sustainability, and olfactory discoveries.',
    },
  ] as TimelineStep[],
  today: {
    title: 'TODAY AT VĀNYA',
    description:
      'Today, VĀNYA offers a comprehensive luxury portfolio spanning Fragrance, Skincare, Makeup, Body Care, Beauty Essentials, Hampers, and Combos—each crafted with meticulous attention to detail and texture.',
  },
  future: {
    title: 'THE FUTURE',
    description:
      'We look forward to expanding our sensory offerings, deepening our commitment to responsible packaging, and introducing new olfactory compositions while honoring the quiet luxury that defines VĀNYA.',
  },
};

export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    number: '01',
    title: 'INTENTIONAL BEAUTY',
    summary: 'Products should have a clear purpose and place in everyday rituals.',
    description:
      'We believe beauty products should not clutter your space or routine. Every item in the VĀNYA collection is developed to fulfill a distinct functional and sensory role.',
    linkHref: '/shop',
    linkLabel: 'EXPLORE ALL PRODUCTS',
  },
  {
    number: '02',
    title: 'FRAGRANCE AS EXPRESSION',
    summary: 'Fragrance is not simply a product; it is part of personal expression and memory.',
    description:
      'Scent holds the unique power to evoke memories, define atmospheres, and express identity without words. Our fragrances are composed with layered complexity to evolve gracefully on the skin.',
    linkHref: '/fragrance',
    linkLabel: 'EXPLORE FRAGRANCE',
  },
  {
    number: '03',
    title: 'THOUGHTFUL FORMULATION',
    summary: 'Focus on considered ingredients, product experience and usability.',
    description:
      'Formulations prioritize tactile elegance, balanced textures, and harmonious aromas. We select ingredients deliberately for how they feel, perform, and interact with the skin.',
    linkHref: '/about/ingredients',
    linkLabel: 'LEARN ABOUT FORMULATION',
  },
  {
    number: '04',
    title: 'BEAUTY WITHOUT EXCESS',
    summary: 'Encourage thoughtful product selection rather than unnecessary consumption.',
    description:
      'Quality replaces quantity. We curate multipurpose salves, timeless extraits, and essential skincare steps that encourage mindful consumption.',
    linkHref: '/beauty',
    linkLabel: 'DISCOVER SKINCARE',
  },
  {
    number: '05',
    title: 'RITUAL OVER ROUTINE',
    summary: 'Turn everyday beauty into a more enjoyable personal ritual.',
    description:
      'Transforming habit into ritual requires slowing down. From the weight of a glass flacon to the velvet finish of a cream, every detail is engineered for sensory delight.',
    linkHref: '/journal',
    linkLabel: 'READ BEAUTY GUIDES',
  },
  {
    number: '06',
    title: 'GIVING WITH MEANING',
    summary: 'Hampers and curated combinations should make gifting more personal and thoughtful.',
    description:
      'A gift should feel personal, artistic, and memorable. Our hampers and combos pair complementary scents and skincare essentials in keepsake boxes designed to endure.',
    linkHref: '/hampers',
    linkLabel: 'EXPLORE HAMPERS',
  },
];

export const INGREDIENT_DIRECTORY: IngredientItem[] = [
  {
    id: 'ing-01',
    name: 'Mysore Sandalwood Oil',
    inciName: 'Santalum Album (Sandalwood) Oil',
    category: 'Botanical Oil & Fragrance Base',
    description: 'A prized, warm, woody essential oil known for its calming aroma and rich sensory depth.',
    purpose: 'Provides a velvety, long-lasting base note in perfumery and adds a soothing tactile feel in body formulations.',
    featuredIn: ['NOIR 01 Eau de Parfum', 'Vetiver & Smoked Oudh Extrait'],
  },
  {
    id: 'ing-02',
    name: 'Kashmiri Mongra Saffron Extract',
    inciName: 'Crocus Sativus (Saffron) Stigma Extract',
    category: 'Botanical Extract',
    description: 'Precious botanical extract rich in natural carotenoids, prized for skin luminosity and warmth.',
    purpose: 'Infuses skincare formulations with antioxidant properties and a subtle golden glow.',
    featuredIn: ['Saffron Lip Salve'],
  },
  {
    id: 'ing-03',
    name: 'Sweet Almond Oil',
    inciName: 'Prunus Amygdalus Dulcis Oil',
    category: 'Emollient Plant Lipid',
    description: 'Cold-pressed nutrient-dense plant lipid rich in fatty acids and naturally occurring Vitamin E.',
    purpose: 'Deeply conditions the skin barrier, locks in moisture, and restores softness.',
    featuredIn: ['Saffron Lip Salve', 'Spiced Cardamom Body Nectar'],
  },
  {
    id: 'ing-04',
    name: 'Jasmine Sambac Extract',
    inciName: 'Jasminum Sambac Flower Extract',
    category: 'Floral Essence',
    description: 'Fresh floral extract harvested at dawn to capture pure, sweet jasmine scent compounds.',
    purpose: 'Imparts a lush, narcotic floral heart note and aromatic serenity to creams and mists.',
    featuredIn: ['Madurai Jasmine Cream'],
  },
  {
    id: 'ing-05',
    name: 'Damask Rose Water',
    inciName: 'Rosa Damascena Flower Water',
    category: 'Hydro-distillate',
    description: 'Pure floral water produced through gentle steam distillation of fresh Damask rose petals.',
    purpose: 'Hydrates, refreshes, and balances skin tone while leaving a soft, romantic botanical aroma.',
    featuredIn: ['Rose Water Hydro-Mist'],
  },
  {
    id: 'ing-06',
    name: 'Plant-Derived Squalane',
    inciName: 'Squalane',
    category: 'Lipid Hydrator',
    description: 'Lightweight, biocompatible lipid that mimics the skin natural sebum structure.',
    purpose: 'Delivers weightless moisture without clogging pores or leaving greasy residues.',
    featuredIn: ['Madurai Jasmine Cream'],
  },
  {
    id: 'ing-07',
    name: 'Baked Clay Steam Distillate',
    inciName: 'Terracotta Steam Distillate (Attar Mitti)',
    category: 'Traditional Hydro-Distillate',
    description: 'Traditional distillate capturing the nostalgic aroma of rain meeting sun-baked clay.',
    purpose: 'Provides an earthy, grounding olfactory accord in signature mists.',
    featuredIn: ['Rose Water Hydro-Mist'],
  },
  {
    id: 'ing-08',
    name: 'Khus Vetiver Root Oil',
    inciName: 'Vetiveria Zizanioides Root Oil',
    category: 'Essential Oil',
    description: 'Deeply grounding root oil distilled from wild vetiver grass roots.',
    purpose: 'Adds smoky, earthy green complexity and fixative longevity to fragrances.',
    featuredIn: ['Vetiver & Smoked Oudh Extrait', 'Spiced Cardamom Body Nectar'],
  },
  {
    id: 'ing-09',
    name: 'Cold-Pressed Sesame Seed Oil',
    inciName: 'Sesamum Indicum Seed Oil',
    category: 'Nourishing Lipid',
    description: 'Traditional lipid oil valued in wellness practices for its restorative texture.',
    purpose: 'Sinks smoothly into the skin to provide lasting nourishment and lipid barrier support.',
    featuredIn: ['Spiced Cardamom Body Nectar'],
  },
  {
    id: 'ing-10',
    name: 'Himalayan Cedarwood Oil',
    inciName: 'Cedrus Deodara Wood Oil',
    category: 'Aromatic Essential Oil',
    description: 'Resinous wood oil with a crisp, balsamic forest character.',
    purpose: 'Lends structural warmth and grounding woody notes to body oils and extraits.',
    featuredIn: ['Spiced Cardamom Body Nectar'],
  },
  {
    id: 'ing-11',
    name: 'Vitamin E (Tocopherol)',
    inciName: 'Tocopherol',
    category: 'Antioxidant',
    description: 'Essential lipid-soluble antioxidant ingredient derived from plant sources.',
    purpose: 'Protects lipid ingredients from oxidation and supports skin health.',
    featuredIn: ['Saffron Lip Salve', 'Madurai Jasmine Cream'],
  },
];

export const PRESS_ITEMS: PressItem[] = [
  // Empty state active by default per guidelines if no real press features exist yet.
  // Can be populated dynamically if press features are added.
];

export const PRESS_MEDIA_CONTACT = {
  email: 'press@vanya-haute-parfumerie.com',
  address: 'Media & Communications Atelier, VĀNYA Haute Parfumerie',
  note: 'For editorial inquiries, sample requests, or brand feature assets, please contact our media team.',
};

export const CAREER_POSITIONS: JobPosition[] = [
  // Empty state active by default per guidelines if no active job listings exist yet.
];

export const CAREERS_CONTACT = {
  email: 'careers@vanya-haute-parfumerie.com',
  note: "While we may not have an active opening matching your exact profile today, we are always eager to connect with passionate individuals who share our vision for luxury, beauty, and craftsmanship.",
};
