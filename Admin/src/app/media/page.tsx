'use client';

import React, { useState } from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import ImageUploadInput from '@/components/ImageUploadInput';

function MediaLibraryContent() {
  const { showToast } = useAdmin();

  const [mediaAssets, setMediaAssets] = useState([
    { title: 'Silk Rose Flacon Banner', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop', type: 'Hero Image' },
    { title: 'Kashmiri Saffron Flower Harvest', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop', type: 'Ingredient Monograph' },
    { title: 'Deg-Bapka Still Kannauj', url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop', type: 'Craft Story' },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Hero Image');
  const [newUrl, setNewUrl] = useState('');

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) {
      showToast('Please select or paste an image URL.', 'error');
      return;
    }
    const asset = {
      title: newTitle || 'Uploaded Asset',
      url: newUrl,
      type: newType,
    };
    setMediaAssets([asset, ...mediaAssets]);
    setNewTitle('');
    setNewUrl('');
    showToast('New media asset added to gallery!', 'success');
  };

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

      {/* Upload New Asset Section */}
      <form onSubmit={handleAddMedia} className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
        <h2 className="font-display text-lg text-primary font-medium border-b border-surface-container-high pb-2">
          Upload New Asset
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Asset Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Royal Attar Packaging Close-up"
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Asset Type</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
            >
              <option value="Hero Image">Hero Image</option>
              <option value="Ingredient Monograph">Ingredient Monograph</option>
              <option value="Craft Story">Craft Story</option>
              <option value="Product Showcase">Product Showcase</option>
              <option value="Editorial Banner">Editorial Banner</option>
            </select>
          </div>
        </div>

        <ImageUploadInput
          label="Select or Paste Media File"
          value={newUrl}
          onChange={(url) => setNewUrl(url)}
          placeholder="Upload image file from device or paste image URL..."
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-2.5 hover:bg-tertiary-container transition-colors"
          >
            ADD TO GALLERY
          </button>
        </div>
      </form>

      {/* Gallery Grid */}
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
