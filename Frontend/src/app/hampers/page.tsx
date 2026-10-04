'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, Product } from '@/data/products';

const hamperCategories = [
  'All Hampers',
  'Beauty Hampers',
  'Fragrance Hampers',
  'Beauty + Fragrance Hampers',
  'Premium Hampers',
  'Festive Hampers',
  'Corporate Gifting',
];

const occasions = ['All Occasions', 'Birthday', 'Wedding', 'Festive', 'Anniversary', 'Corporate', 'Self Care', 'Celebration'];

export default function HampersPage() {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedCat, setSelectedCat] = useState('All Hampers');
  const [selectedOccasion, setSelectedOccasion] = useState('All Occasions');

  const hampers = PRODUCTS.filter((p) => {
    if (p.category !== 'Hampers' && p.category !== 'Archival Sets') return false;
    if (selectedCat !== 'All Hampers' && p.subCategory !== selectedCat) return false;
    if (selectedOccasion !== 'All Occasions' && p.occasion !== selectedOccasion) return false;
    return true;
  });

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      {/* Editorial Hero */}
      <section className="relative w-full bg-surface-bright border-b border-surface-container-high py-space-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col z-10">
              <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <span className="text-primary font-semibold">Hampers</span>
              </div>

              <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
                Curated Gifting Collection
              </span>
              <h1 className="font-display text-4xl lg:text-6xl text-primary mt-space-xs mb-space-md leading-[1.08]">
                THE GIFTING EDIT
              </h1>
              <p className="font-editorial-serif text-lg lg:text-xl text-on-surface-variant max-w-xl mb-space-2xl leading-relaxed">
                Thoughtfully curated beauty and fragrance rituals, ready to give. Beautifully packaged in bespoke velvet & ahimsa silk presentation boxes.
              </p>

              <div className="flex items-center gap-space-md">
                <a
                  href="#hamper-grid"
                  className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-4 hover:bg-tertiary-container transition-colors shadow-md"
                >
                  EXPLORE HAMPERS
                </a>
              </div>
            </div>

            {/* Hero Multi-Product Showcase (Perfume + Skincare + Body Care + Packaging) */}
            <div className="lg:col-span-6 relative mt-space-lg lg:mt-0">
              <div className="relative aspect-[4/3] bg-surface-container overflow-hidden shadow-2xl border border-surface-container-high">
                <img
                  src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200&auto=format&fit=crop"
                  alt="Bespoke luxury hamper box containing perfume flacon, jasmine skincare jar, and saffron salve"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-space-lg text-on-primary flex items-end justify-between">
                  <div>
                    <span className="font-label-caps text-[0.65rem] tracking-[0.2em] uppercase text-secondary-fixed-dim block mb-1">
                      Archival Gifting Edition
                    </span>
                    <h4 className="font-display text-xl text-on-primary">The Royal Botanical Treasury Box</h4>
                  </div>
                  <span className="font-label-caps text-xs text-secondary-fixed-dim tracking-widest uppercase">
                    Bespoke Silk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hampers Filter & Catalog Section */}
      <div id="hamper-grid" className="max-w-7xl mx-auto px-margin lg:px-margin-desktop pt-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl pb-space-md border-b border-surface-container-high">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              Artisanal Presentation
            </span>
            <h2 className="font-display text-3xl text-primary mt-space-xs">
              Explore Luxury Hampers
            </h2>
          </div>

          <span className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant mt-2 md:mt-0">
            Showing {hampers.length} Curated Coffrets
          </span>
        </div>

        {/* Categories & Occasion Filters */}
        <div className="space-y-space-md mb-space-2xl">
          {/* Primary Category Pills */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-2 scrollbar-none">
            {hamperCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`font-label-caps text-xs uppercase tracking-wider px-space-md py-2 transition-all whitespace-nowrap border ${
                  selectedCat === cat
                    ? 'bg-primary text-on-primary border-primary font-semibold shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-high hover:border-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Occasion Filter Row */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-2 scrollbar-none text-xs font-label-caps uppercase tracking-wider">
            <span className="text-secondary font-semibold mr-2">Occasion:</span>
            {occasions.map((occ) => (
              <button
                key={occ}
                type="button"
                onClick={() => setSelectedOccasion(occ)}
                className={`px-3 py-1 transition-colors ${
                  selectedOccasion === occ ? 'text-primary font-bold underline' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Hampers Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
          {hampers.map((h) => {
            const isFav = wishlist.includes(h.id);
            return (
              <div
                key={h.id}
                className="group bg-surface-container-lowest p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container-high relative"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-surface-container overflow-hidden mb-space-md">
                    <img
                      src={h.image}
                      alt={h.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {h.badge && (
                      <span className="absolute top-space-sm left-space-sm bg-secondary text-on-secondary font-label-caps text-[0.625rem] px-2 py-0.5 uppercase tracking-widest">
                        {h.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(h.id)}
                      aria-label="Add to wishlist"
                      className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-on-surface hover:text-error transition-colors"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${isFav ? 'text-error' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary block mb-1">
                    {h.subCategory || h.category}
                  </span>

                  <Link href={`/product/${h.id}`}>
                    <h3 className="font-display text-xl text-primary group-hover:text-secondary transition-colors mb-2">
                      {h.name}
                    </h3>
                  </Link>

                  <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed mb-4">
                    {h.description}
                  </p>

                  {/* Included Products Breakdown */}
                  {h.includedProducts && (
                    <div className="bg-surface-container-low p-space-sm border-l-2 border-secondary mb-4">
                      <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block font-semibold mb-1">
                        Included Ritual Vessels:
                      </span>
                      <ul className="font-body text-xs text-on-surface space-y-0.5 list-disc list-inside">
                        {h.includedProducts.map((inc, i) => (
                          <li key={i}>{inc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-space-lg pt-space-md border-t border-surface-container-high flex items-center justify-between">
                  <span className="font-body text-lg font-bold text-primary">
                    {h.formattedPrice}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(h)}
                    className="bg-primary text-on-primary font-label-caps text-xs px-space-md py-3 uppercase tracking-widest hover:bg-tertiary-container transition-colors shadow-sm"
                  >
                    Add Hamper to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
