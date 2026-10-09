'use client';

import React, { useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import ImageUploadInput from '@/components/ImageUploadInput';

function MediaContent() {
  const { showToast } = useAdmin();

  const [assets, setAssets] = useState([
    { name: 'Flacon Extrait Noir 01', url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop', type: 'Product Asset' },
    { name: 'Saffron Salve Lipid', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop', type: 'Product Asset' },
    { name: 'Jasmine Cream Jar', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop', type: 'Product Asset' },
    { name: 'Royal Heritage Keepsake', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop', type: 'Editorial Asset' },
  ]);

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Product Asset');
  const [newUrl, setNewUrl] = useState('');

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) {
      showToast('Please select or paste an image URL.', 'error');
      return;
    }
    setAssets([{ name: newName || 'Uploaded Asset', url: newUrl, type: newType }, ...assets]);
    setNewName('');
    setNewUrl('');
    showToast('New media asset added to library', 'success');
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
            ASSET VAULT
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Media Library
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
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Asset Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Royal Jasmine Bottle Shot"
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Asset Category</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
            >
              <option value="Product Asset">Product Asset</option>
              <option value="Editorial Asset">Editorial Asset</option>
              <option value="Banner Image">Banner Image</option>
              <option value="Ingredient Monograph">Ingredient Monograph</option>
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
            ADD TO LIBRARY
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {assets.map((asset, i) => (
          <div key={i} className="bg-surface-container-lowest p-3 border border-surface-container-high space-y-2">
            <div className="aspect-[4/3] bg-surface-container overflow-hidden border border-surface-container-high">
              <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-sm font-medium text-primary block truncate">{asset.name}</span>
            <span className="font-label-caps text-[0.625rem] text-secondary font-bold uppercase block">{asset.type}</span>
            <button
              type="button"
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
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <MediaContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
