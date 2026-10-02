export default function CraftStory() {
  return (
    <section id="craft" className="w-full bg-surface-container-low py-space-3xl border-t border-surface-container-high">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          {/* Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] bg-surface-container overflow-hidden shadow-lg border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop"
                alt="Traditional copper deg hydro-distillation apparatus in Kannauj"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-on-primary p-space-lg hidden sm:block max-w-[260px] shadow-xl">
              <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary-fixed-dim block">
                Heritage Technique
              </span>
              <p className="font-display text-lg text-on-primary mt-1 leading-snug">
                Bhakti Clay & Copper Deg Hydro-Distillation
              </p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 lg:pl-space-xl mt-space-2xl lg:mt-0">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              The Lineage & Craft
            </span>
            <h2 className="font-display text-4xl text-primary mt-space-xs mb-space-lg leading-tight">
              Where Centuries of Botanical Wisdom Meet French Precision
            </h2>
            <p className="font-editorial-serif text-base text-on-surface-variant mb-space-md leading-relaxed">
              At the heart of VĀNYA lies Kannauj’s legendary steam-distillation technique. Using ancient copper stills (*degs*) sealed with river clay, we capture volatile botanical molecules at dawn when their aromatic concentration reaches absolute purity.
            </p>
            <p className="font-editorial-serif text-base text-on-surface-variant mb-space-2xl leading-relaxed">
              These precious distillates are then blended in small batches with cold-pressed oils, wild Kashmir saffron, and Mysore sandalwood—resulting in haute extraits de parfum that evolve seamlessly on your skin.
            </p>

            <div className="grid grid-cols-3 gap-space-md pt-space-lg border-t border-surface-container-highest text-center">
              <div>
                <span className="font-display text-3xl text-primary block">100%</span>
                <span className="font-label-caps text-[0.65rem] uppercase tracking-wider text-secondary mt-1 block">
                  Wild Harvested
                </span>
              </div>
              <div>
                <span className="font-display text-3xl text-primary block">180</span>
                <span className="font-label-caps text-[0.65rem] uppercase tracking-wider text-secondary mt-1 block">
                  Days Vat Aged
                </span>
              </div>
              <div>
                <span className="font-display text-3xl text-primary block">0%</span>
                <span className="font-label-caps text-[0.65rem] uppercase tracking-wider text-secondary mt-1 block">
                  Synthetic Additives
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
