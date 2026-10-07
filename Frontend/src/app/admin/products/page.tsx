'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminProducts, deleteAdminProduct } from '@/services/adminApi';

function ProductsContent() {
  const { showToast } = useAdmin();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = [
    'All',
    'Parfum Extrait',
    'Botanical Mist',
    'Skincare',
    'Body Nectars',
    'Archival Sets',
    'Hampers',
    'Combos',
  ];

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
    if (!window.confirm(`Are you sure you want to delete "${name}" from the catalog?`)) return;
    const res = await deleteAdminProduct(id);
    if (res.success) {
      showToast(`Deleted ${name}`, 'info');
      loadProducts();
    } else {
      showToast(res.message || 'Delete failed', 'error');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' ? true : p.category === selectedCategory;
    const matchesSearch = search.trim() === '' ? true : p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-space-xl">
      {/* Header & New Product Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            CATALOG ARCHITECTURE
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Products Directory
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-2.5 hover:bg-tertiary-container transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>ADD NEW PRODUCT</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-surface-container-lowest p-space-md border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        
        <div className="flex items-center bg-surface-container-low border border-surface-container-high px-3 py-1.5 flex-1 max-w-md">
          <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="bg-transparent font-body text-xs text-on-surface focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 font-label-caps text-xs uppercase tracking-wider">
          <span className="text-outline">CATEGORY:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-surface-container-low border border-surface-container-high px-3 py-1.5 text-primary focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Product Table */}
      <div className="bg-surface-container-lowest border border-surface-container-high overflow-x-auto">
        {loading ? (
          <div className="p-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading products catalog...
          </div>
        ) : filteredProducts.length > 0 ? (
          <table className="w-full text-left font-body text-xs border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
                <th className="p-3">Product</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover border border-surface-container-high flex-shrink-0" />
                      <div>
                        <span className="font-display text-sm text-primary font-medium block">{p.name}</span>
                        <span className="font-body text-[0.6875rem] text-outline line-clamp-1">{p.tagline}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-outline">{p.sku || `VNY-${p.id}`}</td>
                  <td className="p-3">
                    <span className="font-label-caps text-[0.625rem] uppercase tracking-wider bg-surface-container px-2 py-0.5 border border-surface-container-high">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-medium text-primary">{p.formattedPrice || `₹${p.price}`}</td>
                  <td className="p-3 font-mono">
                    <span className={p.stock <= 5 ? 'text-error font-bold' : 'text-primary'}>
                      {p.stock ?? 15} units
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider font-bold ${
                      p.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-surface-container text-outline'
                    }`}>
                      {p.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap space-x-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="font-label-caps text-xs uppercase tracking-wider text-error font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-space-3xl text-center">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              NO PRODUCTS FOUND
            </span>
            <p className="font-editorial-serif text-sm text-on-surface-variant max-w-md mx-auto">
              No products match the selected category or search filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <ProductsContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
