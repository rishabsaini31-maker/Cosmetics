'use client';

import React from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function CombosContent() {
  const combos = [
    {
      id: 'comb-01',
      name: 'Signature Olfactory & Lip Care Duo',
      price: '₹7,450',
      originalPrice: '₹8,250',
      savings: 'Save ₹800',
      included: ['NOIR 01 Eau de Parfum (50ml)', 'Saffron Lip Salve (15g)'],
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'comb-02',
      name: 'Botanical Moisture & Dew Ritual',
      price: '₹4,950',
      originalPrice: '₹5,650',
      savings: 'Save ₹700',
      included: ['Madurai Jasmine Cream (50g)', 'Rose Water Hydro-Mist (100ml)'],
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            RITUAL PAIRINGS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Signature Combos Manager
          </h1>
        </div>

        <Link href="/admin/products/new" className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-4 py-2 hover:bg-tertiary-container transition-colors">
          + CREATE NEW COMBO
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
        {combos.map((c) => (
          <div key={c.id} className="bg-surface-container-lowest p-space-lg border border-surface-container-high flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-surface-container mb-3 border border-surface-container-high">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-start mb-1">
                <h2 className="font-display text-xl text-primary font-medium">{c.name}</h2>
                <div className="text-right">
                  <span className="font-mono text-base font-bold text-primary block">{c.price}</span>
                  <span className="font-mono text-xs text-outline line-through">{c.originalPrice}</span>
                </div>
              </div>
              <span className="inline-block bg-secondary-container/50 text-on-secondary-container font-label-caps text-[0.625rem] uppercase tracking-wider font-bold px-2 py-0.5 mb-3">
                {c.savings}
              </span>
              <span className="font-label-caps text-[0.625rem] text-secondary font-bold uppercase block mb-1">INCLUDED PAIRING:</span>
              <ul className="list-disc list-inside font-body text-xs text-on-surface-variant space-y-1 mb-4">
                {c.included.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-surface-container-high flex justify-end">
              <Link href={`/admin/products/new`} className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold hover:underline">
                Edit Combo →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminCombosPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <CombosContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
