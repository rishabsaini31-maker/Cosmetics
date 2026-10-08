'use client';

import React from 'react';
import Link from 'next/link';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function HampersContent() {
  const hampers = [
    { id: 'h-1', name: 'The Royal Velvet Gifting Hamper', category: 'Beauty + Fragrance', price: 12500, stock: 15, items: '100ml Silk Rose EDP, Botanical Face Elixir, Kannauj Attar' },
    { id: 'h-2', name: 'Artisanal Harvest Celebration Box', category: 'Fragrance', price: 9800, stock: 20, items: 'Mysore Sandalwood EDP, Saffron Distillation Mist' },
    { id: 'h-3', name: 'Grand Botanical Pamper Trunk', category: 'Beauty Essentials', price: 16500, stock: 8, items: 'Complete Skincare Line, Solid Perfume Brass Locket' },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            CURATED GIFTING
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Luxury Hampers & Bespoke Boxes
          </h1>
        </div>

        <Link href="/products/new" className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-4 py-2 hover:bg-tertiary-container transition-colors">
          + CREATE HAMPER
        </Link>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-body text-xs">
            <thead>
              <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                <th className="py-3 px-3">Hamper Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Bundled Contents</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Available Trunks</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hampers.map((h) => (
                <tr key={h.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3 font-display text-sm font-medium text-primary">{h.name}</td>
                  <td className="py-3 px-3 font-label-caps text-[0.6875rem] uppercase text-secondary">{h.category}</td>
                  <td className="py-3 px-3 font-body text-on-surface-variant max-w-xs">{h.items}</td>
                  <td className="py-3 px-3 font-mono font-bold text-primary">₹{h.price.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 font-mono">{h.stock} units</td>
                  <td className="py-3 px-3 text-right">
                    <Link href="/products" className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
                      Manage →
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

export default function AdminHampersPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <HampersContent />
      </AdminLayout>
    </AdminProvider>
  );
}
