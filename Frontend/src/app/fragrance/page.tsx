'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, Product } from '@/data/products';
import FilterSidebar, { FilterState } from '@/components/FilterSidebar';

const initialFilterState: FilterState = {
  category: 'Perfumes & Extraits',
  fragranceFamily: [],
  maxPrice: 8000,
  pricePreset: null,
  volume: null,
  expression: 'Unisex / Transcendent',
  inStockOnly: false,
};

export default function FragrancePage() {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fragranceProducts = PRODUCTS.filter((p) => {
    if (p.category !== 'Parfum Extrait' && p.category !== 'Botanical Mist') return false;
    if (p.price > filters.maxPrice) return false;
    return true;
  });

  const handleResetFilters = () => setFilters(initialFilterState);

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      {/* Hero Banner */}
      <section className="bg-surface-bright border-b border-surface-container-high py-space-2xl">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Fragrance</span>
          </div>

          <div className="max-w-3xl">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              Haute Parfumerie & Extraits
            </span>
            <h1 className="font-display text-4xl lg:text-5xl text-primary mt-space-xs mb-space-sm">
              The Olfactory Collections
            </h1>
            <p className="font-editorial-serif text-lg text-on-surface-variant leading-relaxed">
              Hand-distilled in traditional Kannauj copper deg stills. Formulated with high concentrations of 15-year aged oudh, Mysore sandalwood, and cold-extracted wild bergamot.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop pt-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-32">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalResults={PRODUCTS.length}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between font-label-caps text-xs uppercase tracking-wider text-on-surface-variant mb-space-md pb-2 border-b border-surface-container-low">
              <span>Showing <strong>{fragranceProducts.length}</strong> Olfactory Flacons</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden bg-primary text-on-primary px-3 py-1 text-xs"
              >
                Refine
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {fragranceProducts.map((p) => {
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
                        <h3 className="font-display text-lg text-primary group-hover:text-secondary transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <p className="font-body text-xs text-on-surface-variant mt-1 leading-relaxed">
                        {p.tagline}
                      </p>
                    </div>

                    <div className="mt-space-lg pt-space-md border-t border-surface-container-high flex items-center justify-between">
                      <span className="font-body text-sm font-semibold text-primary">
                        {p.formattedPrice}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(p)}
                        className="bg-primary text-on-primary font-label-caps text-[0.65rem] px-space-md py-2 uppercase tracking-wider hover:bg-tertiary-container transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-surface h-full overflow-y-auto p-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="absolute top-4 right-4 text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <div className="mt-8">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
                totalResults={PRODUCTS.length}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
