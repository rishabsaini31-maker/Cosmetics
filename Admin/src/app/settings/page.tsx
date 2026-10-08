'use client';

import React, { useState, useEffect } from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminSettings, updateAdminSettings } from '@/services/adminApi';

function SettingsContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    storeName: 'VĀNYA Haute Parfumerie',
    contactEmail: 'concierge@vanya.com',
    supportPhone: '+91 98765 43210',
    currency: 'INR (₹)',
    taxRate: 18,
    freeShippingThreshold: 999,
  });

  useEffect(() => {
    fetchAdminSettings().then((res) => {
      if (res.success && res.data) {
        setSettings({ ...settings, ...res.data });
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateAdminSettings(settings);
    setLoading(false);
    if (res.success) {
      showToast('Store settings updated!', 'success');
    } else {
      showToast(res.message || 'Update failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            STORE SYSTEM
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Storefront Settings & Logistics Config
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-space-2xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            General & Financial Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Concierge Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Free Shipping Threshold (₹)</label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">GST Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-space-md border-t border-surface-container-high">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
          >
            SAVE STORE SETTINGS
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <SettingsContent />
      </AdminLayout>
    </AdminProvider>
  );
}
