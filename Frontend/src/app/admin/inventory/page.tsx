'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminInventory, updateAdminInventory } from '@/services/adminApi';

function InventoryContent() {
  const { showToast } = useAdmin();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadInventory = async () => {
    setLoading(true);
    const res = await fetchAdminInventory();
    if (res.success) {
      setItems(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleStockUpdate = async (id: string, newStock: number, name: string) => {
    const res = await updateAdminInventory(id, newStock);
    if (res.success) {
      showToast(`Updated stock for ${name} to ${newStock} units`, 'success');
      loadInventory();
    } else {
      showToast(res.message || 'Stock update failed', 'error');
    }
  };

  const filteredItems = items.filter((i) =>
    search.trim() === ''
      ? true
      : i.name.toLowerCase().includes(search.toLowerCase()) || i.sku?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-space-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            STOCK CONTROL
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Inventory Management
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="bg-surface-container-lowest p-space-md border border-surface-container-high flex items-center bg-surface-container-low max-w-md">
        <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter inventory by product name or SKU..."
          className="bg-transparent font-body text-xs text-on-surface focus:outline-none w-full"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-surface-container-lowest border border-surface-container-high overflow-x-auto">
        {loading ? (
          <div className="p-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading stock levels...
          </div>
        ) : filteredItems.length > 0 ? (
          <table className="w-full text-left font-body text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
                <th className="p-3">Product</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Available Stock</th>
                <th className="p-3">Low Stock Threshold</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 font-display text-sm font-medium text-primary">{item.name}</td>
                  <td className="p-3 font-mono text-outline">{item.sku}</td>
                  <td className="p-3 font-label-caps text-[0.625rem] text-secondary uppercase">{item.category}</td>
                  <td className="p-3 font-mono font-bold text-primary">{item.stock} units</td>
                  <td className="p-3 font-mono text-outline">{item.lowStockThreshold || 5} units</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider font-bold ${
                      item.status === 'OUT OF STOCK'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : item.status === 'LOW STOCK'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleStockUpdate(item.id, Math.max(0, item.stock - 5), item.name)}
                        className="px-2 py-1 bg-surface-container-low border border-surface-container-high text-xs font-mono font-bold hover:bg-surface-container"
                        title="Reduce by 5"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => handleStockUpdate(item.id, Math.max(0, item.stock - 1), item.name)}
                        className="px-2 py-1 bg-surface-container-low border border-surface-container-high text-xs font-mono font-bold hover:bg-surface-container"
                        title="Reduce by 1"
                      >
                        -1
                      </button>
                      <input
                        type="number"
                        defaultValue={item.stock}
                        onBlur={(e) => handleStockUpdate(item.id, Number(e.target.value), item.name)}
                        className="w-16 px-2 py-1 bg-surface-container-lowest border border-surface-container-high text-center font-mono text-xs focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => handleStockUpdate(item.id, item.stock + 1, item.name)}
                        className="px-2 py-1 bg-surface-container-low border border-surface-container-high text-xs font-mono font-bold hover:bg-surface-container"
                        title="Add 1"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => handleStockUpdate(item.id, item.stock + 10, item.name)}
                        className="px-2 py-1 bg-surface-container-low border border-surface-container-high text-xs font-mono font-bold hover:bg-surface-container"
                        title="Add 10"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-space-3xl text-center">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              NO INVENTORY RECORDS
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminInventoryPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <InventoryContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
