'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, Product } from '@/data/products';
import FilterSidebar, { FilterState } from '@/components/FilterSidebar';
import PaginationSection from '@/components/PaginationSection';

const initialFilterState: FilterState = {
  category: 'All Offerings',
  fragranceFamily: [],
  maxPrice: 8000,
  pricePreset: null,
  volume: null,
  expression: 'Unisex / Transcendent',
  inStockOnly: false,
};

const ITEMS_PER_PAGE = 8;

// Helper to derive luxury craft tag if not explicitly set
function getCraftTag(p: Product): string {
  if (p.craftTag) return p.craftTag;
  if (p.category === 'Parfum Extrait') return 'HAND DISTILLED';
  if (p.category === 'Botanical Mist') return 'FIRST PLUCK';
  if (p.category === 'Skincare') return 'PURE BOTANICAL';
  if (p.category === 'Body Nectars') return 'DRY OIL';
  if (p.category === 'Archival Sets' || p.category === 'Hampers') return 'WITH VOUCHER';
  return 'CEREMONIAL GRADE';
}

// Helper to format short volume display
function getVolumeShortDisplay(p: Product): string {
  if (p.volume && p.volume.length > 0) {
    const mainVol = p.volume[0];
    if (mainVol.includes('/')) return mainVol.split('/')[0].trim();
    return mainVol;
  }
  return '50ml';
}

export default function ShopPage() {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filtering Logic
  const filtered = PRODUCTS.filter((p) => {
    if (filters.category !== 'All Offerings' && filters.category !== 'All') {
      if (filters.category === 'Perfumes & Extraits' && p.category !== 'Parfum Extrait') return false;
      if (filters.category === 'Botanical Mists' && p.category !== 'Botanical Mist') return false;
      if (filters.category === 'Skincare & Balms' && p.category !== 'Skincare') return false;
      if (filters.category === 'Botanical Body Care' && p.category !== 'Body Nectars') return false;
      if (filters.category === 'Discovery Sets' && p.category !== 'Archival Sets') return false;
    }

    if (p.price > filters.maxPrice) return false;
    return true;
  });

  // Sorting Logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE) || 1;
  const currentVisibleCount = Math.min(visibleCount, sorted.length);
  const displayedProducts = sorted.slice(0, currentVisibleCount);

  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    const nextCount = Math.min(visibleCount + ITEMS_PER_PAGE, sorted.length);
    setVisibleCount(nextCount);
    setCurrentPage(Math.ceil(nextCount / ITEMS_PER_PAGE));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setVisibleCount(page * ITEMS_PER_PAGE);
  };

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md pt-space-md">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Shop All</span>
        </div>

        {/* Sidebar & Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-32">
            <FilterSidebar
              filters={filters}
              onFilterChange={(f) => {
                setFilters(f);
                setCurrentPage(1);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              onReset={handleResetFilters}
              totalResults={PRODUCTS.length}
            />
          </div>

          {/* Product Section (9 Cols) */}
          <div className="lg:col-span-9">
            {/* Top Toolbar matching exact Stitch layout */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between font-label-caps text-xs uppercase tracking-wider text-on-surface-variant mb-space-md pb-3 border-b border-surface-container-high gap-2">
              <div className="flex items-center gap-2">
                <span>Showing <strong>{sorted.length}</strong> bespoke products</span>
                <span className="text-on-surface-variant/40">•</span>
                <span className="text-secondary font-medium">Free Courier on orders above ₹999</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Refine Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 bg-primary text-on-primary px-3 py-1 text-xs"
                >
                  <span className="material-symbols-outlined text-sm">tune</span>
                  <span>Refine</span>
                </button>

                {/* Sort selector */}
                <div className="flex items-center gap-2">
                  <span className="text-on-surface-variant text-[11px] hidden sm:inline">SORT:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-surface-container-lowest border border-surface-container-high px-3 py-1 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
                  >
                    <option value="featured">Curator's Choice (Featured)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
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
              <>
                {/* 4 Column Product Grid matching Stitch Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {displayedProducts.map((p, idx) => {
                    const isFav = wishlist.includes(p.id);
                    const ratingVal = p.rating || (4.7 + (idx % 3) * 0.1).toFixed(1);
                    const reviewsVal = p.reviewsCount || (75 + idx * 23);
                    const craftTag = getCraftTag(p);
                    const volumeStr = getVolumeShortDisplay(p);

                    return (
                      <div
                        key={p.id}
                        className="group bg-surface-container-lowest p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container-high relative"
                      >
                        <div>
                          {/* Image Box */}
                          <Link href={`/product/${p.id}`} className="block relative aspect-[4/5] bg-surface-container overflow-hidden mb-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Pill Badge */}
                            {p.badge && (
                              <span className="absolute top-2.5 left-2.5 bg-[#f3ebd9] text-[#705d38] font-label-caps text-[9px] px-2 py-0.5 uppercase tracking-widest font-semibold border border-[#e6dcbe] z-10">
                                {p.badge}
                              </span>
                            )}
                            {/* Wishlist Heart */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(p.id);
                              }}
                              aria-label="Add to wishlist"
                              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-stone-700 hover:text-red-600 transition-colors z-10"
                            >
                              <span className={`material-symbols-outlined text-[16px] ${isFav ? 'text-error' : ''}`}>
                                favorite
                              </span>
                            </button>
                          </Link>

                          {/* Sub-Header Metadata: Volume & Category • Rating */}
                          <div className="flex items-center justify-between font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">
                            <span className="truncate max-w-[130px]">
                              {volumeStr} • {p.category.split(' ')[0]}
                            </span>
                            <span className="flex items-center gap-0.5 font-medium text-stone-700">
                              <span className="text-amber-700 text-[11px]">★</span>
                              <span>{ratingVal}</span>
                              <span className="text-on-surface-variant/60">({reviewsVal})</span>
                            </span>
                          </div>

                          {/* Product Title */}
                          <Link href={`/product/${p.id}`}>
                            <h3 className="font-display text-base font-medium text-primary group-hover:text-secondary transition-colors line-clamp-1 leading-snug">
                              {p.name}
                            </h3>
                          </Link>

                          {/* Tagline */}
                          <p className="font-body text-[11px] text-on-surface-variant mt-0.5 mb-2 leading-tight line-clamp-1">
                            {p.tagline}
                          </p>
                        </div>

                        {/* Price & Craft Tag Footer */}
                        <div className="mt-auto pt-2.5 border-t border-surface-container-high/60 flex items-center justify-between">
                          <span className="font-body text-xs sm:text-sm font-semibold text-primary">
                            {p.formattedPrice}
                          </span>
                          <span className="font-label-caps text-[9px] uppercase tracking-wider text-secondary font-medium truncate max-w-[100px] text-right">
                            {craftTag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Stitch Progress Bar & Load More Pagination */}
                <PaginationSection
                  totalItems={sorted.length}
                  visibleItemsCount={currentVisibleCount}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onLoadMore={handleLoadMore}
                  hasMore={currentVisibleCount < sorted.length}
                  itemLabel="CREATIONS"
                />
              </>
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
                onFilterChange={(f) => {
                  setFilters(f);
                  setCurrentPage(1);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
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
