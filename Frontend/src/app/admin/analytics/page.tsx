'use client';

import React, { useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function AnalyticsContent() {
  const { dateRange, setDateRange } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryBreakdown = [
    { name: 'Parfum Extrait', revenue: '₹2,48,000', percentage: '51%', orders: 36 },
    { name: 'Skincare & Lipids', revenue: '₹1,12,000', percentage: '23%', orders: 42 },
    { name: 'Hampers & Gifting', revenue: '₹74,500', percentage: '15%', orders: 6 },
    { name: 'Body Nectars & Mists', revenue: '₹47,950', percentage: '11%', orders: 18 },
  ];

  return (
    <div className="space-y-space-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            INTELLIGENCE WORKSPACE
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Commerce & Olfactory Analytics
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-label-caps text-[0.625rem] text-outline font-bold uppercase">DATE FILTER:</span>
          <select
            value={dateRange}
            onChange={(e: any) => setDateRange(e.target.value)}
            className="bg-surface-container-lowest border border-surface-container-high px-3 py-1.5 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="This Month">This Month</option>
            <option value="Last 90 Days">Last 90 Days</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>

      {/* Gross vs Net Revenue Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block mb-1">GROSS REVENUE</span>
          <span className="font-display text-3xl text-primary font-bold">₹4,82,450</span>
          <span className="font-body text-xs text-emerald-700 block mt-2">+18.4% vs previous period</span>
        </div>
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block mb-1">NET REVENUE</span>
          <span className="font-display text-3xl text-primary font-bold">₹4,25,950</span>
          <span className="font-body text-xs text-emerald-700 block mt-2">After GST taxes & discounts</span>
        </div>
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block mb-1">TOTAL DISCOUNTS</span>
          <span className="font-display text-3xl text-primary font-bold">₹18,500</span>
          <span className="font-body text-xs text-outline block mt-2">Coupon & Harvest specials</span>
        </div>
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block mb-1">REORDER RATE</span>
          <span className="font-display text-3xl text-primary font-bold">41.2%</span>
          <span className="font-body text-xs text-emerald-700 block mt-2">Patron repeat purchase frequency</span>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
          <h2 className="font-display text-2xl text-primary font-medium">Category Share Breakdown</h2>
          <span className="font-label-caps text-xs text-secondary font-bold uppercase">{dateRange}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="bg-surface-container-low p-space-md border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block mb-1">{cat.name}</span>
              <span className="font-display text-2xl text-primary font-bold block">{cat.revenue}</span>
              <div className="flex justify-between items-center font-body text-xs text-outline mt-2 pt-2 border-t border-surface-container-high">
                <span>{cat.percentage} total share</span>
                <span>{cat.orders} orders</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fragrance & Beauty Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high">
          <h2 className="font-display text-xl text-primary font-medium mb-3 border-b border-surface-container-high pb-2">
            Top Fragrance Notes & Families
          </h2>
          <div className="space-y-3 font-body text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-surface-container-high">
              <span className="font-medium text-primary">Woody & Resinous (Sandalwood, Oudh, Teak)</span>
              <span className="font-mono text-secondary font-bold">58% Demand</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-surface-container-high">
              <span className="font-medium text-primary">Floral Botanical (Dawn Jasmine, Damask Rose)</span>
              <span className="font-mono text-secondary font-bold">28% Demand</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-primary">Earthy Hydro-Distillates (Terracotta Attar Mitti)</span>
              <span className="font-mono text-secondary font-bold">14% Demand</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high">
          <h2 className="font-display text-xl text-primary font-medium mb-3 border-b border-surface-container-high pb-2">
            Gifting & Hamper Insights
          </h2>
          <div className="space-y-3 font-body text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-surface-container-high">
              <span className="font-medium text-primary">Royal Heritage Hamper</span>
              <span className="font-mono text-primary font-bold">₹12,500 Avg Price</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-surface-container-high">
              <span className="font-medium text-primary">Extrait & Lip Salve Duo Combo</span>
              <span className="font-mono text-primary font-bold">₹8,250 Avg Price</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-primary">Custom Gift Box Additions</span>
              <span className="font-mono text-secondary font-bold">84% Inclusion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <AnalyticsContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
