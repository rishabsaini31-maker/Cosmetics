'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminProducts, createAdminProduct, updateAdminProduct } from '@/services/adminApi';
import ImageUploadInput from '@/components/ImageUploadInput';

function ProductEditorContent() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useAdmin();
  const productId = params?.id as string;
  const isNew = !productId || productId === 'new';

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: 'Parfum Extrait',
    subCategory: '',
    price: 0,
    sku: '',
    stock: 15,
    lowStockThreshold: 5,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    sillage: 'Moderate',
    longevity: '8-10 Hours',
    description: '',
    craftDetails: '',
    topNotes: '',
    heartNotes: '',
    baseNotes: '',
    ingredientsStr: '',
    volumesStr: '50 ml / 1.7 fl. oz.',
  });

  useEffect(() => {
    if (!isNew && productId) {
      setLoading(true);
      fetchAdminProducts().then((res) => {
        if (res.success) {
          const found = res.data.find((p: any) => p.id === productId);
          if (found) {
            setFormData({
              name: found.name || '',
              tagline: found.tagline || '',
              category: found.category || 'Parfum Extrait',
              subCategory: found.subCategory || '',
              price: found.price || 0,
              sku: found.sku || '',
              stock: found.stock ?? 15,
              lowStockThreshold: found.lowStockThreshold ?? 5,
              status: found.status || 'Active',
              image: found.image || '',
              sillage: found.sillage || 'Moderate',
              longevity: found.longevity || '8-10 Hours',
              description: found.description || '',
              craftDetails: found.craftDetails || '',
              topNotes: Array.isArray(found.notes?.top) ? found.notes.top.join(', ') : '',
              heartNotes: Array.isArray(found.notes?.heart) ? found.notes.heart.join(', ') : '',
              baseNotes: Array.isArray(found.notes?.base) ? found.notes.base.join(', ') : '',
              ingredientsStr: Array.isArray(found.ingredients) ? found.ingredients.join(', ') : '',
              volumesStr: Array.isArray(found.volume) ? found.volume.join(', ') : '50 ml',
            });
          }
        }
        setLoading(false);
      });
    }
  }, [productId, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      tagline: formData.tagline,
      category: formData.category,
      subCategory: formData.subCategory,
      price: Number(formData.price),
      sku: formData.sku,
      stock: Number(formData.stock),
      lowStockThreshold: Number(formData.lowStockThreshold),
      status: formData.status,
      image: formData.image,
      sillage: formData.sillage,
      longevity: formData.longevity,
      description: formData.description,
      craftDetails: formData.craftDetails,
      notes: {
        top: formData.topNotes.split(',').map((s) => s.trim()).filter(Boolean),
        heart: formData.heartNotes.split(',').map((s) => s.trim()).filter(Boolean),
        base: formData.baseNotes.split(',').map((s) => s.trim()).filter(Boolean),
      },
      ingredients: formData.ingredientsStr.split(',').map((s) => s.trim()).filter(Boolean),
      volume: formData.volumesStr.split(',').map((s) => s.trim()).filter(Boolean),
    };

    let res;
    if (isNew) {
      res = await createAdminProduct(payload);
    } else {
      res = await updateAdminProduct(productId, payload);
    }

    setLoading(false);

    if (res.success) {
      showToast(isNew ? 'Product created successfully' : 'Product updated successfully', 'success');
      router.push('/admin/products');
    } else {
      showToast(res.message || 'Saving product failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/admin/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-primary font-semibold">{isNew ? 'New Product' : formData.name}</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            {isNew ? 'Create New Catalog Product' : `Edit: ${formData.name}`}
          </h1>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="space-y-space-2xl">
        
        {/* Section 1: Basic Information */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            1. Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. NOIR 01 Eau de Parfum"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Smoked Oudh, Wild Bergamot & Teak Resin"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Primary Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
              >
                <option value="Parfum Extrait">Parfum Extrait</option>
                <option value="Botanical Mist">Botanical Mist</option>
                <option value="Skincare">Skincare</option>
                <option value="Body Nectars">Body Nectars</option>
                <option value="Archival Sets">Archival Sets</option>
                <option value="Hampers">Hampers</option>
                <option value="Combos">Combos</option>
              </select>
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Sub-Category
              </label>
              <input
                type="text"
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                placeholder="e.g. Facial Lipid / Lip Salve"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              Editorial Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe product sensory notes, mood, and formulation elegance..."
              className="w-full bg-surface-container-low border border-surface-container-high p-3 font-editorial-serif text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              Craft & Production Process
            </label>
            <textarea
              rows={2}
              value={formData.craftDetails}
              onChange={(e) => setFormData({ ...formData, craftDetails: e.target.value })}
              placeholder="e.g. Hand-distilled in traditional copper degs over wood fires..."
              className="w-full bg-surface-container-low border border-surface-container-high p-3 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Section 2: Pricing & Inventory */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            2. Pricing & Inventory Control
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Price (INR ₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                SKU Identifier
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="VNY-PARF-01"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Current Stock *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Media & Olfactory Notes */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            3. Media & Olfactory Structure
          </h2>

          <ImageUploadInput
            label="Primary Product Image"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            placeholder="Paste product image URL or click Upload Image..."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Top Notes (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.topNotes}
                onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                placeholder="Wild Bergamot, Cardamom"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Heart Notes (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.heartNotes}
                onChange={(e) => setFormData({ ...formData, heartNotes: e.target.value })}
                placeholder="Mysore Sandalwood, Jasmine"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Base Notes (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.baseNotes}
                onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                placeholder="Smoked Oudh, Teak Resin"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
              INCI Ingredients (Comma Separated)
            </label>
            <input
              type="text"
              value={formData.ingredientsStr}
              onChange={(e) => setFormData({ ...formData, ingredientsStr: e.target.value })}
              placeholder="Alcohol Denat., Parfum, Aqua, Santalum Album Oil"
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-on-surface focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-space-md pt-space-md border-t border-surface-container-high">
          <Link
            href="/admin/products"
            className="bg-surface-container-lowest text-on-surface border border-surface-container-high font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-3 hover:border-primary transition-colors"
          >
            CANCEL
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
          >
            {loading ? 'SAVING PRODUCT...' : isNew ? 'PUBLISH PRODUCT' : 'UPDATE PRODUCT'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default function ProductEditorPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <ProductEditorContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
