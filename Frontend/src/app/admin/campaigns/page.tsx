'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function CampaignsContent() {
  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            BRAND INITIATIVES
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Campaigns & Promotions
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
        <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
          Active Promotional Campaign
        </h2>
        <div className="p-space-md bg-surface-container-low border border-surface-container-high">
          <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold block mb-1">
            AUTUMN BOTANICAL HARVEST
          </span>
          <h3 className="font-display text-lg text-primary mb-1">Complimentary Discovery Set with Orders &gt; ₹3,000</h3>
          <p className="font-body text-xs text-on-surface-variant">
            Automated sample inclusion active across cart and checkout.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminCampaignsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <CampaignsContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
