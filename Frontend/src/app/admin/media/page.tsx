'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function MediaContent() {
  const assets = [
    { name: 'Flacon Extrait Noir 01', url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop', type: 'Product Asset' },
    { name: 'Saffron Salve Lipid', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop', type: 'Product Asset' },
    { name: 'Jasmine Cream Jar', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop', type: 'Product Asset' },
    { name: 'Royal Heritage Keepsake', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop', type: 'Editorial Asset' },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            ASSET VAULT
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Media Library
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {assets.map((asset, i) => (
          <div key={i} className="bg-surface-container-lowest p-3 border border-surface-container-high space-y-2">
            <div className="aspect-[4/3] bg-surface-container overflow-hidden border border-surface-container-high">
              <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-sm font-medium text-primary block truncate">{asset.name}</span>
            <span className="font-label-caps text-[0.625rem] text-secondary font-bold uppercase block">{asset.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminMediaPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <MediaContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
