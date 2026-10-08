'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminContent, updateAdminContent } from '@/services/adminApi';

function HomepageEditorContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);

  // Editable state for all sections & images
  const [hero, setHero] = useState({
    eyebrow: 'VĀNYA HAUTE PARFUMERIE',
    headline: 'BEAUTY, FRAGRANCE & THE ART OF RITUAL',
    description: 'Indian botanical luxury, slow hydro-distillations, and haute perfumery crafted in small batches.',
    primaryCta: 'EXPLORE SHOP',
    primaryCtaLink: '/shop',
    secondaryCta: 'DISCOVER FRAGRANCES',
    secondaryCtaLink: '/fragrance',
    heroImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop',
  });

  const [featuredSection, setFeaturedSection] = useState({
    title: 'CURATED SELECTIONS',
    subtitle: 'Handpicked icons of scent & skin ritual',
    bannerImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
  });

  const [fragranceSection, setFragranceSection] = useState({
    title: 'HAUTE PARFUMERIE',
    subtitle: 'Rare extraits distilled in copper degs',
    description: 'Pure botanical essences harvested at peak bloom in Kannauj & Madurai.',
    bannerImage: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1200&auto=format&fit=crop',
  });

  const [beautySection, setBeautySection] = useState({
    title: 'SKIN & BEAUTY RITUALS',
    subtitle: 'Kashmiri saffron, sandalwood & cold-pressed oils',
    description: 'Nourishing serums, lip balms, and face mists formulated for radiant skin.',
    bannerImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop',
  });

  const [giftingEdit, setGiftingEdit] = useState({
    title: 'ARTISANAL GIFTING',
    subtitle: 'Bespoke hampers & pairing combos for moments of joy',
    description: 'Housed in velvet boxes sealed with traditional wax seals.',
    bannerImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200&auto=format&fit=crop',
  });

  const [editorialBanner, setEditorialBanner] = useState({
    title: 'OUR PHILOSOPHY',
    quote: '"Scent is the most intimate form of memory, woven from flowers, earth, and time."',
    author: 'VĀNYA Master Perfumer',
    bgImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1600&auto=format&fit=crop',
  });

  useEffect(() => {
    fetchAdminContent().then((res) => {
      if (res.success && res.data?.homepage) {
        const hp = res.data.homepage;
        if (hp.hero) setHero((prev) => ({ ...prev, ...hp.hero }));
        if (hp.featuredSection) setFeaturedSection((prev) => ({ ...prev, ...hp.featuredSection }));
        if (hp.fragranceSection) setFragranceSection((prev) => ({ ...prev, ...hp.fragranceSection }));
        if (hp.beautySection) setBeautySection((prev) => ({ ...prev, ...hp.beautySection }));
        if (hp.giftingEdit) setGiftingEdit((prev) => ({ ...prev, ...hp.giftingEdit }));
        if (hp.editorialBanner) setEditorialBanner((prev) => ({ ...prev, ...hp.editorialBanner }));
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateAdminContent({
      homepage: {
        hero,
        featuredSection,
        fragranceSection,
        beautySection,
        giftingEdit,
        editorialBanner,
      },
    });
    setLoading(false);

    if (res.success) {
      showToast('Homepage text & images updated successfully!', 'success');
    } else {
      showToast(res.message || 'Failed to save homepage content', 'error');
    }
  };

  return (
    <div className="space-y-space-xl pb-16">
      
      {/* Page Breadcrumb & Title */}
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/content" className="hover:text-primary">Content</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Homepage Editor</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Homepage Text & Image CMS
          </h1>
          <p className="font-body text-xs text-secondary mt-1">
            Edit headlines, paragraphs, and banner image assets for the live storefront.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-space-2xl">
        
        {/* 1. HERO BANNER SECTION */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md shadow-sm">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2 flex items-center justify-between">
            <span>1. Hero Main Banner</span>
            <span className="font-label-caps text-xs text-secondary">MAIN STOREFRONT HERO</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Eyebrow Tagline</label>
              <input
                type="text"
                value={hero.eyebrow}
                onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Main Headline</label>
              <input
                type="text"
                value={hero.headline}
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Description Paragraph</label>
              <textarea
                rows={3}
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-editorial-serif text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Primary Button Text</label>
              <input
                type="text"
                value={hero.primaryCta}
                onChange={(e) => setHero({ ...hero, primaryCta: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Primary Button Link</label>
              <input
                type="text"
                value={hero.primaryCtaLink}
                onChange={(e) => setHero({ ...hero, primaryCtaLink: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            {/* HERO IMAGE URL & PREVIEW */}
            <div className="md:col-span-2 space-y-2 pt-2 border-t border-surface-container-high">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block">Hero Background Image URL</label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={hero.heroImage}
                  onChange={(e) => setHero({ ...hero, heroImage: e.target.value })}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
                />
                <img src={hero.heroImage} alt="Hero preview" className="w-16 h-12 object-cover border border-surface-container-high bg-stone-100" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. FRAGRANCE SECTION */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md shadow-sm">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            2. Haute Parfumerie Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Section Title</label>
              <input
                type="text"
                value={fragranceSection.title}
                onChange={(e) => setFragranceSection({ ...fragranceSection, title: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Subtitle</label>
              <input
                type="text"
                value={fragranceSection.subtitle}
                onChange={(e) => setFragranceSection({ ...fragranceSection, subtitle: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Description</label>
              <textarea
                rows={2}
                value={fragranceSection.description}
                onChange={(e) => setFragranceSection({ ...fragranceSection, description: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 space-y-2 pt-2 border-t border-surface-container-high">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block">Fragrance Showcase Image URL</label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={fragranceSection.bannerImage}
                  onChange={(e) => setFragranceSection({ ...fragranceSection, bannerImage: e.target.value })}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
                />
                <img src={fragranceSection.bannerImage} alt="Fragrance preview" className="w-16 h-12 object-cover border border-surface-container-high bg-stone-100" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. BEAUTY & SKINCARE SECTION */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md shadow-sm">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            3. Skin & Beauty Rituals Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Section Title</label>
              <input
                type="text"
                value={beautySection.title}
                onChange={(e) => setBeautySection({ ...beautySection, title: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Subtitle</label>
              <input
                type="text"
                value={beautySection.subtitle}
                onChange={(e) => setBeautySection({ ...beautySection, subtitle: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Description</label>
              <textarea
                rows={2}
                value={beautySection.description}
                onChange={(e) => setBeautySection({ ...beautySection, description: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 space-y-2 pt-2 border-t border-surface-container-high">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block">Beauty Section Banner Image URL</label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={beautySection.bannerImage}
                  onChange={(e) => setBeautySection({ ...beautySection, bannerImage: e.target.value })}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
                />
                <img src={beautySection.bannerImage} alt="Beauty preview" className="w-16 h-12 object-cover border border-surface-container-high bg-stone-100" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. EDITORIAL PHILOSOPHY BANNER */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md shadow-sm">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            4. Editorial Philosophy Banner
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Section Title</label>
              <input
                type="text"
                value={editorialBanner.title}
                onChange={(e) => setEditorialBanner({ ...editorialBanner, title: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Author Attribution</label>
              <input
                type="text"
                value={editorialBanner.author}
                onChange={(e) => setEditorialBanner({ ...editorialBanner, author: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Featured Quote</label>
              <textarea
                rows={2}
                value={editorialBanner.quote}
                onChange={(e) => setEditorialBanner({ ...editorialBanner, quote: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-editorial-serif text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 space-y-2 pt-2 border-t border-surface-container-high">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block">Editorial Background Image URL</label>
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  value={editorialBanner.bgImage}
                  onChange={(e) => setEditorialBanner({ ...editorialBanner, bgImage: e.target.value })}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
                />
                <img src={editorialBanner.bgImage} alt="Editorial preview" className="w-16 h-12 object-cover border border-surface-container-high bg-stone-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-space-md border-t border-surface-container-high">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50 font-bold"
          >
            SAVE ALL HOMEPAGE TEXT & IMAGES
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminHomepageEditorPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <HomepageEditorContent />
      </AdminLayout>
    </AdminProvider>
  );
}
