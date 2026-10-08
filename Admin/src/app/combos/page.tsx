'use client';

import React from 'react';
import Link from 'next/link';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function CombosContent() {
  const combos = [
    { id: 'c-1', name: 'Velvet Rose EDP + Kumkumadi Night Elixir', category: 'Fragrance + Skincare', price: 6800, savings: '₹1,200 Off' },
    { id: 'c-2', name: 'Sandalwood Pure Attar + Saffron Cream', category: 'Ritual Set', price: 5400, savings: '₹900 Off' },
    { id: 'c-3', name: 'Kashmiri Mogra Mist + Hydra Dew Gel', category: 'Hydration Ritual', price: 4200, savings: '₹700 Off' },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            SIGNATURE COMBINATIONS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Combos & Ritual Sets
          </h1>
        </div>

        <Link href="/products/new" className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-4 py-2 hover:bg-tertiary-container transition-colors">
          + BUILD COMBO SET
        </Link>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-body text-xs">
            <thead>
              <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                <th className="py-3 px-3">Combo Name</th>
                <th className="py-3 px-3">Category Pair</th>
                <th className="py-3 px-3">Bundle Savings</th>
                <th className="py-3 px-3">Combo Price</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {combos.map((c) => (
                <tr key={c.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3 font-display text-sm font-medium text-primary">{c.name}</td>
                  <td className="py-3 px-3 font-label-caps text-[0.6875rem] uppercase text-secondary">{c.category}</td>
                  <td className="py-3 px-3 font-mono text-emerald-700 font-bold">{c.savings}</td>
                  <td className="py-3 px-3 font-mono font-bold text-primary">₹{c.price.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-right">
                    <Link href="/products" className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function AdminCombosPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <CombosContent />
      </AdminLayout>
    </AdminProvider>
  );
}
