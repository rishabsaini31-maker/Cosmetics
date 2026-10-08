'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminInventory, updateAdminInventory } from '@/services/adminApi';

function InventoryContent() {
  const { showToast } = useAdmin();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleStockUpdate = async (id: string, newStock: number) => {
    const res = await updateAdminInventory(id, Math.max(0, newStock));
    if (res.success) {
      showToast(`Stock level updated`, 'success');
      loadInventory();
    } else {
      showToast(res.message || 'Update failed', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            WAREHOUSE OPERATIONS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Inventory & Stock Threshold Control
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-space-md">
        {loading ? (
          <div className="py-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Auditing Warehouse Stock...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body text-xs">
              <thead>
                <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                  <th className="py-3 px-3">Product Name</th>
                  <th className="py-3 px-3">SKU</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Current Stock</th>
                  <th className="py-3 px-3">Stock Status</th>
                  <th className="py-3 px-3 text-right">Quick Adjust</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-3 font-display font-medium text-primary text-sm">{item.name}</td>
                    <td className="py-3 px-3 font-mono text-outline">{item.sku}</td>
                    <td className="py-3 px-3 font-label-caps text-[0.6875rem] uppercase text-secondary">{item.category}</td>
                    <td className="py-3 px-3 font-mono font-bold text-primary">{item.stock} units</td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider font-bold border ${
                        item.status === 'IN STOCK'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : item.status === 'LOW STOCK'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-red-50 text-red-800 border-red-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleStockUpdate(item.id, item.stock - 5)}
                          className="px-2 py-1 bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary font-mono text-xs"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleStockUpdate(item.id, item.stock + 5)}
                          className="px-2 py-1 bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary font-mono text-xs"
                        >
                          +5
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminInventoryPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <InventoryContent />
      </AdminLayout>
    </AdminProvider>
  );
}
