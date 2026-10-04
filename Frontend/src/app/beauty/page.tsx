'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, Product } from '@/data/products';

export default function BeautyPage() {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [filter, setFilter] = useState<'All' | 'Skincare' | 'Body Nectars'>('All');

  const beautyProducts = PRODUCTS.filter((p) => {
    if (filter === 'All') return p.category === 'Skincare' || p.category === 'Body Nectars';
    return p.category === filter;
  });

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      {/* Hero Banner */}
      <section className="bg-surface-bright border-b border-surface-container-high py-space-2xl">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Beauty</span>
          </div>

          <div className="max-w-3xl">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              Botanical Lipid Rituals
            </span>
            <h1 className="font-display text-4xl lg:text-5xl text-primary mt-space-xs mb-space-sm">
              Skincare & Body Nectars
            </h1>
            <p className="font-editorial-serif text-lg text-on-surface-variant leading-relaxed">
              Formulated to nurture the skin barrier, restore natural glow, and transform daily routines into reverent pauses with Kashmiri Mongra saffron, midnight jasmine, and organic beeswax.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop pt-space-xl">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-space-md mb-space-2xl pb-space-md border-b border-surface-container-high">
          <div className="flex items-center gap-space-xs">
            {(['All', 'Skincare', 'Body Nectars'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`font-label-caps text-xs uppercase tracking-wider px-space-md py-2 transition-all border ${
                  filter === cat
                    ? 'bg-primary text-on-primary border-primary font-semibold shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-high hover:border-secondary'
                }`}
              >
                {cat === 'All' ? 'All Beauty' : cat}
              </button>
            ))}
          </div>

          <span className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant">
            Showing {beautyProducts.length} Formulations
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
          {beautyProducts.map((p) => {
            const isFav = wishlist.includes(p.id);
            return (
              <div
                key={p.id}
                className="group bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container-high relative"
              >
                <div>
                  <Link href={`/product/${p.id}`} className="block relative aspect-[3/4] bg-surface-container overflow-hidden mb-space-md">
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(p.id);
                      }}
                      aria-label="Add to wishlist"
                      className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${isFav ? 'text-error' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </Link>

                  <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary block mb-1">
                    {p.category}
                  </span>

                  <Link href={`/product/${p.id}`}>
                    <h3 className="font-display text-xl text-primary group-hover:text-secondary transition-colors mb-1">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-3">
                    {p.tagline}
                  </p>

                  <div className="bg-surface-container-low p-space-xs border-l-2 border-secondary font-body text-[0.7rem] text-on-surface">
                    <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block font-semibold">
                      Key Botanicals:
                    </span>
                    <span className="truncate block">{p.notes.top.join(' • ')}</span>
                  </div>
                </div>

                <div className="mt-space-lg pt-space-md border-t border-surface-container-high flex items-center justify-between">
                  <span className="font-body text-base font-bold text-primary">
                    {p.formattedPrice}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(p)}
                    className="bg-primary text-on-primary font-label-caps text-xs px-space-md py-2.5 uppercase tracking-widest hover:bg-tertiary-container transition-colors shadow-sm"
                  >
                    Add to Bag
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
