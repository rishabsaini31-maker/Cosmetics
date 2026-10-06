import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNav from '@/components/AboutNav';
import { ABOUT_HERO_DATA } from '@/data/aboutData';

export const metadata: Metadata = {
  title: 'About VĀNYA — Beauty, Fragrance & The Art of Ritual',
  description:
    'VĀNYA brings together fragrance, beauty and everyday rituals through thoughtfully considered products, refined design and a modern approach to self-expression.',
};

export default function AboutLandingPage() {
  const pillars = [
    {
      title: 'OUR STORY',
      eyebrow: 'CHAPTER 01',
      heading: 'The Inspiration Behind VĀNYA',
      description:
        'Conceived from a reverence for slow creation and sensory harmony, VĀNYA bridges traditional botanical artistry and haute perfumery into a modern ecosystem of self-expression.',
      linkHref: '/about/our-story',
      linkLabel: 'DISCOVER OUR STORY',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'OUR PHILOSOPHY',
      eyebrow: 'CHAPTER 02',
      heading: 'Intentional Beauty & Rituals',
      description:
        'Guided by 6 core principles—from Ritual Over Routine to Beauty Without Excess—we craft products meant to elevate daily moments into tactile sensory experiences.',
      linkHref: '/about/our-philosophy',
      linkLabel: 'EXPLORE OUR PHILOSOPHY',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'INGREDIENTS & FORMULATION',
      eyebrow: 'CHAPTER 03',
      heading: 'Considered Botanicals & Transparency',
      description:
        'From Mysore sandalwood oil to cold-pressed almond lipids and damask rose water, explore our transparent ingredient directory and formulation philosophy.',
      linkHref: '/about/ingredients',
      linkLabel: 'VIEW INGREDIENT DIRECTORY',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'CRAFT & SOURCING',
      eyebrow: 'CHAPTER 04',
      heading: 'The Art of Composition & Packaging',
      description:
        'Discover the creative journey behind our olfactory notes, flacon craftsmanship, and the curation of luxury hampers and fragrance pairings.',
      linkHref: '/about/craft-and-sourcing',
      linkLabel: 'LEARN ABOUT OUR CRAFT',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'SUSTAINABILITY',
      eyebrow: 'CHAPTER 05',
      heading: 'Factual Practices & Evaluation',
      description:
        'An honest, evidence-based overview of our recyclable glass packaging, minimal shipping void fill, and ongoing commitment to environmental evaluation.',
      linkHref: '/about/sustainability',
      linkLabel: 'READ SUSTAINABILITY REPORT',
      image: 'https://images.unsplash.com/photo-1608248597263-00079e96047c?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'PRESS & FEATURES',
      eyebrow: 'CHAPTER 06',
      heading: 'Stories & Editorial Media',
      description:
        'Updates, editorial features, and media inquiries from the world of VĀNYA Haute Parfumerie.',
      linkHref: '/about/press',
      linkLabel: 'VIEW PRESS & MEDIA',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'CAREERS AT VĀNYA',
      eyebrow: 'CHAPTER 07',
      heading: 'Shape the Future of Luxury Rituals',
      description:
        'Explore team culture, areas of opportunity, and active career openings across Design, E-commerce, Product, and Content.',
      linkHref: '/about/careers',
      linkLabel: 'EXPLORE CAREER OPPORTUNITIES',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      {/* Editorial Hero Section */}
      <section className="w-full bg-surface-container-low border-b border-surface-container-high py-space-2xl lg:py-space-3xl">
        <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary font-semibold">About VĀNYA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold mb-space-xs block">
                {ABOUT_HERO_DATA.eyebrow}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-medium tracking-tight mb-space-md leading-[1.15]">
                {ABOUT_HERO_DATA.title}
              </h1>
              <p className="font-editorial-serif text-lg sm:text-xl text-on-surface-variant max-w-2xl mb-space-xl leading-relaxed">
                "{ABOUT_HERO_DATA.supportingCopy}"
              </p>
              <div>
                <Link
                  href={ABOUT_HERO_DATA.ctaHref}
                  className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-space-md hover:bg-tertiary-container transition-all"
                >
                  <span>{ABOUT_HERO_DATA.ctaText}</span>
                  <span className="text-base leading-none">→</span>
                </Link>
              </div>
            </div>

            {/* Right Editorial Photography Column */}
            <div className="lg:col-span-5 mt-space-xl lg:mt-0">
              <div className="relative aspect-[4/5] bg-surface-container overflow-hidden border border-surface-container-high shadow-md">
                <img
                  src={ABOUT_HERO_DATA.heroImage}
                  alt="VĀNYA Haute Parfumerie Editorial Flacon"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-space-md bg-surface/90 backdrop-blur-sm border border-surface-container-high">
                  <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block">
                    THE ATELIER PORTFOLIO
                  </span>
                  <p className="font-editorial-serif text-xs text-primary italic mt-0.5">
                    Fragrance, Skincare, Makeup, Body Care & Curated Keepsake Sets
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Sub-Navigation Bar */}
      <AboutNav />

      {/* Main Content Grid: Chapters & Pillars */}
      <section className="max-w-7xl mx-auto px-margin lg:px-margin-desktop pt-space-md">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            EXPLORE THE WORLD OF VĀNYA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-medium">
            Our Pillars & Craft Architecture
          </h2>
          <div className="w-12 h-0.5 bg-secondary mx-auto mt-space-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group bg-surface-container-lowest border border-surface-container-high flex flex-col justify-between transition-all hover:border-secondary hover:shadow-md"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-surface-container border-b border-surface-container-high relative">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-surface/90 px-2.5 py-1 font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold border border-surface-container-high">
                    {pillar.eyebrow}
                  </div>
                </div>

                <div className="p-space-lg">
                  <h3 className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-1">
                    {pillar.title}
                  </h3>
                  <h4 className="font-display text-2xl text-primary font-medium mb-3 group-hover:text-secondary transition-colors">
                    {pillar.heading}
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="px-space-lg pb-space-lg pt-0">
                <Link
                  href={pillar.linkHref}
                  className="inline-flex items-center gap-1.5 font-label-caps text-xs uppercase tracking-[0.18em] text-primary font-bold group-hover:text-secondary transition-colors pt-2 border-t border-surface-container-high w-full justify-between"
                >
                  <span>{pillar.linkLabel}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
