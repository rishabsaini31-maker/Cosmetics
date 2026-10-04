'use client';

import Link from 'next/link';

export default function GiftingEditSection() {
  return (
    <section className="w-full bg-surface-container-low py-space-3xl border-t border-surface-container-high">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
            Bespoke Offerings & Combos
          </span>
          <h2 className="font-display text-4xl text-primary mt-space-xs">
            THE GIFTING EDIT
          </h2>
          <p className="font-editorial-serif text-editorial-serif text-on-surface-variant mt-2">
            Thoughtfully formulated beauty & fragrance presentations ready for celebration and daily ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
          {/* Left Panel: HAMPERS */}
          <div className="group bg-surface-container-lowest p-space-xl border border-surface-container-high flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="aspect-[16/10] bg-surface-container overflow-hidden mb-space-lg relative">
                <img
                  src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop"
                  alt="Luxury hamper presentation box"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-space-sm left-space-sm bg-secondary text-on-secondary font-label-caps text-xs px-3 py-1 uppercase tracking-widest">
                  Gift Coffrets
                </span>
              </div>
              <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
                Celebration & Corporate
              </span>
              <h3 className="font-display text-3xl text-primary mt-1 mb-2">HAMPERS</h3>
              <p className="font-editorial-serif text-base text-on-surface-variant mb-space-lg leading-relaxed">
                Beautifully curated gifts for every occasion. Housed in velvet & ahimsa silk coffrets.
              </p>
            </div>

            <Link
              href="/hampers"
              className="inline-flex items-center justify-center bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] py-4 px-space-xl hover:bg-tertiary-container transition-colors shadow-sm"
            >
              SHOP HAMPERS
            </Link>
          </div>

          {/* Right Panel: COMBOS */}
          <div className="group bg-surface-container-lowest p-space-xl border border-surface-container-high flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <div>
              <div className="aspect-[16/10] bg-surface-container overflow-hidden mb-space-lg relative">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop"
                  alt="Curated skincare and fragrance combo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-space-sm left-space-sm bg-primary text-on-primary font-label-caps text-xs px-3 py-1 uppercase tracking-widest">
                  Layering Pairs
                </span>
              </div>
              <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
                Daily Ritual Duos
              </span>
              <h3 className="font-display text-3xl text-primary mt-1 mb-2">COMBOS</h3>
              <p className="font-editorial-serif text-base text-on-surface-variant mb-space-lg leading-relaxed">
                Complete rituals, thoughtfully paired. Formulated to layer synergistically.
              </p>
            </div>

            <Link
              href="/combos"
              className="inline-flex items-center justify-center bg-surface-container-lowest text-primary font-label-caps text-xs uppercase tracking-[0.18em] py-4 px-space-xl border border-surface-container-high hover:bg-surface-container transition-colors"
            >
              EXPLORE COMBOS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
