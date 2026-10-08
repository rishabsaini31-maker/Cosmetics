'use client';

import React, { useState, useEffect } from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminCustomers } from '@/services/adminApi';

function CustomersContent() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminCustomers().then((res) => {
      if (res.success) {
        setCustomers(res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            PATRON DIRECTORY
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Customer Monographs & Loyalty Tier
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
        {loading ? (
          <div className="py-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading Patron Monographs...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body text-xs">
              <thead>
                <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                  <th className="py-3 px-3">Patron Name</th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Passport Tier</th>
                  <th className="py-3 px-3">Total Orders</th>
                  <th className="py-3 px-3">Total Spent</th>
                  <th className="py-3 px-3">Last Order Date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-3 font-display text-sm font-medium text-primary">{c.name}</td>
                    <td className="py-3 px-3 font-mono text-outline">{c.email}</td>
                    <td className="py-3 px-3">
                      <span className="bg-surface-container px-2 py-0.5 border border-surface-container-high font-label-caps text-[0.625rem] uppercase tracking-wider text-secondary font-bold">
                        {c.tier || 'Patron'}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">{c.totalOrders}</td>
                    <td className="py-3 px-3 font-mono font-bold text-primary">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 font-mono text-on-surface-variant">{c.lastOrder}</td>
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

export default function AdminCustomersPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <CustomersContent />
      </AdminLayout>
    </AdminProvider>
  );
}
