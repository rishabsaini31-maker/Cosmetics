'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminProducts, deleteAdminProduct } from '@/services/adminApi';

function ProductsListContent() {
  const { showToast } = useAdmin();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadProducts = async () => {
    setLoading(true);
    const res = await fetchAdminProducts();
    if (res.success) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the store catalog?`)) return;
    const res = await deleteAdminProduct(id);
    if (res.success) {
      showToast(`Product "${name}" deleted.`, 'info');
      loadProducts();
    } else {
      showToast(res.message || 'Deletion failed', 'error');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = !selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            CATALOG DIRECTORY
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Products & Botanical Formulations
          </h1>
        </div>

        <div>
          <Link
            href="/products/new"
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-lg py-3 hover:bg-tertiary-container transition-colors inline-block"
          >
            + ADD NEW PRODUCT
          </Link>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-space-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">
              CATEGORY FILTER
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
            >
              <option value="">All Fragrance & Beauty Categories</option>
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
            <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">
              SEARCH PRODUCTS / SKU
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name or SKU..."
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading Catalog Directory...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body text-xs">
              <thead>
                <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">SKU</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Stock</th>
                  <th className="py-3 px-3">Badge</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover border border-surface-container-high flex-shrink-0" />
                          <div>
                            <Link href={`/products/${product.id}`} className="font-display text-sm font-medium text-primary hover:underline block">
                              {product.name}
                            </Link>
                            <span className="font-body text-[0.6875rem] text-on-surface-variant line-clamp-1">{product.tagline}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary font-bold">
                        {product.category}
                      </td>
                      <td className="py-3 px-3 font-mono text-outline">{product.sku || 'N/A'}</td>
                      <td className="py-3 px-3 font-mono font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3">
                        <span className={`font-mono text-xs font-bold ${product.stock <= 5 ? 'text-red-700' : 'text-primary'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {product.badge ? (
                          <span className="bg-surface-container px-2 py-0.5 border border-surface-container-high font-label-caps text-[0.6rem] uppercase tracking-wider font-bold text-secondary">
                            {product.badge}
                          </span>
                        ) : (
                          <span className="text-outline text-[0.65rem]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link href={`/products/${product.id}`} className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="font-label-caps text-xs text-error uppercase hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-space-xl text-center font-editorial-serif text-sm text-on-surface-variant">
                      No products found matching the category or search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <ProductsListContent />
      </AdminLayout>
    </AdminProvider>
  );
}
