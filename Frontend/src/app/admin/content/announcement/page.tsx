'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminContent, updateAdminContent } from '@/services/adminApi';

function AnnouncementEditorContent() {
  const { showToast } = useAdmin();
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminContent().then((res) => {
      if (res.success && Array.isArray(res.data?.announcements)) {
        setItems(res.data.announcements);
      }
      setLoading(false);
    });
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const updated = [...items, newItem.trim().toUpperCase()];
    setItems(updated);
    setNewItem('');
  };

  const handleRemoveItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleSave = async () => {
    setLoading(true);
    const res = await updateAdminContent({ announcements: items });
    setLoading(false);

    if (res.success) {
      showToast('Announcement marquee items updated!', 'success');
    } else {
      showToast(res.message || 'Save failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/admin/content" className="hover:text-primary">Content</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Announcement Bar</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Running Announcement Marquee
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-2.5 hover:bg-tertiary-container transition-colors disabled:opacity-50"
        >
          SAVE MARQUEE ITEMS
        </button>
      </div>

      {/* Live Marquee Preview */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-space-sm">
        <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block">LIVE STOREFRONT MARQUEE PREVIEW</span>
        <div className="bg-primary text-on-primary-fixed-variant overflow-hidden py-2 select-none border border-surface-container-high">
          <div className="animate-marquee font-label-caps text-xs uppercase tracking-widest whitespace-nowrap">
            {[...items, ...items].map((txt, idx) => (
              <span key={idx} className="mx-4 font-bold text-secondary-fixed-dim">
                {txt} → <span className="opacity-40 ml-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Item Creator & List */}
      <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
        <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
          Announcement Lines ({items.length})
        </h2>

        <form onSubmit={handleAddItem} className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new announcement line (e.g. COMPLIMENTARY SAMPLES WITH ORDERS > ₹2000)..."
            className="flex-1 bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-2 hover:bg-tertiary-container transition-colors"
          >
            + ADD LINE
          </button>
        </form>

        <div className="space-y-2 pt-2">
          {items.map((line, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-surface-container-low border border-surface-container-high font-label-caps text-xs uppercase tracking-wider text-primary font-bold">
              <span>{idx + 1}. {line}</span>
              <button
                onClick={() => handleRemoveItem(idx)}
                className="text-error hover:underline text-[0.6875rem]"
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminAnnouncementEditorPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <AnnouncementEditorContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
