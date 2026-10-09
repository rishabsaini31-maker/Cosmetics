'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminProducts, updateAdminProduct, deleteAdminProduct } from '@/services/adminApi';
import ImageUploadInput from '@/components/ImageUploadInput';

function ProductEditContent() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useAdmin();
  const productId = (params?.id as string) || '';

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchAdminProducts().then((res) => {
      if (res.success && Array.isArray(res.data)) {
        const found = res.data.find((p: any) => p.id === productId);
        if (found) {
          setProduct(found);
        }
      }
      setLoading(false);
    });
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);
    const res = await updateAdminProduct(productId, product);
    setLoading(false);

    if (res.success) {
      showToast(`Product "${product.name}" updated successfully!`, 'success');
      router.push('/products');
    } else {
      showToast(res.message || 'Update failed', 'error');
    }
  };

  const handleDelete = async () => {
    if (!product || !confirm(`Delete product "${product.name}" from catalog?`)) return;
    const res = await deleteAdminProduct(productId);
    if (res.success) {
      showToast(`Product deleted.`, 'info');
      router.push('/products');
    } else {
      showToast(res.message || 'Deletion failed', 'error');
    }
  };

  if (loading || !product) {
    return (
      <div className="py-space-3xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
        Loading Product Profile...
      </div>
    );
  }

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-primary font-semibold">{product.name}</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            Edit Catalog Product
          </h1>
        </div>

        <button
          onClick={handleDelete}
          className="font-label-caps text-xs text-error uppercase border border-error/30 px-3 py-1.5 hover:bg-error/10 transition-colors"
        >
          DELETE PRODUCT
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-space-2xl">
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Catalog Metadata & Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Product Name</label>
              <input
                type="text"
                required
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Tagline</label>
              <input
                type="text"
                value={product.tagline}
                onChange={(e) => setProduct({ ...product, tagline: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Category</label>
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
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
                value={product.sku || ''}
                onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Selling Price (₹)</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Original Price (₹)</label>
              <input
                type="number"
                value={product.originalPrice || product.price}
                onChange={(e) => setProduct({ ...product, originalPrice: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Current Stock Level</label>
              <input
                type="number"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Product Badge</label>
              <input
                type="text"
                value={product.badge || ''}
                onChange={(e) => setProduct({ ...product, badge: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs text-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Media & Formulations */}
        <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
          <h2 className="font-display text-xl text-primary font-medium border-b border-surface-container-high pb-2">
            Media & Descriptions
          </h2>

          <div className="space-y-space-md">
            <ImageUploadInput
              label="Product Image"
              value={product.image || ''}
              onChange={(url) => setProduct({ ...product, image: url })}
              placeholder="Paste image URL or click Upload Image..."
            />

            <div>
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">Description</label>
              <textarea
                rows={3}
                value={product.description || ''}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container-high p-3 font-editorial-serif text-xs text-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-space-md border-t border-surface-container-high">
          <Link
            href="/products"
            className="bg-surface-container-lowest text-primary border border-surface-container-high font-label-caps text-xs uppercase tracking-wider px-space-xl py-3 hover:border-primary transition-colors"
          >
            Back to Products
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminEditProductPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <ProductEditContent />
      </AdminLayout>
    </AdminProvider>
  );
}
