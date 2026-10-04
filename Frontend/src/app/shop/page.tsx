'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, Product } from '@/data/products';
import FilterSidebar, { FilterState } from '@/components/FilterSidebar';

const initialFilterState: FilterState = {
  category: 'All Offerings',
  fragranceFamily: [],
  maxPrice: 8000,
  pricePreset: null,
  volume: null,
  expression: 'Unisex / Transcendent',
  inStockOnly: false,
};

export default function ShopPage() {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtering Logic
  const filtered = PRODUCTS.filter((p) => {
    // 1. Category filter
    if (filters.category !== 'All Offerings' && filters.category !== 'All') {
      if (filters.category === 'Perfumes & Extraits' && p.category !== 'Parfum Extrait') return false;
      if (filters.category === 'Botanical Mists' && p.category !== 'Botanical Mist') return false;
      if (filters.category === 'Skincare & Balms' && p.category !== 'Skincare') return false;
      if (filters.category === 'Botanical Body Care' && p.category !== 'Body Nectars') return false;
      if (filters.category === 'Discovery Sets' && p.category !== 'Archival Sets') return false;
    }

    // 2. Price filter
    if (p.price > filters.maxPrice) return false;

    // 3. Volume filter
    if (filters.volume && !p.volume.some((v) => v.toLowerCase().includes(filters.volume!.toLowerCase().split(' ')[0]))) {
      // Soft check on volume
    }

    return true;
  });

  // Sorting Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const handleResetFilters = () => setFilters(initialFilterState);

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md pt-space-md">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Shop All</span>
        </div>

        {/* Header Title */}
        <div className="mb-space-xl pb-space-md border-b border-surface-container-high flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              Harvest Portfolio
            </span>
            <h1 className="font-display text-4xl lg:text-5xl text-primary mt-space-xs">
              Haute Parfumerie & Botanical Catalog
            </h1>
          </div>

          <div className="flex items-center gap-space-md">
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 font-label-caps text-xs uppercase tracking-wider bg-primary text-on-primary px-4 py-2"
            >
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>Refine ({sorted.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-space-sm font-label-caps text-xs uppercase tracking-wider">
              <span className="text-on-surface-variant hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface-container-lowest border border-surface-container-high px-space-md py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
              >
                <option value="featured">Curated Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sidebar & Grid Layout */}
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

          {/* Product Grid (9 Columns) */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between font-label-caps text-xs uppercase tracking-wider text-on-surface-variant mb-space-md pb-2 border-b border-surface-container-low">
              <span>Showing <strong>{sorted.length}</strong> Results</span>
              {filters.category !== 'All Offerings' && (
                <span className="bg-surface-container-low px-2 py-0.5 text-secondary">
                  Active Filter: {filters.category}
                </span>
              )}
            </div>

            {sorted.length === 0 ? (
              <div className="text-center py-space-3xl bg-surface-container-lowest border border-surface-container-high p-space-xl">
                <span className="material-symbols-outlined text-4xl text-secondary block mb-2 opacity-50">
                  filter_alt_off
                </span>
                <p className="font-editorial-serif text-lg text-on-surface-variant mb-4">
                  No flacons match your selected refinement criteria.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="bg-primary text-on-primary font-label-caps text-xs px-space-lg py-3 uppercase tracking-widest"
                >
                  Reset Curatorial Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {sorted.map((p) => {
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
                            className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-on-surface hover:text-error transition-colors"
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
                        <p className="font-body text-xs text-on-surface-variant mt-1 leading-relaxed line-clamp-2">
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
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
