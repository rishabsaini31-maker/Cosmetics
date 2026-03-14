import { Injectable } from '@nestjs/common';

// In-memory store for homepage content (replace with DB in production)
let homepageContent = {
  banners: [
    {
      title: 'Premium Serums',
      desc: 'Potent actives for glowing, healthy skin. Discover our best-selling serums.',
      img: '/serum.jpg',
      cta: 'Shop Serums',
      href: '/category/premium-serums',
    },
    {
      title: 'Science-Backed Skincare',
      desc: 'Gentle, effective, and trusted by experts. Explore our skincare essentials.',
      img: '/skincare.webp',
      cta: 'Explore Skincare',
      href: '/shop',
    },
    {
      title: 'Signature Fragrances',
      desc: 'Elevate your presence with our premium perfumes. Unforgettable scents await.',
      img: '/perfume.webp',
      cta: 'View Perfumes',
      href: '/perfumes',
    },
  ],
  createYourOwnKit: {
    title: 'Create Your Own Kit',
    description: 'Mix and match your favorites—serum, sunscreen, and more—to build a kit that fits your routine. Enjoy flexibility and savings!',
    offer: 'Buy any 3 or more, get 15% OFF',
    images: ['/skincare.webp', '/serum.jpg'],
    cta: 'Shop Now',
    ctaHref: '/shop',
  },
  // Add more sections as needed
};

@Injectable()
export class HomepageService {
  getHomepageContent() {
    return homepageContent;
  }

  updateHomepageContent(data: any) {
    homepageContent = { ...homepageContent, ...data };
    return homepageContent;
  }
}
