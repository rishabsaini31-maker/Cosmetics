const categories = [
  {
    num: '01',
    title: 'Perfumes & Extracts',
    subtitle: '8 Flacons',
    desc: 'Cold-pressed aged oils and high concentration extraits de parfum.',
    img: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '02',
    title: 'Botanical Mists',
    subtitle: '4 Hydrophiles',
    desc: 'Kannauj clay steam condensates, steam distilled morning roses.',
    img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '03',
    title: 'Skincare & Elixirs',
    subtitle: '6 Balms',
    desc: 'Night-blooming Madurai jasmine infused into cold lipid emulsions.',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '04',
    title: 'Body Nectars',
    subtitle: '5 Formulations',
    desc: 'Velvety oils infused with wild vetiver roots and saffron strands.',
    img: 'https://images.unsplash.com/photo-1608248597263-00079e96047c?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '05',
    title: 'Saffron Lip Salve',
    subtitle: 'Single Origin',
    desc: 'Kashmiri mongra saffron, organic bees wax, and cold-pressed almond butter.',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
  },
  {
    num: '06',
    title: 'Archival Gift Coffrets',
    subtitle: 'Limited Sets',
    desc: 'Bespoke presentation boxes tied with handspun ahimsa silk ribbons.',
    img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Categories() {
  return (
    <section id="categories" className="w-full bg-surface-container-low py-space-3xl border-y border-surface-container-high">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              The Ritual Catalog
            </span>
            <h2 className="font-display text-4xl text-primary mt-space-xs">
              Discover Your Ritual
            </h2>
          </div>
          <p className="font-editorial-serif text-editorial-serif text-on-surface-variant max-w-md mt-space-md md:mt-0">
            Formulated to linger on the pulse, nurture the skin barrier, and transform daily routines into reverent pauses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
          {categories.map((cat) => (
            <a
              key={cat.num}
              href="#products"
              className="group relative bg-surface-container-lowest p-space-md flex flex-col shadow-sm hover:shadow-md transition-all duration-300 border border-surface-container-high"
            >
              <div className="aspect-[3/4] bg-surface-container overflow-hidden relative mb-space-md">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-space-sm left-space-sm bg-surface-container-lowest/90 px-space-sm py-1 font-label-caps text-[0.6rem] uppercase tracking-wider text-primary">
                  {cat.num}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-display text-xl text-primary group-hover:text-secondary transition-colors">
                  {cat.title}
                </h3>
                <span className="font-label-caps text-xs text-secondary uppercase tracking-widest">
                  {cat.subtitle}
                </span>
              </div>
              <p className="font-body text-xs text-on-surface-variant mt-space-xs leading-relaxed">
                {cat.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
