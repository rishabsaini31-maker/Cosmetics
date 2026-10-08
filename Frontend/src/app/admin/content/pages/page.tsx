'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminContent, updateAdminContent } from '@/services/adminApi';

interface EditorialPageConfig {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  quote: string;
  bodyText: string;
  published: boolean;
}

const DEFAULT_PAGES: Record<string, EditorialPageConfig> = {
  story: {
    id: 'story',
    title: 'Our Story',
    subtitle: 'The Heritage of Indian Botanicals & Quiet Luxury',
    heroImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    quote: 'Crafted at the crossroads of ancient Indian hydro-distillation and modern French haute perfumery.',
    bodyText: 'Founded with a reverent vision for Indian flora, VĀNYA captures pure floral extracts, wild-harvested roots, and rare woods. Every bottle is a ode to patience, ritual, and unhurried craftsmanship.',
    published: true,
  },
  fragrance: {
    id: 'fragrance',
    title: 'Fragrance Collection Page',
    subtitle: 'Artisanal Parfum Extraits & Hydro-distillations',
    heroImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
    quote: 'Rare olfactory compositions distilled in Kannauj copper degs.',
    bodyText: 'Our fragrance collection showcases extraits de parfum formulated with pure absolutes of rose, vetiver, jasmine, and Mysore sandalwood.',
    published: true,
  },
  skincare: {
    id: 'skincare',
    title: 'Skincare & Beauty Page',
    subtitle: 'Kashmiri Saffron, Sandalwood & Cold-Pressed Oils',
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
    quote: 'High-performance botanical chemistry rooted in royal Ayurvedic beauty rituals.',
    bodyText: 'Nourishing facial elixirs, lip salves, night creams, and botanical mist sprays created for lasting luminosity.',
    published: true,
  },
  makeup: {
    id: 'makeup',
    title: 'Makeup & Color Rituals Page',
    subtitle: 'Luminous Balms & Botanical Tint Pigments',
    heroImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    quote: 'Pure plant pigments infused with cold-pressed rosehip and saffron oils.',
    bodyText: 'Breathable lip tints, cheek stains, and illuminating highlight balms designed to nourish while delivering natural color.',
    published: true,
  },
  bodycare: {
    id: 'bodycare',
    title: 'Body & Bath Care Page',
    subtitle: 'Indulgent Body Oils & Aromatic Cleansers',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop',
    quote: 'Transform daily bathing into a serene sensory ritual.',
    bodyText: 'Velvety body creams, intoxicating shower gels, and rich body oils scented with Madurai jasmine and lotus.',
    published: true,
  },
  hampers: {
    id: 'hampers',
    title: 'Royal Hampers Gifting Page',
    subtitle: 'Bespoke Curated Gift Boxes & Velvet Trunks',
    heroImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    quote: 'Housed in handcrafted wooden chests sealed with traditional wax seals.',
    bodyText: 'Exquisite gifting sets designed for weddings, anniversaries, corporate milestones, and cherished celebrations.',
    published: true,
  },
  combos: {
    id: 'combos',
    title: 'Signature Combos Page',
    subtitle: 'Layerable Perfume & Skincare Duos',
    heroImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
    quote: 'Complementary perfume and body oil pairings for extended scent sillage.',
    bodyText: 'Curated duos that harmonize fragrance and skincare to amplify scent longevity and skin radiance.',
    published: true,
  },
  philosophy: {
    id: 'philosophy',
    title: 'Our Philosophy',
    subtitle: 'Uncompromising Purity & Unhurried Craft',
    heroImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
    quote: 'Beauty as a sacred daily sanctuary rather than a transient trend.',
    bodyText: 'We believe true luxury is quiet, tactile, and sensory. We refuse synthetic fillers, harsh preservatives, and artificial fragrances in favor of cold-pressed oils and pure attars.',
    published: true,
  },
  ingredients: {
    id: 'ingredients',
    title: 'Ingredients & Formulation',
    subtitle: 'Ethically Sourced Natural Botanicals',
    heroImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1200&auto=format&fit=crop',
    quote: 'Full disclosure of active botanicals and INCI formulation transparency.',
    bodyText: 'Kashmiri Saffron, Kannauj Rose, Himalayan Vetiver, Mysore Sandalwood, and Cold-Pressed Sweet Almond oils form the foundation of our elixirs.',
    published: true,
  },
  craft: {
    id: 'craft',
    title: 'Craft & Sourcing',
    subtitle: 'Traditional Deg-Bapka Distillation & Artisan Batches',
    heroImage: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1200&auto=format&fit=crop',
    quote: 'Preserving century-old copper alembic stills in Kannauj.',
    bodyText: 'Our master distillers work in sync with seasonal harvests, extracting pure olfactory notes during peak morning dew hours.',
    published: true,
  },
  sustainability: {
    id: 'sustainability',
    title: 'Sustainability',
    subtitle: 'Zero-Waste Glass Packaging & Regenerative Sourcing',
    heroImage: 'https://images.unsplash.com/photo-1512290900676-26c2a4d4b5b3?q=80&w=1200&auto=format&fit=crop',
    quote: 'Respecting the soil that yields our finest aromatic botanicals.',
    bodyText: 'Heavy-gauge recyclable glass flacons, biodegradable hemp shipping cartons, and zero plastic outer wraps define our supply chain.',
    published: true,
  },
  press: {
    id: 'press',
    title: 'Press & Media',
    subtitle: 'VĀNYA Featured in Editorial Publications',
    heroImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    quote: 'Recognized by Vogue, Harper’s Bazaar, and Architectural Digest as the new gold standard of Asian luxury beauty.',
    bodyText: 'Press inquiries and media kits can be requested directly through our communications team at press@vanya.com.',
    published: true,
  },
  careers: {
    id: 'careers',
    title: 'Careers & Artisans',
    subtitle: 'Join Our House of Beauty & Olfactory Excellence',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    quote: 'Seekers of craftsmanship, fragrance connoisseurs, and cosmetic formulators.',
    bodyText: 'We are constantly seeking passionate artisans, cosmetic chemists, and retail ambassadors across Delhi, Mumbai, and Paris.',
    published: true,
  },
};

function EditorialPagesContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('story');
  const [pages, setPages] = useState<Record<string, EditorialPageConfig>>(DEFAULT_PAGES);

  useEffect(() => {
    fetchAdminContent().then((res) => {
      if (res.success && res.data?.pages) {
        setPages({ ...DEFAULT_PAGES, ...res.data.pages });
      }
      setLoading(false);
    });
  }, []);

  const currentPage = pages[activeTab] || DEFAULT_PAGES[activeTab];

  const handleUpdateCurrentPage = (field: keyof EditorialPageConfig, value: any) => {
    setPages((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateAdminContent({ pages });
    setLoading(false);

    if (res.success) {
      showToast(`Static page "${currentPage.title}" saved successfully!`, 'success');
    } else {
      showToast(res.message || 'Failed to update page content.', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/admin/content" className="hover:text-primary">Content</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Static Editorial Pages</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Editorial Brand Pages Manager
          </h1>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-container-high overflow-x-auto pb-1 no-scrollbar">
        {Object.keys(pages).map((key) => {
          const page = pages[key];
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 font-label-caps text-xs uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                isActive
                  ? 'border-primary text-primary font-bold bg-surface-container-lowest'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              {page.title}
            </button>
          );
        })}
      </div>

      {/* Page Form */}
      <form onSubmit={handleSave} className="space-y-space-xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
            <h2 className="font-display text-xl text-primary font-medium">
              Editing: {currentPage.title}
            </h2>
            <label className="flex items-center gap-2 cursor-pointer font-label-caps text-xs uppercase tracking-wider text-primary">
              <input
                type="checkbox"
                checked={currentPage.published}
                onChange={(e) => handleUpdateCurrentPage('published', e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Page Published</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Page Title
              </label>
              <input
                type="text"
                value={currentPage.title}
                onChange={(e) => handleUpdateCurrentPage('title', e.target.value)}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Subtitle Tagline
              </label>
              <input
                type="text"
                value={currentPage.subtitle}
                onChange={(e) => handleUpdateCurrentPage('subtitle', e.target.value)}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Hero Image URL
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={currentPage.heroImage}
                  onChange={(e) => handleUpdateCurrentPage('heroImage', e.target.value)}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
                />
                <img src={currentPage.heroImage} alt="Hero preview" className="w-16 h-12 object-cover border border-surface-container-high bg-stone-100" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Featured Editorial Quote / Pullout Text
              </label>
              <textarea
                rows={2}
                value={currentPage.quote}
                onChange={(e) => handleUpdateCurrentPage('quote', e.target.value)}
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-editorial-serif italic text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Main Body Content
              </label>
              <textarea
                rows={5}
                value={currentPage.bodyText}
                onChange={(e) => handleUpdateCurrentPage('bodyText', e.target.value)}
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-editorial-serif text-xs text-primary leading-relaxed focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-3">
            EDITORIAL STOREFRONT PREVIEW
          </span>
          <div className="bg-surface border border-surface-container-high overflow-hidden">
            <div className="h-48 relative bg-surface-container-high overflow-hidden">
              {currentPage.heroImage && (
                <img
                  src={currentPage.heroImage}
                  alt={currentPage.title}
                  className="w-full h-full object-cover opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6 text-on-primary">
                <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.25em] text-secondary font-semibold">
                  ABOUT VĀNYA
                </span>
                <h2 className="font-display text-2xl font-medium">{currentPage.title}</h2>
                <p className="font-editorial-serif text-xs opacity-90">{currentPage.subtitle}</p>
              </div>
            </div>
            <div className="p-8 space-y-4 max-w-xl mx-auto text-center">
              <blockquote className="font-editorial-serif italic text-base text-primary border-y border-surface-container-high py-4">
                "{currentPage.quote}"
              </blockquote>
              <p className="font-editorial-serif text-xs text-on-surface-variant leading-relaxed">
                {currentPage.bodyText}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-space-md border-t border-surface-container-high">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50 font-bold"
          >
            SAVE EDITORIAL PAGE
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminPagesManagerPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <EditorialPagesContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
