export interface FAQItem {
  id: string;
  category: 'ORDERS' | 'SHIPPING' | 'RETURNS & EXCHANGES' | 'PAYMENTS' | 'FRAGRANCE' | 'SKINCARE' | 'MAKEUP' | 'HAMPERS & COMBOS' | 'ACCOUNT';
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  // CATEGORY 1 — ORDERS
  {
    id: 'ord-1',
    category: 'ORDERS',
    question: 'How do I place an order?',
    answer: 'Browse our curated catalog under Fragrance, Skincare, Makeup, Body Care, Hampers, or Combos. Select your desired flacon volume or size, click "Add to Bag", and proceed to Checkout. Enter your shipping information and complete payment via your preferred option.',
  },
  {
    id: 'ord-2',
    category: 'ORDERS',
    question: 'Can I modify my order after placing it?',
    answer: 'Because our atelier hand-packs orders within 12–24 hours of placement, modifications can only be requested within 2 hours of order confirmation. Please reach out to our Concierge at concierge@vanya-artisanal.com or via Contact Us with your order number.',
  },
  {
    id: 'ord-3',
    category: 'ORDERS',
    question: 'Can I cancel my order?',
    answer: 'Cancellations are accepted prior to dispatch. Once your order has been handed over to our courier partner (indicated by a tracking number dispatch notification), it cannot be cancelled, but you may request a return upon delivery in accordance with our Return Policy.',
  },
  {
    id: 'ord-4',
    category: 'ORDERS',
    question: 'Where can I find my order number?',
    answer: 'Your unique order number (e.g. VNY-948201 or VAN-9821-IN) is included in your instant SMS and email confirmation receipts. If you have an account, you can also view all past order numbers under Passport / Recent Orders.',
  },

  // CATEGORY 2 — SHIPPING
  {
    id: 'shp-1',
    category: 'SHIPPING',
    question: 'What are the shipping charges?',
    answer: 'Standard courier shipping is flat ₹99 for orders under ₹999 across India. All orders above ₹999 qualify for complimentary shipping.',
  },
  {
    id: 'shp-2',
    category: 'SHIPPING',
    question: 'Do you offer complimentary shipping?',
    answer: 'Yes. We offer complimentary insured shipping across India on all cart orders exceeding ₹999.',
  },
  {
    id: 'shp-3',
    category: 'SHIPPING',
    question: 'How long does delivery take?',
    answer: 'Metro cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad) typically receive packages within 2–3 business days. Non-metro locations and rest of India require 4–6 business days.',
  },
  {
    id: 'shp-4',
    category: 'SHIPPING',
    question: 'How can I track my order?',
    answer: 'As soon as your package is dispatched, we send an AWB courier tracking link via SMS and email. You can also enter your order number on our Order Tracking page at any time.',
  },
  {
    id: 'shp-5',
    category: 'SHIPPING',
    question: 'What happens if my order is delayed?',
    answer: 'If weather or regional logistics disrupt standard transit schedules, our team actively monitors the shipment. You can check real-time courier updates on our Order Tracking page or write to us for priority escalation.',
  },

  // CATEGORY 3 — RETURNS & EXCHANGES
  {
    id: 'ret-1',
    category: 'RETURNS & EXCHANGES',
    question: 'How do I request a return?',
    answer: 'Visit our Returns & Exchanges page or navigate to Request a Return. Enter your Order Number and email to select the eligible item and submit your return request for review.',
  },
  {
    id: 'ret-2',
    category: 'RETURNS & EXCHANGES',
    question: 'Can I exchange a product?',
    answer: 'Exchanges are permitted within 14 days of delivery for unopened, sealed products, or in cases where a damaged or incorrect product was delivered.',
  },
  {
    id: 'ret-3',
    category: 'RETURNS & EXCHANGES',
    question: 'Which products are eligible for return?',
    answer: 'Products that are unopened, unused, with intact tamper seals and original luxury outer packaging are eligible for return within 14 days of delivery.',
  },
  {
    id: 'ret-4',
    category: 'RETURNS & EXCHANGES',
    question: 'What happens if my product arrives damaged?',
    answer: 'If your flacon or box arrives damaged during transit, please notify us within 48 hours of delivery with photos of the outer package and damaged bottle. We will arrange a complimentary immediate replacement pick-up.',
  },
  {
    id: 'ret-5',
    category: 'RETURNS & EXCHANGES',
    question: 'How are refunds processed?',
    answer: 'Once returned items pass atelier inspection, refunds are credited back to the original payment method (or issued as store credit) through our payment gateway integrated with the store.',
  },

  // CATEGORY 4 — PAYMENTS
  {
    id: 'pay-1',
    category: 'PAYMENTS',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major payment modes including UPI (Google Pay, PhonePe, Paytm, BHIM), Visa, Mastercard, American Express, Net Banking, and select digital wallets.',
  },
  {
    id: 'pay-2',
    category: 'PAYMENTS',
    question: 'Why did my payment fail?',
    answer: 'Payment failures are typically caused by bank server timeouts, OTP delays, or daily limit caps. Please verify your banking details or try an alternative method like UPI.',
  },
  {
    id: 'pay-3',
    category: 'PAYMENTS',
    question: 'What if money was deducted but my order was not created?',
    answer: 'If your bank account was debited without generating an order confirmation, banks automatically auto-reverse pending debits within 3–5 business days. You can also send us your payment transaction reference for verification.',
  },
  {
    id: 'pay-4',
    category: 'PAYMENTS',
    question: 'How is payment security handled?',
    answer: 'Payment processing is handled securely through PCI-compliant payment providers integrated with the store. VĀNYA never stores sensitive credit card or banking PIN information on its servers.',
  },

  // CATEGORY 5 — FRAGRANCE
  {
    id: 'frg-1',
    category: 'FRAGRANCE',
    question: 'How do I choose a fragrance?',
    answer: 'Explore our Olfactory Collections or use our interactive Fragrance Finder to discover scents matched to your sensory accord preferences (Woody & Santal, Floral Jasmine & Rose, Amber Oriental, Fresh Citrus, or Oud).',
  },
  {
    id: 'frg-2',
    category: 'FRAGRANCE',
    question: 'What is a fragrance family?',
    answer: 'Fragrance families categorize scents based on dominant ingredient accords—such as Floral, Woody, Oriental, Citrus, and Aromatic—helping you identify blends that harmonise with your personal chemistry.',
  },
  {
    id: 'frg-3',
    category: 'FRAGRANCE',
    question: 'What is the difference between Extrait de Parfum and Eau de Parfum?',
    answer: 'Extrait de Parfum features a higher concentration of pure botanical oils (25%–35%), offering long-lasting sillage (12+ hours), whereas standard EDP contains 15%–20% perfume oil.',
  },
  {
    id: 'frg-4',
    category: 'FRAGRANCE',
    question: 'Do you offer discovery sets?',
    answer: 'Yes! Our Archival Discovery Quads include 4x10ml miniature spray flacons, allowing you to sample multiple signature extraits before investing in a full 50ml or 100ml bottle.',
  },
  {
    id: 'frg-5',
    category: 'FRAGRANCE',
    question: 'How should I store my perfume?',
    answer: 'Keep flacons in a cool, dry room away from direct sunlight, humidity, and extreme temperature shifts to preserve the integrity of natural essential oils.',
  },

  // CATEGORY 6 — SKINCARE
  {
    id: 'skn-1',
    category: 'SKINCARE',
    question: 'How should I choose skincare products?',
    answer: 'Identify your skin barrier needs—hydrating hydrosols, lipid lip salves, or botanical facial nectars. Filter our Skincare collection by concerns such as hydration, glow, or barrier restoration.',
  },
  {
    id: 'skn-2',
    category: 'SKINCARE',
    question: 'How do I build a routine?',
    answer: 'Start with a gentle botanical cleanser, mist a pure hydrosol (like Kannauj Rose Water) onto damp skin, apply targeted serum or facial nectar, and seal moisture with an Ayurvedic balm or lipid cream.',
  },
  {
    id: 'skn-3',
    category: 'SKINCARE',
    question: 'Where can I find product ingredients?',
    answer: 'Full ingredient transparency lists are published on every individual product page under the "Craft & Ingredients" tab as well as printed on outer product packaging.',
  },
  {
    id: 'skn-4',
    category: 'SKINCARE',
    question: 'Can I return opened skincare products?',
    answer: 'To adhere to hygiene and cosmetic safety standards, opened or used skincare containers cannot be accepted for return unless the item arrived defective or damaged.',
  },

  // CATEGORY 7 — MAKEUP
  {
    id: 'mkp-1',
    category: 'MAKEUP',
    question: 'What makeup categories do you offer?',
    answer: 'We curate botanical tint balms, natural lip pigments, mineral illuminators, and silk face powders formulated with pure plant-derived lipid bases.',
  },
  {
    id: 'mkp-2',
    category: 'MAKEUP',
    question: 'How do I choose shades?',
    answer: 'Our product descriptions contain undertone guidance (Warm Golden, Cool Rose, Neutral Ivory). You can also consult our Beauty & Fragrance guide for recommendations.',
  },
  {
    id: 'mkp-3',
    category: 'MAKEUP',
    question: 'Are makeup products returnable?',
    answer: 'Due to safety guidelines, makeup products must be unsealed and unopened in original shrink wrap to be eligible for return.',
  },

  // CATEGORY 8 — HAMPERS & COMBOS
  {
    id: 'hmp-1',
    category: 'HAMPERS & COMBOS',
    question: 'What are Hampers?',
    answer: 'Hampers are bespoke luxury gift boxes containing curated assortments of fragrances, skincare, and artisanal accessories packaged in handmade rigid linen boxes.',
  },
  {
    id: 'hmp-2',
    category: 'HAMPERS & COMBOS',
    question: 'Can I customize a hamper?',
    answer: 'Custom hamper requests for weddings, corporate gifting, or festive celebrations can be submitted through our Contact Us page under "Hamper question".',
  },
  {
    id: 'hmp-3',
    category: 'HAMPERS & COMBOS',
    question: 'What are Combos?',
    answer: 'Combos pair complementary ritual products—such as a 50ml Extrait de Parfum with a matching Botanical Mist—at a special bundled price.',
  },
  {
    id: 'hmp-4',
    category: 'HAMPERS & COMBOS',
    question: 'Can I purchase a hamper as a gift and add a message?',
    answer: 'Yes! During checkout, select "Add Gift Message" to include a personalized handwritten gold-embossed card inside the package.',
  },

  // CATEGORY 9 — ACCOUNT
  {
    id: 'acc-1',
    category: 'ACCOUNT',
    question: 'How do I create an account?',
    answer: 'Click the Profile icon in the top header menu and select "Register". Enter your email and password to activate your VĀNYA Member Passport.',
  },
  {
    id: 'acc-2',
    category: 'ACCOUNT',
    question: 'How do I change my account information?',
    answer: 'Log in to your account and visit the Profile / Account Monograph section to update your email, shipping address, or phone number.',
  },
  {
    id: 'acc-3',
    category: 'ACCOUNT',
    question: 'Where can I view my orders?',
    answer: 'All active and past orders are accessible under Account / Member Passport, or directly via the Order Tracking page using your order number.',
  },
  {
    id: 'acc-4',
    category: 'ACCOUNT',
    question: 'How do I manage my wishlist?',
    answer: 'Click the heart icon on any flacon or product card to add it to your Wishlist vault. View your saved items at any time by clicking the Wishlist (♡) icon in the top header.',
  },
];
