'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminMarketing, updateAdminMarketing } from '@/services/adminApi';

function CouponsContent() {
  const { showToast } = useAdmin();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [type, setType] = useState('percentage');
  const [val, setVal] = useState(10);
  const [minPurch, setMinPurch] = useState(1000);

  const loadCoupons = async () => {
    const res = await fetchAdminMarketing();
    if (res.success && res.data) {
      setCoupons(res.data.coupons || []);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newCoupon = {
      id: `coup-${Date.now()}`,
      code: code.toUpperCase().trim(),
      discountType: type,
      discountValue: Number(val),
      minPurchase: Number(minPurch),
      usageCount: 0,
      status: 'Active',
      expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    };

    const updated = [...coupons, newCoupon];
    const res = await updateAdminMarketing({ coupons: updated });
    if (res.success) {
      showToast(`Created coupon ${code.toUpperCase()}`, 'success');
      setCode('');
      loadCoupons();
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            DISCOUNT ENGINE
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Coupons & Voucher Codes
          </h1>
        </div>
      </div>

      {/* Add Coupon Form */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
        <h2 className="font-display text-lg text-primary font-medium mb-3 border-b border-surface-container-high pb-2">
          Create New Promo Code
        </h2>
        <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-space-md items-end">
          <div>
            <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">COUPON CODE *</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. FESTIVE20"
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">DISCOUNT TYPE</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (₹)</option>
            </select>
          </div>

          <div>
            <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">VALUE ({type === 'percentage' ? '%' : '₹'})</label>
            <input
              type="number"
              required
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] py-2.5 hover:bg-tertiary-container transition-colors"
          >
            CREATE COUPON
          </button>
        </form>
      </div>

      {/* Coupons Table */}
      <div className="bg-surface-container-lowest border border-surface-container-high overflow-x-auto">
        <table className="w-full text-left font-body text-xs border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
              <th className="p-3">Coupon Code</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Min Purchase</th>
              <th className="p-3">Usage Count</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-high">
            {coupons.map((c) => (
              <tr key={c.id}>
                <td className="p-3 font-mono text-primary font-bold">{c.code}</td>
                <td className="p-3 font-mono">{c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}</td>
                <td className="p-3 font-mono">₹{c.minPurchase}</td>
                <td className="p-3 font-mono">{c.usageCount} times</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {c.status}
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

export default function AdminCouponsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <CouponsContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
