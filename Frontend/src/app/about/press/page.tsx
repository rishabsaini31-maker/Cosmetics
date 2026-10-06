import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNav from '@/components/AboutNav';
import { PRESS_ITEMS, PRESS_MEDIA_CONTACT } from '@/data/aboutData';

export const metadata: Metadata = {
  title: 'Press & Media — VĀNYA Haute Parfumerie',
  description:
    'Official editorial stories, press features, and media announcements from VĀNYA Haute Parfumerie.',
};

export default function PressPage() {
  const hasPressItems = PRESS_ITEMS && PRESS_ITEMS.length > 0;

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      {/* Hero Banner */}
      <section className="w-full bg-surface-container-low border-b border-surface-container-high py-space-xl">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-sm">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Press</span>
          </div>

          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            EDITORIAL & MEDIA
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-primary font-medium">
            VĀNYA in the Press
          </h1>
          <p className="font-editorial-serif text-base text-on-surface-variant max-w-2xl mt-2">
            Stories, features and updates from the world of VĀNYA.
          </p>
        </div>
      </section>

      {/* Sub-Nav */}
      <AboutNav />

      {/* Main Content Section */}
      <section className="max-w-5xl mx-auto px-margin lg:px-margin-desktop">
        {hasPressItems ? (
          <div className="space-y-space-xl mb-space-3xl">
            {PRESS_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest p-space-xl border border-surface-container-high grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-center"
              >
                {item.image && (
                  <div className="md:col-span-4">
                    <div className="aspect-[16/10] bg-surface-container overflow-hidden border border-surface-container-high">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className={item.image ? 'md:col-span-8' : 'md:col-span-12'}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-label-caps text-xs uppercase tracking-widest text-secondary font-bold">
                      {item.publication}
                    </span>
                    <span className="text-outline">•</span>
                    <span className="font-body text-xs text-on-surface-variant">
                      {item.date}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl text-primary font-medium mb-2">
                    {item.title}
                  </h2>
                  <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-label-caps text-xs uppercase tracking-[0.18em] text-primary font-bold hover:text-secondary transition-colors"
                    >
                      <span>READ FULL FEATURE</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Empty State when no press items exist */
          <div className="bg-surface-container-lowest p-space-3xl border border-surface-container-high text-center max-w-2xl mx-auto mb-space-3xl">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              PRESS & FEATURES
            </span>
            <h2 className="font-display text-3xl text-primary font-medium mb-3">
              Media Correspondence
            </h2>
            <p className="font-editorial-serif text-base text-on-surface-variant max-w-md mx-auto leading-relaxed mb-space-md">
              Our latest stories and media features will appear here.
            </p>
            <div className="w-12 h-0.5 bg-secondary mx-auto" />
          </div>
        )}

        {/* Media Contact Section */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high text-center max-w-3xl mx-auto">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            EDITORIAL INQUIRIES
          </span>
          <h2 className="font-display text-2xl text-primary font-medium mb-2">
            Media Contact
          </h2>
          <p className="font-editorial-serif text-sm text-on-surface-variant max-w-lg mx-auto mb-space-md">
            {PRESS_MEDIA_CONTACT.note}
          </p>
          <div className="inline-block bg-surface-container-lowest px-space-xl py-space-md border border-surface-container-high">
            <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold block mb-0.5">
              PRESS EMAIL
            </span>
            <a
              href={`mailto:${PRESS_MEDIA_CONTACT.email}`}
              className="font-body text-sm text-primary font-medium hover:text-secondary transition-colors"
            >
              {PRESS_MEDIA_CONTACT.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
