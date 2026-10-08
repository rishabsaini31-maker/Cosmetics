'use client';

import React from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function ReportsContent() {
  const { showToast } = useAdmin();

  const handleDownloadReport = (title: string) => {
    showToast(`Generating ${title}... CSV download started.`, 'success');
  };

  const reports = [
    { title: 'Full Sales & GST Tax Register', desc: 'Itemized sales invoice register with 18% GST breakdown, HSN codes, and shipping fees.' },
    { title: 'Inventory Valuation & Low Stock Audit', desc: 'Current stock count, unit COGS, retail value, and low stock re-order recommendations.' },
    { title: 'Patron Acquisition & LTV Monograph', desc: 'Customer cohort analysis, lifetime value metrics, and repeat purchase frequencies.' },
    { title: 'Promotional Campaign & Coupon Usage', desc: 'Discount code utilization rates, coupon revenue contribution, and campaign ROI.' },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            DATA EXPORTS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Reports & Financial Statements
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
        {reports.map((r, i) => (
          <div key={i} className="bg-surface-container-lowest p-space-lg border border-surface-container-high flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-display text-lg text-primary font-medium mb-1">{r.title}</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">{r.desc}</p>
            </div>
            <div>
              <button
                onClick={() => handleDownloadReport(r.title)}
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-4 py-2 hover:bg-tertiary-container transition-colors"
              >
                DOWNLOAD CSV REPORT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminReportsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <ReportsContent />
      </AdminLayout>
    </AdminProvider>
  );
}
