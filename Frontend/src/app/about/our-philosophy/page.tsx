import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNav from '@/components/AboutNav';
import { PHILOSOPHY_PRINCIPLES } from '@/data/aboutData';

export const metadata: Metadata = {
  title: 'Our Philosophy — VĀNYA Haute Parfumerie',
  description:
    'Explore the 6 core principles behind VĀNYA: Intentional Beauty, Fragrance as Expression, Thoughtful Formulation, Beauty Without Excess, Ritual Over Routine, and Giving With Meaning.',
};

export default function OurPhilosophyPage() {
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
            <span className="text-primary font-semibold">Our Philosophy</span>
          </div>

          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            CORE TENETS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-primary font-medium">
            Our Philosophy
          </h1>
          <p className="font-editorial-serif text-base text-on-surface-variant max-w-2xl mt-2">
            Six principles guiding how we formulate products, compose scents, and approach everyday luxury rituals.
          </p>
        </div>
      </section>

      {/* Sub-Nav */}
      <AboutNav />

      {/* Principles Section */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop">
        <div className="space-y-space-2xl">
          {PHILOSOPHY_PRINCIPLES.map((principle, idx) => (
            <div
              key={principle.number}
              className={`grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop p-space-xl bg-surface-container-lowest border border-surface-container-high items-center ${
                idx % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Number & Headline Column */}
              <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-surface-container-high pb-space-md md:pb-0 md:pr-space-lg">
                <span className="font-display text-4xl lg:text-5xl text-secondary block font-light mb-1">
                  {principle.number}
                </span>
                <h2 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary font-bold">
                  {principle.title}
                </h2>
              </div>

              {/* Detail Copy & Link Column */}
              <div className="md:col-span-8 md:pl-space-md flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl text-primary font-medium mb-2">
                    {principle.summary}
                  </h3>
                  <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed mb-space-md">
                    {principle.description}
                  </p>
                </div>

                <div>
                  <Link
                    href={principle.linkHref}
                    className="inline-flex items-center gap-1.5 font-label-caps text-xs uppercase tracking-[0.18em] text-secondary font-bold hover:text-primary transition-colors"
                  >
                    <span>{principle.linkLabel}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Cross-Linking Banner */}
        <div className="mt-space-3xl p-space-2xl bg-surface-container-low border border-surface-container-high text-center">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            EXPERIENCE THE RITUALS
          </span>
          <h2 className="font-display text-3xl text-primary font-medium mb-3">
            Ready to Discover VĀNYA Skincare & Fragrance?
          </h2>
          <p className="font-editorial-serif text-sm text-on-surface-variant max-w-xl mx-auto mb-space-lg">
            Explore our curated catalog of extraits, lipid salves, hydro-mists, and luxury hampers.
          </p>
          <div className="flex flex-wrap justify-center gap-space-md">
            <Link
              href="/beauty"
              className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-space-md hover:bg-tertiary-container transition-colors"
            >
              DISCOVER BEAUTY
            </Link>
            <Link
              href="/fragrance"
              className="bg-surface-container-lowest text-primary border border-surface-container-high font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-space-md hover:border-primary transition-colors"
            >
              EXPLORE FRAGRANCE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
