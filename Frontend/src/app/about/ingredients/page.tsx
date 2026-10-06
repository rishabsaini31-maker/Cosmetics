import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNav from '@/components/AboutNav';
import { INGREDIENT_DIRECTORY } from '@/data/aboutData';

export const metadata: Metadata = {
  title: 'Ingredients & Formulation — VĀNYA Haute Parfumerie',
  description:
    'Discover VĀNYA ingredient selection philosophy, key botanical extracts, INCI transparency guide, and formulation standards.',
};

export default function IngredientsPage() {
  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      {/* Header Banner */}
      <section className="w-full bg-surface-container-low border-b border-surface-container-high py-space-xl">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-sm">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Ingredients & Formulation</span>
          </div>

          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            BOTANICAL ARCHITECTURE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-primary font-medium">
            Ingredients & Formulation
          </h1>
          <p className="font-editorial-serif text-base text-on-surface-variant max-w-2xl mt-2">
            A transparent guide to the botanicals, lipids, essential distillates, and formulation standards powering VĀNYA products.
          </p>
        </div>
      </section>

      {/* Sub-Nav */}
      <AboutNav />

      {/* Section 1 & 2: Philosophy & Transparency */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
          <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high">
            <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
              01 — PHILOSOPHY
            </span>
            <h2 className="font-display text-2xl text-primary font-medium mb-3">
              Our Ingredient Selection
            </h2>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
              We select ingredients for their proven tactile qualities, sensory stability, and functional performance on the skin. Every lipid, water-based distillate, and aroma compound is evaluated to ensure maximum skin comfort and olfactory elegance.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high">
            <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
              02 — TRANSPARENCY
            </span>
            <h2 className="font-display text-2xl text-primary font-medium mb-3">
              Commitment to Transparency
            </h2>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
              We believe every customer has the right to understand what goes into their beauty products. We clearly communicate both common botanical names and standardized International Nomenclature Cosmetic Ingredient (INCI) names on every product page.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Key Ingredients Directory */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            CATALOG INGREDIENTS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
            Key Ingredient Directory
          </h2>
          <p className="font-body text-xs text-on-surface-variant mt-2">
            Curated list of actual ingredients present in the VĀNYA product database.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
          {INGREDIENT_DIRECTORY.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest p-space-lg border border-surface-container-high flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-surface-container-high pb-2 mb-3">
                  <div>
                    <h3 className="font-display text-xl text-primary font-medium">
                      {item.name}
                    </h3>
                    <span className="font-mono text-[0.6875rem] text-secondary italic">
                      {item.inciName}
                    </span>
                  </div>
                  <span className="font-label-caps text-[0.625rem] uppercase tracking-wider px-2 py-0.5 bg-surface-container text-on-surface-variant border border-surface-container-high">
                    {item.category}
                  </span>
                </div>

                <p className="font-editorial-serif text-xs text-on-surface-variant leading-relaxed mb-3">
                  {item.description}
                </p>

                <div className="mb-3">
                  <span className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-bold block mb-0.5">
                    PURPOSE & BENEFIT:
                  </span>
                  <p className="font-body text-xs text-on-surface-variant">
                    {item.purpose}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container-high">
                <span className="font-label-caps text-[0.625rem] uppercase tracking-wider text-secondary font-bold block mb-1">
                  FEATURED IN PRODUCTS:
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.featuredIn.map((prod, i) => (
                    <span
                      key={i}
                      className="font-body text-[0.6875rem] text-on-surface bg-surface-container-low px-2 py-0.5 border border-surface-container-high"
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Formulation Standards */}
      <section className="w-full bg-surface-container-low border-y border-surface-container-high py-space-2xl mb-space-3xl">
        <div className="max-w-5xl mx-auto px-margin lg:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              SENSORY & SCIENCE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
              Formulation Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            <div className="bg-surface-container-lowest p-space-md border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">01</span>
              <h3 className="font-display text-lg text-primary mb-1">Texture & Feel</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Balanced absorption profiles designed to leave a non-greasy, velvet touch.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-md border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">02</span>
              <h3 className="font-display text-lg text-primary mb-1">Sensory Experience</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Aromatic harmony combining natural botanical notes with refined accord stability.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-md border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">03</span>
              <h3 className="font-display text-lg text-primary mb-1">Olfactory Composition</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Multi-layered top, heart, and base note structures that unfold gracefully over time.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-md border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">04</span>
              <h3 className="font-display text-lg text-primary mb-1">Usability & Stability</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Housed in protective dark glass and opaque containers to preserve active botanicals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 & 6: How to Read an Ingredient List & Product Source of Truth */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high mb-space-2xl">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
            EDUCATIONAL GUIDE
          </span>
          <h2 className="font-display text-3xl text-primary font-medium mb-4">
            How to Read an Ingredient List
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg font-body text-xs text-on-surface-variant leading-relaxed">
            <div>
              <h3 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-1">
                1. INCI Names
              </h3>
              <p className="mb-4">
                International Nomenclature Cosmetic Ingredient (INCI) names provide a globally standardized Latin or scientific name for every botanical extract and compound.
              </p>

              <h3 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-1">
                2. Order of Concentration
              </h3>
              <p>
                Ingredients are listed in descending order of concentration down to 1%. Ingredients below 1% may appear in any order at the end of the list.
              </p>
            </div>

            <div>
              <h3 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-1">
                3. Parfum & Fragrance Terminology
              </h3>
              <p className="mb-4">
                The term <em>Parfum</em> or <em>Fragrance</em> denotes the proprietary blend of essential oils, absolutes, and aroma compounds composing a scent profile.
              </p>

              <h3 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-1">
                4. Allergens & Sensitivity
              </h3>
              <p>
                Naturally derived aromatic compounds such as <em>Limonene</em> and <em>Linalool</em> are specified explicitly to assist individuals with known sensitivities.
              </p>
            </div>
          </div>
        </div>

        {/* Source of Truth Note & CTA */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high text-center">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
            SOURCE OF TRUTH
          </span>
          <h2 className="font-display text-2xl text-primary font-medium mb-2">
            Product-Specific Ingredient Lists
          </h2>
          <p className="font-editorial-serif text-sm text-on-surface-variant max-w-xl mx-auto mb-space-lg">
            Every product page on VĀNYA serves as the definitive source of truth for its exact, complete INCI ingredient breakdown.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-space-md hover:bg-tertiary-container transition-colors"
          >
            <span>EXPLORE PRODUCTS</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
