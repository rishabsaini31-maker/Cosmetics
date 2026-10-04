'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, Product } from '@/data/products';

export default function FeaturedProducts() {
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="w-full bg-surface py-space-3xl border-t border-surface-container-high">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              Harvest Portfolio
            </span>
            <h2 className="font-display text-4xl text-primary mt-space-xs">The Edit</h2>
          </div>
          <div className="flex items-center gap-space-sm mt-space-md md:mt-0 font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
            <span>Displaying {PRODUCTS.slice(0, 4).length} Curated Flacons</span>
            <span className="w-1 h-1 rounded-full bg-outline"></span>
            <Link
              href="/shop"
              className="text-secondary font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {PRODUCTS.slice(0, 4).map((p) => {
            const isFav = wishlist.includes(p.id);
            return (
              <div
                key={p.id}
                className="group bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container-high relative"
              >
                <div>
                  <div className="relative aspect-[3/4] bg-surface-container overflow-hidden mb-space-md cursor-pointer">
                    <img
                      src={p.image}
                      alt={p.name}
                      onClick={() => router.push(`/product/${p.id}`)}
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
                        e.stopPropagation();
                        toggleWishlist(p.id);
                      }}
                      aria-label="Add to wishlist"
                      className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-on-surface hover:text-error transition-colors z-10"
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isFav ? 'text-error font-filled' : ''
                        }`}
                      >
                        favorite
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(p);
                      }}
                      className="absolute bottom-2 left-2 right-2 bg-surface/90 backdrop-blur-sm text-primary font-label-caps text-xs py-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center z-10"
                    >
                      Quick View
                    </button>
                  </div>

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

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface max-w-2xl w-full border border-surface-container-high shadow-2xl p-space-xl relative">
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-1"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg items-center">
              <div
                className="aspect-[3/4] bg-surface-container overflow-hidden cursor-pointer"
                onClick={() => {
                  setQuickViewProduct(null);
                  router.push(`/product/${quickViewProduct.id}`);
                }}
              >
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
                <h3
                  className="font-display text-2xl text-primary mb-2 hover:text-secondary cursor-pointer"
                  onClick={() => {
                    setQuickViewProduct(null);
                    router.push(`/product/${quickViewProduct.id}`);
                  }}
                >
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
                    {quickViewProduct.notes.top.join(' • ')}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-body text-xl font-bold text-primary">
                    {quickViewProduct.formattedPrice}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(quickViewProduct);
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
