'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Wishlist</span>
        </div>

        {/* Wishlist Header */}
        <div className="pb-space-lg mb-space-2xl border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
            Private Vault
          </span>
          <h1 className="font-display text-4xl text-primary mt-space-xs">
            Saved Flacons & Formulae ({savedProducts.length})
          </h1>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-space-3xl">
            <span className="material-symbols-outlined text-4xl text-secondary block mb-3 opacity-40">
              favorite_border
            </span>
            <p className="font-editorial-serif text-lg text-on-surface-variant mb-space-md">
              Your wishlist vault is currently empty.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-primary text-on-primary font-label-caps text-xs px-space-xl py-4 uppercase tracking-widest"
            >
              Discover Fragrances
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {savedProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-surface-container-lowest p-space-md flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container-high relative"
              >
                <div>
                  <div className="relative aspect-[3/4] bg-surface-container overflow-hidden mb-space-md">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-lowest/90 flex items-center justify-center text-error hover:scale-110 transition-transform shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
