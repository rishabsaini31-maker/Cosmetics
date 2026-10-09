'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminContent, updateAdminContent } from '@/services/adminApi';
import ImageUploadInput from '@/components/ImageUploadInput';

function CollectionsEditorContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<any[]>([
    { title: 'The Royal Attar Reserve', slug: 'royal-attar', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop', count: '6 Fragrances' },
    { title: 'Kashmiri Saffron Skincare', slug: 'kashmiri-saffron', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop', count: '4 Formulations' },
    { title: 'Harvest Gifting Trunks', slug: 'harvest-gifting', image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=800&auto=format&fit=crop', count: '8 Hampers' },
  ]);

  useEffect(() => {
    fetchAdminContent().then((res) => {
      if (res.success && Array.isArray(res.data?.collections)) {
        setCollections(res.data.collections);
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateAdminContent({ collections });
    setLoading(false);

    if (res.success) {
      showToast('Collections updated successfully!', 'success');
    } else {
      showToast(res.message || 'Saving failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/content" className="hover:text-primary">Content</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Collections</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Featured Storefront Collections
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-space-2xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Collections Directory
          </h2>

          <div className="space-y-space-md">
            {collections.map((col, idx) => (
              <div key={idx} className="p-space-md bg-surface-container-low border border-surface-container-high space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Collection Title</label>
                    <input
                      type="text"
                      value={col.title}
                      onChange={(e) => {
                        const copy = [...collections];
                        copy[idx].title = e.target.value;
                        setCollections(copy);
                      }}
                      className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={col.slug}
                      onChange={(e) => {
                        const copy = [...collections];
                        copy[idx].slug = e.target.value;
                        setCollections(copy);
                      }}
                      className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Item Count Badge</label>
                    <input
                      type="text"
                      value={col.count}
                      onChange={(e) => {
                        const copy = [...collections];
                        copy[idx].count = e.target.value;
                        setCollections(copy);
                      }}
                      className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <ImageUploadInput
                  label="Collection Banner Image"
                  value={col.image || ''}
                  onChange={(url) => {
                    const copy = [...collections];
                    copy[idx].image = url;
                    setCollections(copy);
                  }}
                  placeholder="Paste collection image URL or click Upload Image..."
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-space-md border-t border-surface-container-high">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
          >
            SAVE COLLECTIONS
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminCollectionsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <CollectionsEditorContent />
      </AdminLayout>
    </AdminProvider>
  );
}
