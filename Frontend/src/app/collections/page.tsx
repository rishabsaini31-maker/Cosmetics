'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';

const collectionsList = [
  {
    title: 'Archival Extraits 2025',
    tagline: 'High-Concentration Aged Perfumes',
    desc: 'Hydro-distilled in traditional Kannauj copper degs and aged 180 days in teak vats.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop',
    category: 'Parfum Extrait',
  },
  {
    title: 'Pure Hydrophilic Mists',
    tagline: 'Kannauj Clay & Morning Rose Condensates',
    desc: 'Pure steam condensates created by capturing rain-baked Ganges earth distillates.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop',
    category: 'Botanical Mist',
  },
  {
    title: 'Madurai Jasmine & Lip Nectars',
    tagline: 'Nutrient-Rich Lipid Emulsions',
    desc: 'Midnight jasmine flowers enfleuraged into cold almond lipids and Kashmiri mongra saffron.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
    category: 'Skincare',
  },
];

export default function CollectionsPage() {
  const { addToCart } = useCart();

  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Collections</span>
        </div>

        {/* Hero Title */}
        <div className="mb-space-3xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
            Olfactory Editions
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mt-space-xs">
            Curated Atelier Collections
          </h1>
          <p className="font-editorial-serif text-editorial-serif text-on-surface-variant max-w-2xl mt-space-sm">
            Explore our themed botanical editions, grouping rare distillates, lipid balms, and luxury gift coffrets by their harvest methodology.
          </p>
        </div>

        {/* Collections Showcase */}
        <div className="space-y-space-3xl">
          {collectionsList.map((col, index) => {
            const matchingProducts = PRODUCTS.filter((p) => p.category === col.category);

            return (
              <div
                key={col.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] bg-surface-container overflow-hidden shadow-lg border border-surface-container-high">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
                    Collection Edition 0{index + 1}
                  </span>
                  <h2 className="font-display text-3xl lg:text-4xl text-primary mt-1 mb-2">
                    {col.title}
                  </h2>
                  <p className="font-editorial-serif text-lg text-secondary mb-4">
                    {col.tagline}
                  </p>
                  <p className="font-editorial-serif text-base text-on-surface-variant mb-space-lg leading-relaxed">
                    {col.desc}
                  </p>

                  <div className="space-y-3 mb-space-xl">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3 bg-surface-container-lowest border border-surface-container-high hover:border-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-12 h-12 object-cover" />
                          <div>
                            <Link href={`/product/${p.id}`}>
                              <h4 className="font-display text-sm text-primary hover:text-secondary font-medium">
                                {p.name}
                              </h4>
                            </Link>
                            <span className="font-body text-xs text-on-surface-variant">
                              {p.formattedPrice}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(p)}
                          className="bg-primary text-on-primary font-label-caps text-[0.6rem] px-3 py-1.5 uppercase tracking-wider hover:bg-tertiary-container transition-colors"
                        >
                          Add to Bag
                        </button>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/shop`}
                    className="inline-flex items-center gap-2 font-label-caps text-xs uppercase tracking-[0.18em] text-primary hover:text-secondary font-semibold"
                  >
                    <span>View All {col.category} Flacons</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
