'use client';

import React from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function HampersContent() {
  const hampers = [
    {
      id: 'hamp-01',
      name: 'Royal Heritage Hamper',
      price: '₹12,500',
      included: ['NOIR 01 Extrait', 'Madurai Jasmine Cream', 'Rose Water Hydro-Mist', 'Custom Brass Diya'],
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'hamp-02',
      name: 'Atelier Botanical Keepsake Box',
      price: '₹8,900',
      included: ['Saffron Lip Salve', 'Vetiver & Smoked Oudh Extrait', 'Terracotta Flacon Coaster'],
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            GIFTING CURATION
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Luxury Hampers Manager
          </h1>
        </div>

        <Link href="/admin/products/new" className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-4 py-2 hover:bg-tertiary-container transition-colors">
          + CREATE NEW HAMPER
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
        {hampers.map((h) => (
          <div key={h.id} className="bg-surface-container-lowest p-space-lg border border-surface-container-high flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-surface-container mb-3 border border-surface-container-high">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-display text-xl text-primary font-medium">{h.name}</h2>
                <span className="font-mono text-base font-bold text-primary">{h.price}</span>
              </div>
              <span className="font-label-caps text-[0.625rem] text-secondary font-bold uppercase block mb-2">INCLUDED ITEMS:</span>
              <ul className="list-disc list-inside font-body text-xs text-on-surface-variant space-y-1 mb-4">
                {h.included.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-surface-container-high flex justify-between items-center">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 font-bold">
                {h.status}
              </span>
              <Link href={`/admin/products/new`} className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold hover:underline">
                Edit Hamper →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminHampersPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <HampersContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
