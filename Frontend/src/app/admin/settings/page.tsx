'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminSettings, updateAdminSettings } from '@/services/adminApi';

function SettingsContent() {
  const { showToast } = useAdmin();
  const [settings, setSettings] = useState({
    storeName: 'VĀNYA Haute Parfumerie',
    storeEmail: 'contact@vanya-haute-parfumerie.com',
    currency: 'INR (₹)',
    taxRatePercentage: 18,
    freeShippingThreshold: 999,
    defaultFlatShippingFee: 150,
    orderNotificationsEmail: 'orders@vanya-haute-parfumerie.com',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminSettings().then((res) => {
      if (res.success && res.data) {
        setSettings(res.data);
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
      showToast('Store settings saved successfully!', 'success');
    } else {
      showToast(res.message || 'Saving failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            STORE CONFIGURATION
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            General Store Settings
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
        <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
          Business Details & Commerce Config
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Public Support Email</label>
            <input
              type="email"
              value={settings.storeEmail}
              onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
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
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Default GST Tax Rate (%)</label>
            <input
              type="number"
              value={settings.taxRatePercentage}
              onChange={(e) => setSettings({ ...settings, taxRatePercentage: Number(e.target.value) })}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
            />
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
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <SettingsContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
