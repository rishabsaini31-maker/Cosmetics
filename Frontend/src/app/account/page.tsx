'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { wishlist } = useCart();
  const { user, openAuthModal, logout } = useAuth();

  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Account Monograph</span>
        </div>

        {user ? (
          <>
            {/* Account Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-lg mb-space-2xl border-b border-surface-container-high gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                    Verified Member Passport
                  </span>
                  <span className="text-[0.625rem] bg-emerald-100 text-emerald-800 border border-emerald-300 font-label-caps uppercase tracking-wider px-2 py-0.5">
                    Active & Verified
                  </span>
                </div>
                <h1 className="font-display text-4xl text-primary mt-space-xs">
                  Welcome Back, {user.name}
                </h1>
                <p className="font-editorial-serif text-sm text-on-surface-variant mt-1 font-mono">
                  {user.email} • ID: {user.id}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={logout}
                  className="font-label-caps text-xs uppercase tracking-wider text-error bg-surface-container-lowest px-4 py-2 border border-surface-container-high hover:border-error transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-space-3xl">
              <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-3xl text-secondary block mb-2">
                    local_shipping
                  </span>
                  <h3 className="font-display text-lg text-primary mb-1">Recent Orders</h3>
                  <p className="font-body text-xs text-on-surface-variant mb-4">
                    1 Active Dispatch (Ref: VNY-948201)
                  </p>
                </div>
                <div>
                  <Link
                    href="/track-order"
                    className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    Track Dispatch →
                  </Link>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-3xl text-secondary block mb-2">
                    favorite
                  </span>
                  <h3 className="font-display text-lg text-primary mb-1">Saved Flacons</h3>
                  <p className="font-body text-xs text-on-surface-variant mb-4">
                    {wishlist.length} Items saved in your private vault
                  </p>
                </div>
                <div>
                  <Link
                    href="/wishlist"
                    className="font-label-caps text-xs uppercase tracking-wider text-secondary font-semibold hover:underline"
                  >
                    View Wishlist →
                  </Link>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-3xl text-secondary block mb-2">
                    spa
                  </span>
                  <h3 className="font-display text-lg text-primary mb-1">Sensory Profile</h3>
                  <p className="font-body text-xs text-on-surface-variant mb-4">
                    Primary Accord: Smoked Oudh & Mysore Sandalwood
                  </p>
                </div>
                <div>
                  <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold">
                    Curated by Master Perfumer
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Logged Out View */
          <div className="bg-surface-container-lowest p-space-3xl border border-surface-container-high text-center max-w-2xl mx-auto my-space-2xl">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              AUTHENTICATION REQUIRED
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-primary font-medium mb-3">
              Access Your Patron Passport
            </h1>
            <p className="font-editorial-serif text-base text-on-surface-variant max-w-md mx-auto leading-relaxed mb-space-xl">
              Sign in or create an account to view your active order dispatches, saved flacons, and personalized sensory profile.
            </p>
            <div className="flex flex-wrap justify-center gap-space-md">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-space-md hover:bg-tertiary-container transition-all"
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('signup')}
                className="bg-surface-container-low text-primary border border-surface-container-high font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-space-md hover:border-primary transition-all"
              >
                CREATE PASSPORT
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
