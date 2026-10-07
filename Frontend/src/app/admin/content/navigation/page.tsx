'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function NavigationContent() {
  const links = [
    { label: 'SHOP', href: '/shop', status: 'Active' },
    { label: 'FRAGRANCE', href: '/fragrance', status: 'Active' },
    { label: 'BEAUTY', href: '/beauty', status: 'Active' },
    { label: 'HAMPERS', href: '/hampers', status: 'Active' },
    { label: 'COMBOS', href: '/combos', status: 'Active' },
    { label: 'DISCOVER', href: '/discover', status: 'Active' },
    { label: 'ABOUT', href: '/about', status: 'Active' },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            STOREFRONT MENU
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Navigation Menu Manager
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-surface-container-high">
        <table className="w-full text-left font-body text-xs border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
              <th className="p-3">Menu Label</th>
              <th className="p-3">Route Link</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high font-label-caps text-xs uppercase tracking-wider">
            {links.map((l, i) => (
              <tr key={i}>
                <td className="p-3 font-bold text-primary">{l.label}</td>
                <td className="p-3 font-mono text-outline">{l.href}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[0.625rem]">
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminNavigationPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <NavigationContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
