'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">About The Atelier</span>
        </div>

        {/* Hero Title */}
        <div className="mb-space-3xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
            Lineage & Heritage
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mt-space-xs">
            About VĀNYA Haute Parfumerie
          </h1>
          <p className="font-editorial-serif text-editorial-serif text-on-surface-variant max-w-2xl mt-space-sm">
            Bridging Indian botanical heritage and contemporary French perfumery through slow, ethical wildcrafting and traditional hydro-distillation.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center mb-space-3xl">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-surface-container overflow-hidden border border-surface-container-high shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
                alt="Vanya Atelier Flacons"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-space-lg">
            <span className="font-label-caps text-xs uppercase tracking-widest text-secondary font-semibold block mb-2">
              Our Ethos
            </span>
            <h2 className="font-display text-3xl text-primary mb-space-md">
              Honouring Centuries of Indian Botanical Artistry
            </h2>
            <p className="font-editorial-serif text-base text-on-surface-variant mb-4 leading-relaxed">
              Founded in 2024, VĀNYA was conceived as a reverent homage to Kannauj—the perfume capital of India—where copper deg hydro-distillation has been practiced continuously for over four centuries.
            </p>
            <p className="font-editorial-serif text-base text-on-surface-variant leading-relaxed">
              Every creation is formulated without synthetic fixatives or mass manufacturing. We work directly with small-holder floral farmers, saffron growers in Pampore, and artisan distillers.
            </p>
          </div>
        </div>

        {/* Physical Atelier Locations */}
        <div id="locations" className="pt-space-2xl border-t border-surface-container-high">
          <h2 className="font-display text-3xl text-primary mb-space-xl text-center">
            Visit Our Private Ateliers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
            <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-xs uppercase tracking-widest text-secondary block mb-1">
                Atelier 01
              </span>
              <h3 className="font-display text-2xl text-primary mb-2">Mumbai Flagship</h3>
              <p className="font-body text-xs text-on-surface-variant mb-4">
                12 Atelier Boulevard, Malabar Hill, Mumbai, MH 400006
              </p>
              <p className="font-body text-xs text-secondary font-semibold">
                Private Appointments Only • Mon - Sat (11 AM - 7 PM)
              </p>
            </div>

            <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-xs uppercase tracking-widest text-secondary block mb-1">
                Atelier 02
              </span>
              <h3 className="font-display text-2xl text-primary mb-2">New Delhi Salon</h3>
              <p className="font-body text-xs text-on-surface-variant mb-4">
                45 Sunder Nagar Heritage Arcade, New Delhi, DL 110003
              </p>
              <p className="font-body text-xs text-secondary font-semibold">
                Private Appointments Only • Tue - Sun (11 AM - 7 PM)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
