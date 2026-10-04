'use client';

import Link from 'next/link';
import FragranceFinder from '@/components/FragranceFinder';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function DiscoverPage() {
  const { addToCart } = useCart();
  const archivalSets = PRODUCTS.filter((p) => p.category === 'Archival Sets' || p.badge === 'Limited Batch');

  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Discover</span>
        </div>

        {/* Header Title */}
        <div className="mb-space-3xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
            Olfactory Discovery & Interactive Matrix
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mt-space-xs">
            Discover Your Signature Vessel
          </h1>
          <p className="font-editorial-serif text-editorial-serif text-on-surface-variant max-w-2xl mt-space-sm">
            Uncover the structural accords of Indian botanical perfumery, sample discovery sets, and explore archival drops.
          </p>
        </div>

        {/* Fragrance Finder Accord Matrix Component */}
        <div className="mb-space-3xl">
          <FragranceFinder />
        </div>

        {/* Discovery Vault & Gift Sets */}
        <div className="pt-space-2xl border-t border-surface-container-high">
          <span className="font-label-caps text-xs uppercase tracking-widest text-secondary font-semibold block mb-1">
            Curated Discovery Sets
          </span>
          <h2 className="font-display text-3xl text-primary mb-space-xl">
            The Archival Discovery Vault
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
            {archivalSets.map((set) => (
              <div
                key={set.id}
                className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-md flex flex-col md:flex-row gap-space-md items-center"
              >
                <img src={set.image} alt={set.name} className="w-full md:w-44 aspect-[3/4] object-cover bg-surface-container" />
                <div className="flex-1">
                  <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary block mb-1">
                    {set.category}
                  </span>
                  <Link href={`/product/${set.id}`}>
                    <h3 className="font-display text-xl text-primary hover:text-secondary transition-colors mb-1">
                      {set.name}
                    </h3>
                  </Link>
                  <p className="font-body text-xs text-on-surface-variant mb-4 leading-relaxed">
                    {set.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-base font-bold text-primary">{set.formattedPrice}</span>
                    <button
                      type="button"
                      onClick={() => addToCart(set)}
                      className="bg-primary text-on-primary font-label-caps text-xs px-4 py-2 uppercase tracking-widest hover:bg-tertiary-container transition-colors"
                    >
                      Add Set to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
