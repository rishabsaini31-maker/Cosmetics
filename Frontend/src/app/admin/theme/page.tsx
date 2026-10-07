'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminTheme, saveDraftThemeApi, publishThemeApi } from '@/services/adminApi';

function ThemeEditorContent() {
  const { showToast } = useAdmin();
  const [themeData, setThemeData] = useState<any>(null);
  const [draft, setDraft] = useState({
    brandName: 'VĀNYA Haute Parfumerie',
    primaryColor: '#161616',
    secondaryColor: '#725b33',
    backgroundColor: '#fbf9f5',
    surfaceColor: '#f5f3ef',
    fontDisplay: 'Playfair Display, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
  });
  const [loading, setLoading] = useState(true);

  const loadTheme = async () => {
    setLoading(true);
    const res = await fetchAdminTheme();
    if (res.success && res.data) {
      setThemeData(res.data);
      if (res.data.draft) setDraft(res.data.draft);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const handleSaveDraft = async () => {
    const res = await saveDraftThemeApi(draft);
    if (res.success) {
      showToast('Draft theme settings saved!', 'info');
      loadTheme();
    } else {
      showToast(res.message || 'Draft save failed', 'error');
    }
  };

  const handlePublishTheme = async () => {
    const res = await publishThemeApi();
    if (res.success) {
      showToast('Theme settings published to live storefront!', 'success');
      loadTheme();
    } else {
      showToast(res.message || 'Publish failed', 'error');
    }
  };

  if (loading || !themeData) {
    return (
      <div className="py-space-3xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
        Loading VĀNYA Visual Design Tokens...
      </div>
    );
  }

  return (
    <div className="space-y-space-xl">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            BRAND DESIGN SYSTEM
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Visual Theme Editor
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            className="bg-surface-container-lowest text-primary border border-surface-container-high font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-2 hover:border-primary transition-colors"
          >
            SAVE DRAFT
          </button>
          <button
            onClick={handlePublishTheme}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-2 hover:bg-tertiary-container transition-colors"
          >
            PUBLISH TO LIVE STORE
          </button>
        </div>
      </div>

      {/* Draft vs Published Info Bar */}
      <div className="p-space-md bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-body text-xs text-on-surface-variant">
        <div>
          <span className="font-label-caps font-bold text-secondary mr-2">LAST PUBLISHED:</span>
          <span>{new Date(themeData.published?.lastPublishedAt || Date.now()).toLocaleString('en-IN')} by {themeData.published?.publishedBy || 'Admin'}</span>
        </div>
        <div>
          <span className="font-label-caps font-bold text-primary mr-2">DRAFT MODIFIED:</span>
          <span>{new Date(themeData.draft?.lastModifiedAt || Date.now()).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Design Tokens & Palette
          </h2>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Store Brand Title</label>
            <input
              type="text"
              value={draft.brandName}
              onChange={(e) => setDraft({ ...draft, brandName: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Primary Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={draft.primaryColor}
                  onChange={(e) => setDraft({ ...draft, primaryColor: e.target.value })}
                  className="w-8 h-8 cursor-pointer bg-transparent border border-surface-container-high"
                />
                <input
                  type="text"
                  value={draft.primaryColor}
                  onChange={(e) => setDraft({ ...draft, primaryColor: e.target.value })}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-2 py-1 font-mono text-xs text-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Secondary Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={draft.secondaryColor}
                  onChange={(e) => setDraft({ ...draft, secondaryColor: e.target.value })}
                  className="w-8 h-8 cursor-pointer bg-transparent border border-surface-container-high"
                />
                <input
                  type="text"
                  value={draft.secondaryColor}
                  onChange={(e) => setDraft({ ...draft, secondaryColor: e.target.value })}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-2 py-1 font-mono text-xs text-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Typography & Palette Preview */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Live Token Preview
          </h2>

          <div style={{ backgroundColor: draft.backgroundColor, color: draft.primaryColor }} className="p-space-lg border border-surface-container-high space-y-3">
            <span style={{ color: draft.secondaryColor }} className="font-label-caps text-xs uppercase tracking-[0.25em] font-bold block">
              THEME ACCENT PREVIEW
            </span>
            <h3 className="font-display text-3xl font-medium">
              VĀNYA Haute Parfumerie
            </h3>
            <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
              Quiet luxury e-commerce operations design token preview.
            </p>
            <div style={{ backgroundColor: draft.primaryColor }} className="text-white font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-2 inline-block">
              PRIMARY CTA BUTTON
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AdminThemePage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <ThemeEditorContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
