'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminCustomers } from '@/services/adminApi';

function CustomersContent() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAdminCustomers().then((res) => {
      if (res.success) {
        setCustomers(res.data);
      }
      setLoading(false);
    });
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            PATRON ROSTER
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Customer Directory & Accounts
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-md border border-surface-container-high flex items-center bg-surface-container-low max-w-md">
        <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter customers by name or email..."
          className="bg-transparent font-body text-xs text-on-surface focus:outline-none w-full"
        />
      </div>

      <div className="bg-surface-container-lowest border border-surface-container-high overflow-x-auto">
        {loading ? (
          <div className="p-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading patron directory...
          </div>
        ) : filtered.length > 0 ? (
          <table className="w-full text-left font-body text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
                <th className="p-3">Patron Name</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Passport Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 font-display text-sm font-medium text-primary">{c.name}</td>
                  <td className="p-3 font-mono text-outline">{c.email}</td>
                  <td className="p-3">
                    <span className="font-label-caps text-[0.625rem] uppercase tracking-wider bg-surface-container px-2 py-0.5 border border-surface-container-high">
                      {c.role || 'user'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {c.isVerified ? 'VERIFIED' : 'UNVERIFIED'}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface-variant font-mono">
                    {new Date(c.createdAt || Date.now()).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-space-3xl text-center font-editorial-serif text-sm text-on-surface-variant">
            No customer accounts found matching search filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminCustomersPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <CustomersContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
