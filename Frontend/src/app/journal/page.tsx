'use client';

import Link from 'next/link';

export default function JournalPage() {
  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">The Journal</span>
        </div>

        {/* Hero Section */}
        <div className="mb-space-3xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
            Botanical Monograph Editorial
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mt-space-xs">
            The Olfactory Journal
          </h1>
          <p className="font-editorial-serif text-editorial-serif text-on-surface-variant max-w-2xl mt-space-sm">
            Essays on Kannauj hydro-distillation, wild harvesting seasonal botanicals across the Western Ghats & Kashmir, and the art of slow perfumery.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
          {[
            {
              title: 'The Rain Distillate: Mitti Attar of Kannauj',
              date: 'October 2025',
              readTime: '6 min read',
              image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
              excerpt:
                'How master distillers in Uttar Pradesh capture the scent of dry monsoon earth striking parched clay inside copper deg stills.',
            },
            {
              title: 'Midnight Harvest: Madurai Jasmine Sambac',
              date: 'September 2025',
              readTime: '4 min read',
              image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
              excerpt:
                'Gathering night-blooming white jasmine blossoms at midnight before dawn rays dissipate delicate aromatic molecules.',
            },
            {
              title: 'The Golden Thread: Kashmiri Mongra Saffron',
              date: 'August 2025',
              readTime: '5 min read',
              image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
              excerpt:
                'Inside Pampore’s crimson fields during the October harvest where thousands of violet crocus flowers yield pure red stigmas.',
            },
          ].map((art, idx) => (
            <article
              key={idx}
              className="bg-surface-container-lowest p-space-md border border-surface-container-high shadow-sm hover:shadow-md transition-all group"
            >
              <div className="aspect-[16/10] bg-surface-container overflow-hidden mb-space-md">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-2 font-label-caps text-[0.65rem] uppercase tracking-wider text-secondary mb-2">
                <span>{art.date}</span>
                <span>•</span>
                <span>{art.readTime}</span>
              </div>
              <h2 className="font-display text-xl text-primary group-hover:text-secondary transition-colors mb-2">
                {art.title}
              </h2>
              <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
                {art.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
