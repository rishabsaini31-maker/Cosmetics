'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminMarketing, updateAdminMarketing } from '@/services/adminApi';

function MarketingOverviewContent() {
  const { showToast } = useAdmin();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminMarketing().then((res) => {
      if (res.success) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, []);

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setLoading(true);
    const res = await updateAdminMarketing(data);
    setLoading(false);

    if (res.success) {
      showToast('Marketing settings saved successfully!', 'success');
    } else {
      showToast(res.message || 'Save failed', 'error');
    }
  };

  if (loading || !data) {
    return (
      <div className="py-space-3xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
        Loading Marketing Hub...
      </div>
    );
  }

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            CAMPAIGNS & PROMOTIONS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Marketing Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/coupons" className="bg-surface-container-lowest border border-surface-container-high text-primary font-label-caps text-xs uppercase tracking-wider px-4 py-2 hover:border-primary transition-colors">
            Manage Coupons
          </Link>
          <Link href="/campaigns" className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-4 py-2 hover:bg-tertiary-container transition-colors">
            + New Campaign
          </Link>
        </div>
      </div>

      {/* Hero Announcement Banner Control */}
      <form onSubmit={handleSaveBanner} className="space-y-space-xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Storefront Announcement Bar Marquee
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="md:col-span-2">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Primary Marquee Message
              </label>
              <input
                type="text"
                value={data.announcementBanner?.text || ''}
                onChange={(e) => setData({
                  ...data,
                  announcementBanner: { ...data.announcementBanner, text: e.target.value }
                })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Target Link URL
              </label>
              <input
                type="text"
                value={data.announcementBanner?.link || ''}
                onChange={(e) => setData({
                  ...data,
                  announcementBanner: { ...data.announcementBanner, link: e.target.value }
                })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <label className="flex items-center gap-2 cursor-pointer font-label-caps text-xs uppercase tracking-wider text-primary">
                <input
                  type="checkbox"
                  checked={data.announcementBanner?.enabled ?? true}
                  onChange={(e) => setData({
                    ...data,
                    announcementBanner: { ...data.announcementBanner, enabled: e.target.checked }
                  })}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>Announcement Bar Active</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors"
          >
            SAVE ANNOUNCEMENT BAR
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminMarketingPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <MarketingOverviewContent />
      </AdminLayout>
    </AdminProvider>
  );
}
