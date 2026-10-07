'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminMarketing } from '@/services/adminApi';

function ReviewsContent() {
  const { showToast } = useAdmin();
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetchAdminMarketing().then((res) => {
      if (res.success && res.data) {
        setReviews(res.data.reviews || []);
      }
    });
  }, []);

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            PATRON TESTIMONIALS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Customer Reviews Moderation
          </h1>
        </div>
      </div>

      <div className="space-y-space-md">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-surface-container-lowest p-space-lg border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold">{rev.productName}</span>
                <span className="text-outline">•</span>
                <span className="font-body text-xs text-on-surface-variant">by {rev.customerName}</span>
              </div>
              <p className="font-editorial-serif text-sm text-primary italic">"{rev.comment}"</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                {rev.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <ReviewsContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
