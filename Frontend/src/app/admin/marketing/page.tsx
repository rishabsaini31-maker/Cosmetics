'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminMarketing, updateAdminMarketing } from '@/services/adminApi';

function MarketingContent() {
  const { showToast } = useAdmin();
  const [data, setData] = useState<any>({ coupons: [], promotions: [], reviews: [] });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const res = await fetchAdminMarketing();
    if (res.success && res.data) {
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-space-2xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            CAMPAIGN HUB
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Promotions & Marketing
          </h1>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold block mb-1">ACTIVE COUPONS</span>
          <span className="font-display text-3xl text-primary font-bold">{data.coupons?.length || 0}</span>
          <Link href="/admin/coupons" className="font-label-caps text-[0.6875rem] text-secondary font-bold uppercase block mt-3 hover:underline">
            Manage Coupons →
          </Link>
        </div>

        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold block mb-1">PROMOTIONAL CAMPAIGNS</span>
          <span className="font-display text-3xl text-primary font-bold">{data.promotions?.length || 0}</span>
          <span className="font-body text-xs text-outline block mt-3">Complimentary Discovery Set</span>
        </div>

        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold block mb-1">CUSTOMER REVIEWS</span>
          <span className="font-display text-3xl text-primary font-bold">{data.reviews?.length || 0}</span>
          <Link href="/admin/reviews" className="font-label-caps text-[0.6875rem] text-secondary font-bold uppercase block mt-3 hover:underline">
            Moderate Reviews →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminMarketingPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <MarketingContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
