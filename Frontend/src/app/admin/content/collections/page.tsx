'use client';

import React from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function CollectionsContent() {
  const collections = [
    { name: 'Parfum Extrait', count: 4, slug: 'parfum-extrait' },
    { name: 'Botanical Mists', count: 3, slug: 'botanical-mists' },
    { name: 'Skincare & Lipids', count: 5, slug: 'skincare' },
    { name: 'Hampers & Gifting', count: 2, slug: 'hampers' },
    { name: 'Combos & Duos', count: 2, slug: 'combos' },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            CATALOG GROUPING
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Collections & Badges Manager
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {collections.map((c, i) => (
          <div key={i} className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
            <h2 className="font-display text-lg text-primary font-medium mb-1">{c.name}</h2>
            <span className="font-mono text-xs text-outline block mb-3">{c.count} items in collection</span>
            <Link href="/admin/products" className="font-label-caps text-[0.6875rem] text-secondary font-bold uppercase hover:underline">
              Manage Products →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminCollectionsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <CollectionsContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
