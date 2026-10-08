'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminContent, updateAdminContent } from '@/services/adminApi';

function NavigationEditorContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [navItems, setNavItems] = useState<any[]>([
    { label: 'SHOP', href: '/shop' },
    { label: 'FRAGRANCE', href: '/fragrance' },
    { label: 'BEAUTY', href: '/beauty' },
    { label: 'HAMPERS', href: '/hampers' },
    { label: 'COMBOS', href: '/combos' },
    { label: 'DISCOVER', href: '/discover' },
    { label: 'ABOUT', href: '/about' },
  ]);

  useEffect(() => {
    fetchAdminContent().then((res) => {
      if (res.success && Array.isArray(res.data?.navigation)) {
        setNavItems(res.data.navigation);
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateAdminContent({ navigation: navItems });
    setLoading(false);

    if (res.success) {
      showToast('Navigation menu links saved!', 'success');
    } else {
      showToast(res.message || 'Saving failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/content" className="hover:text-primary">Content</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Navigation</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Main Storefront Navigation Menu
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-space-2xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Header Navigation Items
          </h2>

          <div className="space-y-3">
            {navItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="font-mono text-xs text-secondary font-bold w-6">{idx + 1}.</span>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const copy = [...navItems];
                    copy[idx].label = e.target.value;
                    setNavItems(copy);
                  }}
                  className="w-48 bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => {
                    const copy = [...navItems];
                    copy[idx].href = e.target.value;
                    setNavItems(copy);
                  }}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-space-md border-t border-surface-container-high">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
          >
            SAVE NAVIGATION MENU
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminNavigationPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <NavigationEditorContent />
      </AdminLayout>
    </AdminProvider>
  );
}
