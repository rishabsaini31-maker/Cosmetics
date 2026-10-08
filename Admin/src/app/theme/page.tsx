'use client';

import React, { useState, useEffect } from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminTheme, saveDraftThemeApi, publishThemeApi } from '@/services/adminApi';

function ThemeEditorContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState({
    published: {
      primaryColor: '#161616',
      secondaryColor: '#725b33',
      backgroundColor: '#fbf9f5',
      fontDisplay: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
    },
    draft: {
      primaryColor: '#161616',
      secondaryColor: '#725b33',
      backgroundColor: '#fbf9f5',
      fontDisplay: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
    },
  });

  useEffect(() => {
    fetchAdminTheme().then((res) => {
      if (res.success && res.data) {
        setTheme(res.data);
      }
      setLoading(false);
    });
  }, []);

  const handleSaveDraft = async () => {
    setLoading(true);
    const res = await saveDraftThemeApi(theme.draft);
    setLoading(false);
    if (res.success) {
      showToast('Draft theme saved successfully!', 'success');
    } else {
      showToast(res.message || 'Save draft failed', 'error');
    }
  };

  const handlePublish = async () => {
    if (!confirm('Publish current draft design tokens to live store?')) return;
    setLoading(true);
    const res = await publishThemeApi();
    setLoading(false);
    if (res.success) {
      showToast('Theme published to live storefront!', 'success');
      fetchAdminTheme().then((r) => r.success && setTheme(r.data));
    } else {
      showToast(res.message || 'Publish failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            BRAND VISUAL IDENTITY
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Visual Theme & Token Customizer
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="bg-surface-container-lowest border border-surface-container-high text-primary font-label-caps text-xs uppercase tracking-wider px-4 py-2.5 hover:border-primary transition-colors"
          >
            SAVE DRAFT
          </button>
          <button
            onClick={handlePublish}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-5 py-2.5 hover:bg-tertiary-container transition-colors"
          >
            PUBLISH THEME TO STORE
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
        <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
          Color Tokens & Typography
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              Primary Charcoal/Black Token
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.draft.primaryColor}
                onChange={(e) => setTheme({
                  ...theme,
                  draft: { ...theme.draft, primaryColor: e.target.value }
                })}
                className="w-10 h-10 border border-surface-container-high cursor-pointer"
              />
              <input
                type="text"
                value={theme.draft.primaryColor}
                onChange={(e) => setTheme({
                  ...theme,
                  draft: { ...theme.draft, primaryColor: e.target.value }
                })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              Secondary Gold/Bronze Accent Token
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.draft.secondaryColor}
                onChange={(e) => setTheme({
                  ...theme,
                  draft: { ...theme.draft, secondaryColor: e.target.value }
                })}
                className="w-10 h-10 border border-surface-container-high cursor-pointer"
              />
              <input
                type="text"
                value={theme.draft.secondaryColor}
                onChange={(e) => setTheme({
                  ...theme,
                  draft: { ...theme.draft, secondaryColor: e.target.value }
                })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              Background Cream/Ivory Surface
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.draft.backgroundColor}
                onChange={(e) => setTheme({
                  ...theme,
                  draft: { ...theme.draft, backgroundColor: e.target.value }
                })}
                className="w-10 h-10 border border-surface-container-high cursor-pointer"
              />
              <input
                type="text"
                value={theme.draft.backgroundColor}
                onChange={(e) => setTheme({
                  ...theme,
                  draft: { ...theme.draft, backgroundColor: e.target.value }
                })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminThemePage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <ThemeEditorContent />
      </AdminLayout>
    </AdminProvider>
  );
}
