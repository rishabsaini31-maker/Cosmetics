'use client';

import React from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function ReviewsContent() {
  const { showToast } = useAdmin();

  const reviews = [
    { id: 'r-1', product: 'Silk Rose & Sandalwood EDP', patron: 'Sunita Mehra', rating: 5, date: 'Oct 5, 2026', comment: 'The sillage is incredible. It opens with rich Kannauj rose and lingers for 12+ hours.' },
    { id: 'r-2', product: 'Kashmiri Saffron Night Serum', patron: 'Vikramaditya S.', rating: 5, date: 'Oct 2, 2026', comment: 'Noticeable radiance in three days. Truly pure natural hydro-distillation formulation.' },
  ];

  const handleApprove = () => {
    showToast('Review approved for storefront display', 'success');
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            PATRON TESTIMONIALS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Review Moderation & Feedback
          </h1>
        </div>
      </div>

      <div className="space-y-space-md">
        {reviews.map((r) => (
          <div key={r.id} className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-base text-primary font-medium block">{r.product}</span>
                <span className="font-body text-xs text-on-surface-variant">By {r.patron} — <span className="font-mono">{r.date}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-secondary">★ {r.rating}.0</span>
                <button
                  onClick={handleApprove}
                  className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-label-caps text-xs uppercase tracking-wider px-3 py-1 font-bold"
                >
                  APPROVED
                </button>
              </div>
            </div>
            <p className="font-editorial-serif text-xs text-primary italic border-t border-surface-container-high pt-2">
              "{r.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <ReviewsContent />
      </AdminLayout>
    </AdminProvider>
  );
}
