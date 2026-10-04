'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, Product } from '@/data/products';

const comboCategories = [
  'All Combos',
  'Fragrance Combos',
  'Skincare Combos',
  'Makeup Combos',
  'Body Care Combos',
  'Ritual Combos',
];

export default function CombosPage() {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All Combos');

  const combos = PRODUCTS.filter((p) => {
    if (p.category !== 'Combos') return false;
    if (selectedCategory !== 'All Combos' && p.subCategory !== selectedCategory) return false;
    return true;
  });

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop pt-space-md">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Combos</span>
        </div>

        {/* Header Title */}
        <div className="mb-space-2xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
            Synergistic Pairings
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mt-space-xs">
            CURATED COMBOS
          </h1>
          <p className="font-editorial-serif text-editorial-serif text-on-surface-variant max-w-2xl mt-space-sm">
            Thoughtfully paired products designed to work beautifully together. Formulated to layer seamlessly for enhanced sillage and moisture barrier protection.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-2 scrollbar-none mb-space-2xl border-b border-surface-container-low">
          {comboCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`font-label-caps text-xs uppercase tracking-wider px-space-md py-2 transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary border-primary font-semibold shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-high hover:border-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Combos Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
          {combos.map((c) => {
            const isFav = wishlist.includes(c.id);
            return (
              <div
                key={c.id}
                className="group bg-surface-container-lowest p-space-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container-high relative"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-surface-container overflow-hidden mb-space-md">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {c.badge && (
                      <span className="absolute top-space-sm left-space-sm bg-secondary text-on-secondary font-label-caps text-[0.625rem] px-2 py-0.5 uppercase tracking-widest">
                        {c.badge}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(c.id)}
                      aria-label="Add to wishlist"
                      className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-on-surface hover:text-error transition-colors"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${isFav ? 'text-error' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </div>

                  <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary block mb-1">
                    {c.subCategory || c.category}
                  </span>

                  <Link href={`/product/${c.id}`}>
                    <h3 className="font-display text-xl text-primary group-hover:text-secondary transition-colors mb-2">
                      {c.name}
                    </h3>
                  </Link>

                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4">
                    {c.description}
                  </p>

                  {/* Included Products List */}
                  {c.includedProducts && (
                    <div className="bg-surface-container-low p-space-sm border-l-2 border-secondary mb-4">
                      <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block font-semibold mb-1">
                        Products Included in Combo:
                      </span>
                      <ul className="font-body text-xs text-on-surface space-y-0.5 list-disc list-inside">
                        {c.includedProducts.map((inc, i) => (
                          <li key={i}>{inc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-space-lg pt-space-md border-t border-surface-container-high flex items-center justify-between">
                  <span className="font-body text-lg font-bold text-primary">
                    {c.formattedPrice}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(c)}
                    className="bg-primary text-on-primary font-label-caps text-xs px-space-md py-3 uppercase tracking-widest hover:bg-tertiary-container transition-colors shadow-sm"
                  >
                    Add Combo to Bag
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
