'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { createAdminProduct } from '@/services/adminApi';
import ImageUploadInput from '@/components/ImageUploadInput';

function NewProductContent() {
  const router = useRouter();
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: 'Fragrance',
    price: 3500,
    originalPrice: 4200,
    rating: 4.9,
    reviewsCount: 12,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    sku: `VNY-${Math.floor(100 + Math.random() * 900)}`,
    stock: 25,
    lowStockThreshold: 5,
    description: '',
    ingredients: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Product name is required.', 'error');
      return;
    }

    setLoading(true);
    const res = await createAdminProduct(formData);
    setLoading(false);

    if (res.success) {
      showToast(`Product "${formData.name}" created successfully!`, 'success');
      router.push('/products');
    } else {
      showToast(res.message || 'Product creation failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-primary font-semibold">New Entry</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Create Catalog Item
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-space-2xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Basic Details & Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Royal Jasmine & Kashmiri Saffron EDP"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Tagline / Sub-headline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Rare botanical hydro-distillation flacon"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
              >
                <option value="Fragrance">Fragrance / Perfume</option>
                <option value="Skincare">Skincare</option>
                <option value="Makeup">Makeup</option>
                <option value="Body Care">Body Care</option>
                <option value="Beauty Essentials">Beauty Essentials</option>
                <option value="Hampers">Hampers</option>
                <option value="Combos">Combos</option>
              </select>
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">SKU Code</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Selling Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Original Price / MRP (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Current Stock Level</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Product Badge</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Bestseller, Harvest Special, New"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs text-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Media & Botanical Description */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Media & Formulations
          </h2>

          <div className="space-y-space-md">
            <ImageUploadInput
              label="Primary Product Image"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              placeholder="Paste product image URL or click Upload Image..."
            />

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Editorial Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe olfactory notes, ritual usage and formulation philosophy..."
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-editorial-serif text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">INCI Botanical Ingredients</label>
              <textarea
                rows={2}
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                placeholder="e.g. Santalum Album Oil, Rosa Damascena Flower Extract, Crocus Sativus Stigma Extract..."
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-body text-xs text-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-space-md border-t border-surface-container-high">
          <Link
            href="/products"
            className="bg-surface-container-lowest text-primary border border-surface-container-high font-label-caps text-xs uppercase tracking-wider px-space-xl py-3 hover:border-primary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
          >
            PUBLISH PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminNewProductPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <NewProductContent />
      </AdminLayout>
    </AdminProvider>
  );
}
