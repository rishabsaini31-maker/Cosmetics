'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminActivity } from '@/services/adminApi';

function ActivityContent() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminActivity().then((res) => {
      if (res.success) {
        setLogs(res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            AUDIT TRAIL
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            System Activity Log
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-surface-container-high overflow-x-auto">
        {loading ? (
          <div className="p-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading activity log...
          </div>
        ) : (
          <table className="w-full text-left font-body text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Administrator</th>
                <th className="p-3">Action</th>
                <th className="p-3">Resource / Detail</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 font-mono text-outline">{new Date(l.timestamp).toLocaleString('en-IN')}</td>
                  <td className="p-3 font-medium text-primary">{l.admin}</td>
                  <td className="p-3 font-label-caps text-[0.6875rem] uppercase tracking-wider font-bold text-secondary">{l.action}</td>
                  <td className="p-3 font-body text-xs text-on-surface-variant">{l.resource}</td>
                  <td className="p-3 font-label-caps text-[0.625rem] uppercase tracking-wider text-emerald-700 font-bold">{l.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function AdminActivityPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <ActivityContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
