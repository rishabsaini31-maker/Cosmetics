'use client';

import React from 'react';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function AnalyticsContent() {
  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            INTELLIGENCE WORKSPACE
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Deep Commerce & Olfactory Analytics
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-2">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold">GROSS REVENUE</span>
          <span className="font-display text-3xl text-primary font-bold block">₹14,82,500</span>
          <p className="font-body text-xs text-on-surface-variant">+18.4% compared to previous harvest period</p>
        </div>
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-2">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold">NET PROFIT MARGIN</span>
          <span className="font-display text-3xl text-primary font-bold block">64.2%</span>
          <p className="font-body text-xs text-on-surface-variant">High gross margin driven by artisanal attar oils</p>
        </div>
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-2">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold">REPEAT PATRON RATE</span>
          <span className="font-display text-3xl text-primary font-bold block">41.8%</span>
          <p className="font-body text-xs text-on-surface-variant">Patrons re-ordering within 60 days</p>
        </div>
      </div>

      {/* Category Contribution */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-space-md">
        <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
          Category Revenue Share Breakdown
        </h2>

        <div className="space-y-3">
          {[
            { category: 'Fragrance / Perfumes', percent: 45, val: '₹6,67,125' },
            { category: 'Skincare Elixirs', percent: 28, val: '₹4,15,100' },
            { category: 'Luxury Hampers & Gifting Trunks', percent: 17, val: '₹2,52,025' },
            { category: 'Makeup & Lip Serums', percent: 6, val: '₹88,950' },
            { category: 'Body Care Mists', percent: 4, val: '₹59,300' },
          ].map((cat, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between font-label-caps text-xs">
                <span className="text-primary font-bold">{cat.category}</span>
                <span className="text-on-surface-variant font-mono">{cat.val} ({cat.percent}%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div style={{ width: `${cat.percent}%` }} className="bg-secondary h-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <AnalyticsContent />
      </AdminLayout>
    </AdminProvider>
  );
}
