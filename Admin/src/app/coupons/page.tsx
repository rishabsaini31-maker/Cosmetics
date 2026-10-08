'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminMarketing, updateAdminMarketing } from '@/services/adminApi';

function CouponsContent() {
  const { showToast } = useAdmin();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminMarketing().then((res) => {
      if (res.success && Array.isArray(res.data?.coupons)) {
        setCoupons(res.data.coupons);
      }
      setLoading(false);
    });
  }, []);

  const handleCreateCoupon = async () => {
    const code = prompt('Enter New Coupon Code (e.g. FESTIVE15):');
    if (!code) return;
    const newC = {
      code: code.toUpperCase().trim(),
      discountType: 'percentage',
      discountValue: 15,
      minOrderAmount: 2000,
      usageLimit: 500,
      usedCount: 0,
      active: true,
      expiryDate: '2026-12-31',
    };
    const updated = [newC, ...coupons];
    setCoupons(updated);

    const res = await updateAdminMarketing({ coupons: updated });
    if (res.success) {
      showToast(`Coupon ${newC.code} generated successfully!`, 'success');
    } else {
      showToast('Failed to save coupon', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            PROMOTIONAL CODES
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Coupon Codes & Patron Discounts
          </h1>
        </div>

        <button
          onClick={handleCreateCoupon}
          className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-4 py-2 hover:bg-tertiary-container transition-colors"
        >
          + GENERATE COUPON CODE
        </button>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
        {loading ? (
          <div className="py-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading Coupons...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body text-xs">
              <thead>
                <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                  <th className="py-3 px-3">Coupon Code</th>
                  <th className="py-3 px-3">Discount</th>
                  <th className="py-3 px-3">Min Order</th>
                  <th className="py-3 px-3">Used / Limit</th>
                  <th className="py-3 px-3">Expiry</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c, i) => (
                  <tr key={i} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-primary text-sm">{c.code}</td>
                    <td className="py-3 px-3 font-mono">
                      {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                    </td>
                    <td className="py-3 px-3 font-mono">₹{c.minOrderAmount}</td>
                    <td className="py-3 px-3 font-mono">{c.usedCount} / {c.usageLimit}</td>
                    <td className="py-3 px-3 font-mono text-on-surface-variant">{c.expiryDate}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 font-label-caps text-[0.6rem] uppercase tracking-wider font-bold border ${
                        c.active ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
                      }`}>
                        {c.active ? 'Active' : 'Inactive'}
                      </span>
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

export default function AdminCouponsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <CouponsContent />
      </AdminLayout>
    </AdminProvider>
  );
}
