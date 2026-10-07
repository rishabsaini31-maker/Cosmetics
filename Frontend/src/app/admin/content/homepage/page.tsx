'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminContent, updateAdminContent } from '@/services/adminApi';

function HomepageEditorContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState({
    eyebrow: 'VĀNYA HAUTE PARFUMERIE',
    headline: 'BEAUTY, FRAGRANCE & THE ART OF RITUAL',
    description: 'Indian botanical luxury, slow hydro-distillations, and haute perfumery crafted in small batches.',
    primaryCta: 'EXPLORE SHOP',
    primaryCtaLink: '/shop',
    secondaryCta: 'DISCOVER FRAGRANCES',
    secondaryCtaLink: '/fragrance',
  });

  useEffect(() => {
    fetchAdminContent().then((res) => {
      if (res.success && res.data?.homepage?.hero) {
        setHero(res.data.homepage.hero);
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateAdminContent({
      homepage: { hero },
    });
    setLoading(false);

    if (res.success) {
      showToast('Homepage hero content updated successfully!', 'success');
    } else {
      showToast(res.message || 'Saving failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/admin/content" className="hover:text-primary">Content</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Homepage Editor</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Homepage Hero & Sections Editor
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-space-2xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Hero Section Editor
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Eyebrow Badge</label>
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
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={hero.primaryCta}
                onChange={(e) => setHero({ ...hero, primaryCta: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Primary CTA Link</label>
              <input
                type="text"
                value={hero.primaryCtaLink}
                onChange={(e) => setHero({ ...hero, primaryCtaLink: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">LIVE STOREFRONT PREVIEW</span>
          <div className="bg-surface p-space-xl border border-surface-container-high text-center max-w-2xl mx-auto">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-semibold block mb-1">{hero.eyebrow}</span>
            <h2 className="font-display text-3xl text-primary font-medium mb-2">{hero.headline}</h2>
            <p className="font-editorial-serif text-sm text-on-surface-variant max-w-md mx-auto mb-4">{hero.description}</p>
            <span className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-2 inline-block">
              {hero.primaryCta}
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-space-md border-t border-surface-container-high">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
          >
            SAVE HOMEPAGE CONTENT
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminHomepageEditorPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <HomepageEditorContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
