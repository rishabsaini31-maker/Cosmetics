'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminContent, updateAdminContent } from '@/services/adminApi';

function AnnouncementMarqueeEditorContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<string[]>([
    "COMPLIMENTARY SHIPPING ABOVE ₹999",
    "BESPOKE PACKAGING & ARTISANAL SAMPLES INCLUDED",
    "DISCOVER BEAUTY & FRAGRANCE",
    "CURATED HAMPERS FOR EVERY OCCASION",
    "EXPLORE SIGNATURE COMBOS",
  ]);

  useEffect(() => {
    fetchAdminContent().then((res) => {
      if (res.success && Array.isArray(res.data?.announcements)) {
        setAnnouncements(res.data.announcements);
      }
      setLoading(false);
    });
  }, []);

  const handleUpdateItem = (idx: number, text: string) => {
    const updated = [...announcements];
    updated[idx] = text;
    setAnnouncements(updated);
  };

  const handleAddItem = () => {
    setAnnouncements([...announcements, 'NEW PROMOTIONAL MARQUEE ANNOUNCEMENT']);
  };

  const handleRemoveItem = (idx: number) => {
    setAnnouncements(announcements.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateAdminContent({ announcements });
    setLoading(false);

    if (res.success) {
      showToast('Announcement marquee list saved successfully!', 'success');
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
            <span className="text-primary font-semibold">Announcement Bar</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Running Announcement Marquee Editor
          </h1>
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-4 py-2 hover:bg-tertiary-container transition-colors"
        >
          + ADD ANNOUNCEMENT ITEM
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-space-2xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Marquee Items Directory ({announcements.length})
          </h2>

          <div className="space-y-3">
            {announcements.map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="font-mono text-xs text-secondary font-bold w-6 text-right">{idx + 1}.</span>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => handleUpdateItem(idx, e.target.value)}
                  className="flex-1 bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="text-error hover:underline font-label-caps text-xs uppercase tracking-wider px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Marquee Preview Box */}
        <div className="bg-surface-container-low p-space-xl border border-surface-container-high space-y-2">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2">LIVE ANNOUNCEMENT MARQUEE PREVIEW</span>
          <div className="bg-primary-container text-on-primary-fixed-variant overflow-hidden py-3 border border-surface-container-high select-none">
            <div className="flex font-label-caps text-xs uppercase tracking-widest whitespace-nowrap gap-6 justify-center">
              {announcements.map((t, i) => (
                <span key={i} className="text-secondary-fixed-dim font-semibold">
                  {t} →
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-space-md border-t border-surface-container-high">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
          >
            SAVE ANNOUNCEMENT MARQUEE
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminAnnouncementEditorPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <AnnouncementMarqueeEditorContent />
      </AdminLayout>
    </AdminProvider>
  );
}
