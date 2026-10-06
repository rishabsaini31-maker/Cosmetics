import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNav from '@/components/AboutNav';
import { STORY_DATA } from '@/data/aboutData';

export const metadata: Metadata = {
  title: 'Our Story — VĀNYA Haute Parfumerie',
  description:
    'Discover why VĀNYA exists and how our luxury portfolio evolved across fragrance, skincare, body care, and curated gifting rituals.',
};

export default function OurStoryPage() {
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
            <span className="text-primary font-semibold">Our Story</span>
          </div>

          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            ORIGIN & CHRONICLE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-primary font-medium">
            Our Story
          </h1>
          <p className="font-editorial-serif text-base text-on-surface-variant max-w-2xl mt-2">
            The narrative of VĀNYA—from quiet botanical inspiration to a complete modern luxury beauty ecosystem.
          </p>
        </div>
      </section>

      {/* Sub-Nav */}
      <AboutNav />

      {/* Section 1: The Beginning */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-center">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] bg-surface-container overflow-hidden border border-surface-container-high shadow-md">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop"
                alt="VANYA Olfactory Origins"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7 md:pl-space-lg">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              {STORY_DATA.beginning.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium mb-space-md">
              {STORY_DATA.beginning.title}
            </h2>
            {STORY_DATA.beginning.content.map((paragraph, idx) => (
              <p key={idx} className="font-editorial-serif text-base text-on-surface-variant leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: The Idea */}
      <section className="w-full bg-surface-container-low border-y border-surface-container-high py-space-2xl mb-space-3xl">
        <div className="max-w-5xl mx-auto px-margin lg:px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              {STORY_DATA.idea.eyebrow}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
              {STORY_DATA.idea.title}
            </h2>
            <div className="w-12 h-0.5 bg-secondary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
            {STORY_DATA.idea.content.map((paragraph, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-space-xl border border-surface-container-high">
                <span className="font-display text-3xl text-secondary block mb-2">0{idx + 1}</span>
                <p className="font-editorial-serif text-base text-on-surface-variant leading-relaxed">
                  {paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: The Evolution Timeline */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            BRAND ARCHITECTURE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
            The Evolution
          </h2>
          <p className="font-body text-xs text-on-surface-variant mt-2">
            Tracing how VĀNYA expanded from olfactory notes into a holistic beauty and gifting sanctuary.
          </p>
        </div>

        {/* Vertical Editorial Timeline */}
        <div className="relative border-l-2 border-surface-container-high ml-4 md:ml-32 space-y-space-xl">
          {STORY_DATA.evolution.map((step, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              {/* Timeline Indicator Badge */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-surface border-2 border-secondary flex items-center justify-center font-label-caps text-[0.625rem] text-secondary font-bold group-hover:bg-secondary group-hover:text-surface transition-colors">
                {idx + 1}
              </div>

              {/* Mobile / Desktop Stage Tag */}
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-1">
                <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.25em] text-secondary font-bold">
                  {step.stage}
                </span>
              </div>

              <h3 className="font-display text-2xl text-primary font-medium mb-1">
                {step.title}
              </h3>
              <p className="font-editorial-serif text-sm text-on-surface-variant max-w-xl leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 & 5: Today & The Future */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop mb-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
          <div className="bg-surface-container-low p-space-xl border border-surface-container-high">
            <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
              PRESENT DAY
            </span>
            <h2 className="font-display text-2xl text-primary font-medium mb-3">
              {STORY_DATA.today.title}
            </h2>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
              {STORY_DATA.today.description}
            </p>
          </div>

          <div className="bg-surface-container-low p-space-xl border border-surface-container-high">
            <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">
              LOOKING FORWARD
            </span>
            <h2 className="font-display text-2xl text-primary font-medium mb-3">
              {STORY_DATA.future.title}
            </h2>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
              {STORY_DATA.future.description}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-space-2xl pt-space-xl border-t border-surface-container-high">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-space-md hover:bg-tertiary-container transition-all"
          >
            <span>EXPLORE THE COLLECTION</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
