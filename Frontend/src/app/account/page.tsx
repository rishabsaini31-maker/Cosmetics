'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function AccountPage() {
  const { wishlist } = useCart();

  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Account Monograph</span>
        </div>

        {/* Account Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-lg mb-space-2xl border-b border-surface-container-high">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              Member Passport
            </span>
            <h1 className="font-display text-4xl text-primary mt-space-xs">
              Welcome Back, Rishab Saini
            </h1>
            <p className="font-editorial-serif text-sm text-on-surface-variant mt-1">
              Member ID: VNY-PASSPORT-88219 • Tier: Archival Patron
            </p>
          </div>

          <div className="mt-4 md:mt-0 font-label-caps text-xs uppercase tracking-wider text-secondary bg-surface-container-low px-4 py-2 border border-surface-container-high">
            Atelier Privileges Active
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-3xl">
          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm">
            <span className="material-symbols-outlined text-3xl text-secondary block mb-2">
              local_shipping
            </span>
            <h3 className="font-display text-lg text-primary mb-1">Recent Orders</h3>
            <p className="font-body text-xs text-on-surface-variant mb-4">
              1 Active Dispatch (Ref: VNY-948201)
            </p>
            <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold">
              Status: In Transit (Delhi Courier)
            </span>
          </div>

          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm">
            <span className="material-symbols-outlined text-3xl text-secondary block mb-2">
              favorite
            </span>
            <h3 className="font-display text-lg text-primary mb-1">Saved Flacons</h3>
            <p className="font-body text-xs text-on-surface-variant mb-4">
              {wishlist.length} Items saved in your private vault
            </p>
            <Link
              href="/wishlist"
              className="font-label-caps text-xs uppercase tracking-wider text-secondary font-semibold hover:underline"
            >
              View Wishlist →
            </Link>
          </div>

          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm">
            <span className="material-symbols-outlined text-3xl text-secondary block mb-2">
              spa
            </span>
            <h3 className="font-display text-lg text-primary mb-1">Sensory Profile</h3>
            <p className="font-body text-xs text-on-surface-variant mb-4">
              Primary Accord: Smoked Oudh & Mysore Sandalwood
            </p>
            <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold">
              Curated by Master Perfumer
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
