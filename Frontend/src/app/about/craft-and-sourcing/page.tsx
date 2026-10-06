import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNav from '@/components/AboutNav';

export const metadata: Metadata = {
  title: 'Craft & Sourcing — VĀNYA Haute Parfumerie',
  description:
    'Discover the meticulous craft behind VĀNYA flacons, fragrance composition architecture, material sourcing standards, and curated gifting hampers.',
};

export default function CraftAndSourcingPage() {
  const fragranceSteps = [
    { stage: 'CONCEPT', title: 'Sensory Vision', desc: 'Developing an overarching mood, memory, or botanical narrative.' },
    { stage: 'NOTES', title: 'Selecting Accords', desc: 'Identifying complementary top notes, floral/resinous hearts, and grounding bases.' },
    { stage: 'COMPOSITION', title: 'Blending & Maceration', desc: 'Combining extracts into balanced liquid formulations aged for optimal depth.' },
    { stage: 'BALANCE', title: 'Olfactory Refining', desc: 'Fine-tuning sillage, skin evaporation rates, and note transitions.' },
    { stage: 'FINAL EXPERIENCE', title: 'Hand-Filling & Flaconing', desc: 'Encasing the finished fragrance into heavy glass vessels with sealed atomizers.' },
  ];

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
            <span className="text-primary font-semibold">Craft & Sourcing</span>
          </div>

          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            ARTISANAL METRICS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-primary font-medium">
            Craft & Sourcing
          </h1>
          <p className="font-editorial-serif text-base text-on-surface-variant max-w-2xl mt-2">
            The dedication to detail, scent balance, packaging tactile feel, and thoughtful material selection behind every VĀNYA flacon.
          </p>
        </div>
      </section>

      {/* Sub-Nav */}
      <AboutNav />

      {/* Section 1: Product Craft */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-center">
          <div className="md:col-span-6">
            <div className="aspect-[4/3] bg-surface-container overflow-hidden border border-surface-container-high shadow-md">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop"
                alt="VANYA Flacon Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:pl-space-md">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              EXCELLENCE IN DETAIL
            </span>
            <h2 className="font-display text-3xl text-primary font-medium mb-3">
              1. Product Craft
            </h2>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed mb-3">
              Craft at VĀNYA encompasses every sensory touchpoint: the tactile weight of heavy glass flacons, the velvet glide of lipid creams, the mist density of fine atomizers, and the architectural elegance of rigid keepsake boxes.
            </p>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
              We design every component to ensure that receiving, holding, and applying a product feels like an intentional luxury ritual.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Sourcing Standards */}
      <section className="w-full bg-surface-container-low border-y border-surface-container-high py-space-2xl mb-space-3xl">
        <div className="max-w-5xl mx-auto px-margin lg:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              RESPONSIBLE MATERIALITY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
              2. Sourcing Standards
            </h2>
            <p className="font-body text-xs text-on-surface-variant mt-2">
              Our material and ingredient criteria focus on purity, consistency, and ethical integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">STANDARD A</span>
              <h3 className="font-display text-xl text-primary mb-2">Botanical Purity</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Prioritizing cold-pressed plant oils, unrefined beeswax, and pure floral distillates selected for peak sensory potency.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">STANDARD B</span>
              <h3 className="font-display text-xl text-primary mb-2">Ethical Suppliers</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Partnering with established suppliers who adhere to fair labor practices and transparent ingredient documentation.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">STANDARD C</span>
              <h3 className="font-display text-xl text-primary mb-2">Quality Control</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Every batch undergoes sensory and physical inspection to ensure consistency in fragrance, color, and texture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Fragrance Creation Architecture */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            CREATIVE JOURNEY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
            3. Fragrance Creation
          </h2>
          <p className="font-body text-xs text-on-surface-variant mt-2">
            The high-level editorial process behind composing a signature VĀNYA extrait.
          </p>
        </div>

        {/* Editorial Architecture Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
          {fragranceSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-space-md border border-surface-container-high flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold">
                    {step.stage}
                  </span>
                  <span className="font-mono text-xs text-outline opacity-60">0{idx + 1}</span>
                </div>
                <h3 className="font-display text-base text-primary font-medium mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-[0.6875rem] text-on-surface-variant leading-relaxed">
                  {step.desc}
                </p>
              </div>
              {idx < fragranceSteps.length - 1 && (
                <div className="hidden lg:block text-right text-secondary text-xs mt-3 font-bold">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 & 5: Packaging & Curated Hampers/Combos */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl mb-space-2xl">
          <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high">
            <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
              PRESENTATION
            </span>
            <h2 className="font-display text-2xl text-primary font-medium mb-3">
              4. Packaging Design
            </h2>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
              Packaging is the prelude to product experience. VĀNYA uses rigid keepsake boxes, understated typography, tactile textured paper stock, and custom flacon cradles designed to be displayed and preserved on vanity tables.
            </p>
          </div>

          <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high">
            <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
              CURATED SETS
            </span>
            <h2 className="font-display text-2xl text-primary font-medium mb-3">
              5. Hampers & Combos
            </h2>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
              Products can be thoughtfully paired into beauty rituals, fragrance discovery sets, and luxury gifting hampers. Each combo pairs harmonizing scent accords and complementary skincare textures.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high text-center">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
            EXPLORE THE ATELIER
          </span>
          <h2 className="font-display text-2xl text-primary font-medium mb-2">
            Discover Signature Extraits & Fragrance Sets
          </h2>
          <p className="font-editorial-serif text-sm text-on-surface-variant max-w-xl mx-auto mb-space-lg">
            Experience our haute perfumery flacons, botanical mists, and curated hampers.
          </p>
          <div className="flex flex-wrap justify-center gap-space-md">
            <Link
              href="/fragrance"
              className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-space-md hover:bg-tertiary-container transition-colors"
            >
              EXPLORE FRAGRANCE
            </Link>
            <Link
              href="/hampers"
              className="bg-surface-container-lowest text-primary border border-surface-container-high font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-space-md hover:border-primary transition-colors"
            >
              EXPLORE HAMPERS
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
