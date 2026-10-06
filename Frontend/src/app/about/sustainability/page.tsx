import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNav from '@/components/AboutNav';

export const metadata: Metadata = {
  title: 'Sustainability — VĀNYA Haute Parfumerie',
  description:
    'An honest, evidence-based report on VĀNYA packaging materials, responsible botanical sourcing standards, waste reduction in product design, and ongoing environmental evaluation.',
};

export default function SustainabilityPage() {
  const areas = [
    {
      title: '1. Packaging Materials',
      eyebrow: 'MATERIAL RECYCLABILITY',
      description:
        'We prioritize heavy recyclable glass flacons for our Extraits and mists, alongside recyclable paperboard for outer packaging boxes. Metal pump components and protective caps are selected for durability and longevity.',
    },
    {
      title: '2. Responsible Sourcing',
      eyebrow: 'ETHICAL BOTANICALS',
      description:
        'We select plant extracts, seed oils, and essential distillates from established suppliers who provide documented batch origin records and adhere to responsible harvesting practices.',
    },
    {
      title: '3. Product Design',
      eyebrow: 'MINDFUL CONSUMPTION',
      description:
        'By developing high-performance lipid salves, multi-note extraits, and versatile mists, we encourage customers to invest in fewer, higher-quality products rather than accumulating disposable items.',
    },
    {
      title: '4. Shipping & Logistics',
      eyebrow: 'PROTECTIVE CORRESPONDENCE',
      description:
        'Orders are packaged using recyclable paper void fill and minimalist unbleached corrugated mailer boxes to minimize excess material usage during transit.',
    },
    {
      title: '5. Future Improvements',
      eyebrow: 'ONGOING EVALUATION',
      description:
        'We are continually evaluating ways to improve our packaging choices, explore refillable flacon options, and increase post-consumer recycled content as materials and suppliers evolve.',
    },
    {
      title: '6. Transparency',
      eyebrow: 'UPDATED EVOLUTION',
      description:
        'We believe in honest communication without exaggerated claims. As our sustainability benchmarks and supply chain verification systems progress, we will update this document accordingly.',
    },
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
            <span className="text-primary font-semibold">Sustainability</span>
          </div>

          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            FACTUAL PRACTICES & COMMITMENTS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-primary font-medium">
            Sustainability
          </h1>
          <p className="font-editorial-serif text-base text-on-surface-variant max-w-2xl mt-2">
            An honest, transparent overview of our packaging materials, ingredient sourcing standards, shipping practices, and continuous evaluation.
          </p>
        </div>
      </section>

      {/* Sub-Nav */}
      <AboutNav />

      {/* Main Content Grid */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high mb-space-2xl text-center max-w-3xl mx-auto">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
            OUR COMMITMENT TO TRUTH
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-primary font-medium mb-3">
            Evidence-Based Responsibility
          </h2>
          <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
            Rather than making broad, unverified marketing claims, VĀNYA focuses on tangible, documented practices. We continuously monitor our material footprint and share genuine progress as our capabilities expand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop mb-space-3xl">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-space-xl border border-surface-container-high flex flex-col justify-between"
            >
              <div>
                <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">
                  {area.eyebrow}
                </span>
                <h3 className="font-display text-2xl text-primary font-medium mb-3">
                  {area.title}
                </h3>
                <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic CTA */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high text-center">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
            MINDFUL SELECTION
          </span>
          <h2 className="font-display text-2xl text-primary font-medium mb-2">
            Explore Recyclable Glass Flacons & Products
          </h2>
          <p className="font-editorial-serif text-sm text-on-surface-variant max-w-xl mx-auto mb-space-lg">
            Discover our collection of Extraits, Hydro-Mists, and Skincare essentials designed for lasting performance.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-space-md hover:bg-tertiary-container transition-colors"
          >
            <span>OUR PACKAGING & PRODUCTS</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
