'use client';

import React, { useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function ReportsContent() {
  const { showToast } = useAdmin();
  const [reportType, setReportType] = useState('Sales Report');
  const [reportDateRange, setReportDateRange] = useState('Last 30 Days');
  const [reportCategory, setReportCategory] = useState('All');
  const [generated, setGenerated] = useState(false);

  const reportOptions = [
    'Sales Report',
    'Revenue Summary Report',
    'Customer Acquisition & Retention',
    'Inventory Movement & Low Stock',
    'Coupon & Marketing Performance',
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
    showToast(`Generated ${reportType} for ${reportDateRange}`, 'success');
  };

  const handleExportCsv = () => {
    const csvContent = `data:text/csv;charset=utf-8,Report,${reportType}\nDate Range,${reportDateRange}\nCategory,${reportCategory}\nGenerated At,${new Date().toISOString()}\nGross Revenue,482450\nNet Revenue,425950\nOrders,12\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VANYA_Report_${reportType.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Report exported as CSV', 'info');
  };

  return (
    <div className="space-y-space-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            EXECUTIVE AUDIT
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Reports Center & Builder
          </h1>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
        <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
          Create Custom Report
        </h2>

        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              Report Type *
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
            >
              {reportOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              Time Horizon *
            </label>
            <select
              value={reportDateRange}
              onChange={(e) => setReportDateRange(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Month">This Month</option>
              <option value="Last 90 Days">Last 90 Days</option>
              <option value="This Year">This Year</option>
            </select>
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              Filter Category
            </label>
            <select
              value={reportCategory}
              onChange={(e) => setReportCategory(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Parfum Extrait">Parfum Extrait</option>
              <option value="Skincare">Skincare</option>
              <option value="Hampers">Hampers</option>
              <option value="Combos">Combos</option>
            </select>
          </div>

          <div className="md:col-span-3 flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-xl py-2.5 hover:bg-tertiary-container transition-colors"
            >
              GENERATE REPORT
            </button>
          </div>
        </form>
      </div>

      {/* Generated Report Output */}
      {generated && (
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
            <div>
              <span className="font-label-caps text-[0.625rem] text-secondary font-bold uppercase block mb-0.5">
                GENERATED STATEMENT • {new Date().toLocaleDateString('en-IN')}
              </span>
              <h2 className="font-display text-2xl text-primary font-medium">{reportType}</h2>
              <span className="font-body text-xs text-outline">{reportDateRange} • Category: {reportCategory}</span>
            </div>

            <button
              onClick={handleExportCsv}
              className="bg-secondary text-on-secondary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-2 hover:bg-primary transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>EXPORT REPORT CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div className="bg-surface-container-low p-space-md border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] text-outline font-bold uppercase block">Gross Sales</span>
              <span className="font-display text-2xl text-primary font-bold">₹4,82,450</span>
            </div>
            <div className="bg-surface-container-low p-space-md border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] text-outline font-bold uppercase block">Completed Dispatches</span>
              <span className="font-display text-2xl text-primary font-bold">12 Orders</span>
            </div>
            <div className="bg-surface-container-low p-space-md border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] text-outline font-bold uppercase block">Net Yield</span>
              <span className="font-display text-2xl text-primary font-bold">₹4,25,950</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminReportsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <ReportsContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
