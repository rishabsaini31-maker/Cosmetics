export default function Hero() {
  return (
    <section className="relative w-full bg-surface-bright pb-space-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          {/* Hero Text Narrative */}
          <div className="lg:col-span-6 flex flex-col pt-space-xl lg:pt-space-2xl z-10">
            <div className="inline-flex items-center gap-space-xs mb-space-md">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.25em]">
                Archival Release 2025
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-primary mb-space-lg leading-[1.08] tracking-tight">
              Scent Your Story.
            </h1>
            <p className="font-editorial-serif text-lg text-on-surface-variant max-w-xl mb-space-2xl leading-relaxed">
              Sensory formulations hand-crafted in small copper deg batches. Classical Kannauj hydro-distillation meets contemporary haute French perfumery.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md mb-space-2xl">
              <a
                href="#products"
                className="inline-flex items-center justify-center bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-[0.18em] px-space-xl py-4 hover:bg-tertiary-container transition-colors duration-200"
              >
                Explore Perfumes
              </a>
              <a
                href="#craft"
                className="inline-flex items-center justify-center bg-surface-container-lowest text-primary font-label-caps text-label-caps uppercase tracking-[0.18em] px-space-xl py-4 shadow-sm hover:bg-surface-container transition-colors duration-200 border border-surface-container-high"
              >
                The Atelier
              </a>
            </div>

            {/* Olfactory Triad Accent */}
            <div className="bg-surface-container-low p-space-lg rounded-none shadow-sm max-w-lg border-l-2 border-secondary">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary mb-space-xs block font-semibold">
                Vessel Signature Note Monograph
              </span>
              <p className="font-body text-sm text-on-surface font-medium">
                Top note: Wild Bergamot <span className="text-secondary mx-1">•</span> Heart: Mysore Sandalwood{' '}
                <span className="text-secondary mx-1">•</span> Base: Dry Amber
              </p>
            </div>
          </div>

          {/* Hero Visual Showcase */}
          <div className="lg:col-span-6 relative mt-space-lg lg:mt-0">
            <div className="relative w-full aspect-[3/4] bg-surface-container-low overflow-hidden shadow-xl border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop"
                alt="Amber glass fluted perfume flacon resting upon natural sand travertine stone"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-space-lg text-on-primary flex items-end justify-between">
                <div>
                  <span className="font-label-caps text-[0.65rem] tracking-[0.2em] uppercase text-secondary-fixed-dim block mb-1">
                    Flacon No. 04
                  </span>
                  <h4 className="font-display text-xl text-on-primary">Élan Botanical Fluted Extract</h4>
                </div>
                <span className="font-label-caps text-xs text-secondary-fixed-dim tracking-widest uppercase">
                  Pure Parfum
                </span>
              </div>
            </div>

            {/* Floating Monograph Tag */}
            <div className="absolute -top-4 -right-4 bg-surface-container-lowest p-space-md shadow-md hidden sm:block max-w-[210px] border border-surface-container-high">
              <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block">
                Distillation Lot
              </span>
              <span className="font-body text-sm text-on-surface font-semibold block mt-0.5">
                KNJ-2025-BATCH-08
              </span>
              <span className="font-body text-xs text-on-surface-variant block mt-1">
                Aged 180 Days in Teak Vats
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
