'use client';

import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: string;
  badge?: string;
  image: string;
  notes: string[];
}

const products: Product[] = [
  {
    id: 'prod-01',
    name: 'NOIR 01 Eau de Parfum',
    tagline: 'Smoked Oudh, Wild Bergamot & Teak Resin',
    category: 'Parfum Extrait',
    price: '₹6,800',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    notes: ['Wild Bergamot', 'Mysore Sandalwood', 'Dry Amber'],
  },
  {
    id: 'prod-02',
    name: 'Saffron Lip Salve',
    tagline: 'Kashmiri Mongra Saffron & Cold Almond Butter',
    category: 'Skincare',
    price: '₹1,450',
    badge: 'Harvest Special',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    notes: ['Mongra Saffron', 'Organic Beeswax', 'Almond Butter'],
  },
  {
    id: 'prod-03',
    name: 'Madurai Jasmine Cream',
    tagline: 'Night-Blooming Jasmine & Cold Lipid Nectar',
    category: 'Skincare',
    price: '₹3,200',
    badge: 'Limited Batch',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    notes: ['Madurai Jasmine', 'Lipid Complex', 'Vetiver Extract'],
  },
  {
    id: 'prod-04',
    name: 'Kannauj Clay Mist',
    tagline: 'Clay Steam Distillate & Morning Rose Water',
    category: 'Botanical Mist',
    price: '₹2,100',
    badge: 'Pure Hydrophile',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
    notes: ['Bhakti Clay', 'Kannauj Rose', 'Spring Water'],
  },
];

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
}

export default function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({ 'prod-01': true });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="products" className="w-full bg-surface py-space-3xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              Harvest Portfolio
            </span>
            <h2 className="font-display text-4xl text-primary mt-space-xs">The Edit</h2>
          </div>
          <div className="flex items-center gap-space-sm mt-space-md md:mt-0 font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
            <span>Displaying {products.length} Curated Flacons</span>
            <span className="w-1 h-1 rounded-full bg-outline"></span>
            <span className="text-secondary font-semibold">Complimentary Trial Included</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((p) => (
            <div
              key={p.id}
              className="group bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 border border-surface-container-high"
            >
              <div>
                <div className="relative aspect-[3/4] bg-surface-container overflow-hidden mb-space-md">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute top-space-sm left-space-sm bg-secondary text-on-secondary font-label-caps text-[0.625rem] px-2 py-0.5 uppercase tracking-widest">
                      {p.badge}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="Add to wishlist"
                    className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-on-surface hover:text-error transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        wishlist[p.id] ? 'text-error' : ''
                      }`}
                    >
                      favorite
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(p)}
                    className="absolute bottom-2 left-2 right-2 bg-surface/90 backdrop-blur-sm text-primary font-label-caps text-xs py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center"
                  >
                    Quick View
                  </button>
                </div>

                <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary block mb-1">
                  {p.category}
                </span>
                <h3 className="font-display text-lg text-primary group-hover:text-secondary transition-colors">
                  {p.name}
                </h3>
                <p className="font-body text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {p.tagline}
                </p>
              </div>

              <div className="mt-space-lg pt-space-md border-t border-surface-container-high flex items-center justify-between">
                <span className="font-body text-sm font-semibold text-primary">{p.price}</span>
                <button
                  type="button"
                  onClick={() => onAddToCart(p)}
                  className="bg-primary text-on-primary font-label-caps text-[0.65rem] px-space-md py-2 uppercase tracking-wider hover:bg-tertiary-container transition-colors"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface max-w-2xl w-full border border-surface-container-high shadow-2xl p-space-xl relative">
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg items-center">
              <div className="aspect-[3/4] bg-surface-container overflow-hidden">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-label-caps text-xs text-secondary uppercase tracking-widest mb-1">
                  {quickViewProduct.category}
                </span>
                <h3 className="font-display text-2xl text-primary mb-2">
                  {quickViewProduct.name}
                </h3>
                <p className="font-editorial-serif text-sm text-on-surface-variant mb-4">
                  {quickViewProduct.tagline}
                </p>

                <div className="bg-surface-container-low p-space-md mb-6 border-l-2 border-secondary">
                  <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block mb-1 font-semibold">
                    Key Olfactory Notes
                  </span>
                  <p className="font-body text-xs text-on-surface">
                    {quickViewProduct.notes.join(' • ')}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-body text-xl font-bold text-primary">
                    {quickViewProduct.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="bg-primary text-on-primary font-label-caps text-xs px-space-lg py-3 uppercase tracking-widest hover:bg-tertiary-container transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
