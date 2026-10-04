'use client';

import { useState } from 'react';
import Link from 'next/link';

const accords = [
  { name: 'Woody & Resinous', notes: 'Mysore Sandalwood, Teak Vat Resin, Cedarwood', mood: 'Grounding & Contemplative' },
  { name: 'Floral & Nectar', notes: 'Night-Blooming Madurai Jasmine, Damascena Rose', mood: 'Sensual & Luminous' },
  { name: 'Spiced & Amber', notes: 'Kashmiri Saffron, Smoked Oudh, Dry Amber', mood: 'Opulent & Warm' },
  { name: 'Fresh & Hydrophile', notes: 'Wild Bergamot, Kannauj Clay Steam, Vetiver Roots', mood: 'Revitalizing & Pure' },
];

export default function FragranceFinder() {
  const [selectedAccord, setSelectedAccord] = useState(0);

  return (
    <section id="finder" className="w-full bg-surface py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
            Olfactory Architecture
          </span>
          <h2 className="font-display text-4xl text-primary mt-space-xs">
            Fragrance Note Matrix
          </h2>
          <p className="font-editorial-serif text-editorial-serif text-on-surface-variant mt-2">
            Explore the structural accords that define VĀNYA’s haute fragrance creations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-2xl">
          {accords.map((accord, idx) => (
            <button
              key={accord.name}
              type="button"
              onClick={() => setSelectedAccord(idx)}
              className={`p-space-lg text-left transition-all duration-300 border ${
                selectedAccord === idx
                  ? 'bg-primary text-on-primary border-primary shadow-lg'
                  : 'bg-surface-container-lowest text-on-surface border-surface-container-high hover:border-secondary'
              }`}
            >
              <span className={`font-label-caps text-xs uppercase tracking-widest block mb-2 ${
                selectedAccord === idx ? 'text-secondary-fixed-dim' : 'text-secondary'
              }`}>
                Accord 0{idx + 1}
              </span>
              <h3 className="font-display text-xl mb-2">{accord.name}</h3>
              <p className={`font-body text-xs ${
                selectedAccord === idx ? 'text-on-primary/80' : 'text-on-surface-variant'
              }`}>
                {accord.mood}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Accord Details */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-8">
            <span className="font-label-caps text-xs uppercase tracking-widest text-secondary block mb-2 font-semibold">
              Accord Breakdown
            </span>
            <h4 className="font-display text-3xl text-primary mb-3">
              {accords[selectedAccord].name}
            </h4>
            <p className="font-editorial-serif text-lg text-on-surface-variant mb-4">
              Dominant Botanicals: {accords[selectedAccord].notes}
            </p>
            <div className="flex flex-wrap items-center gap-space-md">
              <span className="font-label-caps text-xs uppercase tracking-wider text-primary">
                Sillage: <strong className="text-secondary font-semibold">Intense & Lingering</strong>
              </span>
              <span className="text-outline hidden sm:inline">•</span>
              <span className="font-label-caps text-xs uppercase tracking-wider text-primary">
                Distillation: <strong className="text-secondary font-semibold">Hydro-Steam</strong>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="/fragrance"
              className="inline-flex items-center justify-center bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-4 hover:bg-tertiary-container transition-colors shadow-md"
            >
              Discover Matching Flacons
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
