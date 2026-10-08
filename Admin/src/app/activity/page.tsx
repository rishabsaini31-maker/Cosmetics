'use client';

import React, { useState, useEffect } from 'react';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminActivity } from '@/services/adminApi';

function ActivityContent() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminActivity().then((res) => {
      if (res.success) {
        setActivities(res.data);
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
            System Activity Log & Actions
          </h1>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-space-md">
        {loading ? (
          <div className="py-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading System Audit Log...
          </div>
        ) : (
          <div className="relative border-l-2 border-surface-container-high ml-3 space-y-space-md pt-1 pb-1">
            {activities.map((act) => (
              <div key={act.id} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secondary border-2 border-surface" />
                <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold block">
                  {act.action}
                </span>
                <span className="font-mono text-[0.6875rem] text-outline block">
                  By {act.user} — {new Date(act.timestamp).toLocaleString('en-IN')}
                </span>
                <p className="font-body text-xs text-on-surface-variant mt-0.5">{act.details}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminActivityPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <ActivityContent />
      </AdminLayout>
    </AdminProvider>
  );
}
