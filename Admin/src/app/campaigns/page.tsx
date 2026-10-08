'use client';

import React from 'react';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function CampaignsContent() {
  const campaigns = [
    { name: 'Diwali Royal Botanical Gifting Harvest', channel: 'Instagram + Email', duration: 'Oct 1 - Oct 30, 2026', status: 'ACTIVE', spend: '₹1,50,000', revenue: '₹8,20,000' },
    { name: 'Kannauj Hydro-Distillation Monograph Launch', channel: 'Editorial Gazette', duration: 'Sep 15 - Oct 15, 2026', status: 'ACTIVE', spend: '₹45,000', revenue: '₹3,10,000' },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            ACQUISITION CAMPAIGNS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Marketing Campaigns & ROI
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-body text-xs">
            <thead>
              <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                <th className="py-3 px-3">Campaign Name</th>
                <th className="py-3 px-3">Channel</th>
                <th className="py-3 px-3">Duration</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Ad Spend</th>
                <th className="py-3 px-3">Attributed Sales</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3 font-display text-sm font-medium text-primary">{c.name}</td>
                  <td className="py-3 px-3 font-body text-on-surface-variant">{c.channel}</td>
                  <td className="py-3 px-3 font-mono text-on-surface-variant">{c.duration}</td>
                  <td className="py-3 px-3">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 font-label-caps text-[0.6rem] uppercase tracking-wider font-bold">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">{c.spend}</td>
                  <td className="py-3 px-3 font-mono font-bold text-primary">{c.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminCampaignsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <CampaignsContent />
      </AdminLayout>
    </AdminProvider>
  );
}
