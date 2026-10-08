'use client';

import React from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function MediaLibraryContent() {
  const { showToast } = useAdmin();

  const mediaAssets = [
    { title: 'Silk Rose Flacon Banner', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop', type: 'Hero Image' },
    { title: 'Kashmiri Saffron Flower Harvest', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop', type: 'Ingredient Monograph' },
    { title: 'Deg-Bapka Still Kannauj', url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop', type: 'Craft Story' },
  ];

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Asset URL copied to clipboard', 'info');
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            ASSET MANAGEMENT
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Media & Editorial Gallery
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter-desktop">
        {mediaAssets.map((asset, idx) => (
          <div key={idx} className="bg-surface-container-lowest p-3 border border-surface-container-high space-y-2">
            <img src={asset.url} alt={asset.title} className="w-full h-40 object-cover border border-surface-container-high" />
            <span className="font-display text-sm text-primary font-medium block truncate">{asset.title}</span>
            <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block">{asset.type}</span>
            <button
              onClick={() => handleCopyUrl(asset.url)}
              className="w-full bg-surface-container-low border border-surface-container-high font-label-caps text-xs uppercase tracking-wider py-1.5 hover:bg-primary hover:text-on-primary transition-colors"
            >
              COPY IMAGE URL
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminMediaPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <MediaLibraryContent />
      </AdminLayout>
    </AdminProvider>
  );
}
