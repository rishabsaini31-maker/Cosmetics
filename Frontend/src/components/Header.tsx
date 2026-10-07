'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { PRODUCTS } from '@/data/products';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, wishlist, openCart } = useCart();
  const { user, logout, openAuthModal } = useAuth();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const announcements = [
    "COMPLIMENTARY SHIPPING ABOVE ₹999",
    "BESPOKE PACKAGING & ARTISANAL SAMPLES INCLUDED",
    "DISCOVER BEAUTY & FRAGRANCE",
    "CURATED HAMPERS FOR EVERY OCCASION",
    "EXPLORE SIGNATURE COMBOS",
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high">
        {/* Continuous Seamless Luxury Announcement Marquee */}
        <div className="bg-primary-container text-on-primary-fixed-variant overflow-hidden py-space-xs border-b border-surface-container-high select-none">
          <div className="animate-marquee font-label-caps text-[0.625rem] sm:text-[0.6875rem] uppercase tracking-widest whitespace-nowrap">
            {[...announcements, ...announcements].map((text, idx) => (
              <div key={idx} className="inline-flex items-center">
                <span className="text-secondary-fixed-dim">{text}</span>
                <span className="animate-gentle-arrow mx-1.5 text-secondary-fixed-dim font-bold">→</span>
                <span className="mx-5 text-surface-container-high opacity-40">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Header Container */}
        <div className="h-20 max-w-7xl mx-auto px-margin lg:px-margin-desktop flex items-center justify-between gap-space-lg relative">
          {/* Left: VĀNYA Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-space-sm group">
              <div className="flex flex-col">
                <span className="font-display text-2xl uppercase tracking-[0.25em] leading-none text-primary font-medium group-hover:text-secondary transition-colors">
                  VĀNYA
                </span>
                <span className="font-label-caps text-[0.52rem] tracking-[0.25em] text-secondary uppercase mt-0.5">
                  Haute Parfumerie
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation: SHOP | FRAGRANCE | BEAUTY | HAMPERS | DISCOVER */}
          <nav className="hidden lg:flex items-center gap-space-xl">
            {/* SHOP Nav Item */}
            <div
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown('shop')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/shop"
                className={`font-label-caps text-label-caps uppercase tracking-[0.2em] transition-colors ${
                  pathname === '/shop' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                SHOP
              </Link>
              {activeDropdown === 'shop' && (
                <div className="absolute top-full left-0 w-52 bg-surface-container-lowest border border-surface-container-high shadow-xl p-space-md flex flex-col gap-2 z-50 animate-in fade-in duration-150">
                  <Link href="/shop" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Shop All
                  </Link>
                  <Link href="/shop?badge=Bestseller" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Best Sellers
                  </Link>
                  <Link href="/shop?badge=New" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    New Arrivals
                  </Link>
                  <Link href="/discover" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Gift Sets
                  </Link>
                </div>
              )}
            </div>

            {/* FRAGRANCE Nav Item */}
            <div
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown('fragrance')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/fragrance"
                className={`font-label-caps text-label-caps uppercase tracking-[0.2em] transition-colors ${
                  pathname === '/fragrance' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                FRAGRANCE
              </Link>
              {activeDropdown === 'fragrance' && (
                <div className="absolute top-full left-0 w-56 bg-surface-container-lowest border border-surface-container-high shadow-xl p-space-md flex flex-col gap-2 z-50 animate-in fade-in duration-150">
                  <Link href="/fragrance" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Perfumes
                  </Link>
                  <Link href="/fragrance?type=edp" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Eau de Parfum
                  </Link>
                  <Link href="/fragrance?type=edt" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Eau de Toilette
                  </Link>
                  <Link href="/fragrance?type=mist" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Body Mists
                  </Link>
                  <Link href="/discover" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Discovery Sets
                  </Link>
                  <Link href="/discover#finder" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Fragrance Finder
                  </Link>
                  <Link href="/journal" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Fragrance Guide
                  </Link>
                </div>
              )}
            </div>

            {/* BEAUTY Nav Item */}
            <div
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown('beauty')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/beauty"
                className={`font-label-caps text-label-caps uppercase tracking-[0.2em] transition-colors ${
                  pathname === '/beauty' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                BEAUTY
              </Link>
              {activeDropdown === 'beauty' && (
                <div className="absolute top-full left-0 w-56 bg-surface-container-lowest border border-surface-container-high shadow-xl p-space-md flex flex-col gap-2 z-50 animate-in fade-in duration-150">
                  <Link href="/beauty" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Skincare
                  </Link>
                  <Link href="/beauty?category=makeup" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Makeup
                  </Link>
                  <Link href="/beauty?category=body" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Body Care
                  </Link>
                  <Link href="/beauty?category=essentials" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Beauty Essentials
                  </Link>
                  <Link href="/discover" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Beauty Finder
                  </Link>
                  <Link href="/discover" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Build Your Routine
                  </Link>
                </div>
              )}
            </div>

            {/* HAMPERS Nav Item (Double-column minimal dropdown) */}
            <div
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown('hampers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/hampers"
                className={`font-label-caps text-label-caps uppercase tracking-[0.2em] transition-colors ${
                  pathname === '/hampers' || pathname === '/combos' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                HAMPERS
              </Link>
              {activeDropdown === 'hampers' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[420px] bg-surface-container-lowest border border-surface-container-high shadow-2xl p-space-lg grid grid-cols-2 gap-space-lg z-50 animate-in fade-in duration-150">
                  {/* HAMPERS Column */}
                  <div>
                    <span className="font-label-caps text-xs font-bold uppercase tracking-[0.2em] text-primary block pb-2 mb-2 border-b border-surface-container-high">
                      HAMPERS
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <Link href="/hampers?sub=beauty" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Beauty Hampers
                      </Link>
                      <Link href="/hampers?sub=fragrance" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Fragrance Hampers
                      </Link>
                      <Link href="/hampers?sub=both" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Beauty + Fragrance Hampers
                      </Link>
                      <Link href="/hampers?sub=premium" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Premium Hampers
                      </Link>
                      <Link href="/hampers?sub=festive" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Festive Hampers
                      </Link>
                      <Link href="/hampers?sub=corporate" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Corporate Gifting
                      </Link>
                    </div>
                  </div>

                  {/* COMBOS Column */}
                  <div>
                    <span className="font-label-caps text-xs font-bold uppercase tracking-[0.2em] text-primary block pb-2 mb-2 border-b border-surface-container-high">
                      COMBOS
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <Link href="/combos?sub=fragrance" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Fragrance Combos
                      </Link>
                      <Link href="/combos?sub=skincare" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Skincare Combos
                      </Link>
                      <Link href="/combos?sub=makeup" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Makeup Combos
                      </Link>
                      <Link href="/combos?sub=body" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Body Care Combos
                      </Link>
                      <Link href="/combos?sub=ritual" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-0.5">
                        Ritual Combos
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DISCOVER Nav Item */}
            <div
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown('discover')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/discover"
                className={`font-label-caps text-label-caps uppercase tracking-[0.2em] transition-colors ${
                  pathname === '/discover' || pathname === '/collections' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                DISCOVER
              </Link>
              {activeDropdown === 'discover' && (
                <div className="absolute top-full right-0 w-56 bg-surface-container-lowest border border-surface-container-high shadow-xl p-space-md flex flex-col gap-2 z-50 animate-in fade-in duration-150">
                  <Link href="/collections" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Collections
                  </Link>
                  <Link href="/discover" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Beauty Finder
                  </Link>
                  <Link href="/discover#finder" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Fragrance Finder
                  </Link>
                  <Link href="/journal" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Beauty Guide
                  </Link>
                  <Link href="/journal" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Fragrance Guide
                  </Link>
                  <Link href="/journal" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Journal
                  </Link>
                  <Link href="/about" className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary py-1">
                    Our Story
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions: SEARCH | ♡ | PROFILE | CART */}
          <div className="flex items-center gap-space-md sm:gap-space-lg">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-on-surface-variant hover:text-on-surface transition-colors p-1 flex items-center"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-on-surface-variant hover:text-on-surface transition-colors p-1 flex items-center"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary font-label-caps text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Profile Icon & Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (user) {
                    setProfileOpen(!profileOpen);
                  } else {
                    openAuthModal('login');
                  }
                }}
                aria-label="Account Profile"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors relative ${
                  profileOpen || pathname === '/account'
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                {user && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-surface rounded-full" />
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && user && (
                <div
                  className="absolute top-full right-0 mt-3 w-64 bg-surface-container-lowest border border-surface-container-high shadow-2xl p-space-md z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div className="flex flex-col gap-1 font-body text-xs text-on-surface-variant">
                    <div className="pb-2 mb-2 border-b border-surface-container-high">
                      <span className="font-display text-sm text-primary font-semibold block">{user.name}</span>
                      <span className="text-[0.6875rem] text-on-surface-variant block font-mono">{user.email}</span>
                      <span className="inline-block mt-1 text-[0.625rem] text-secondary font-label-caps uppercase tracking-wider bg-surface-container px-2 py-0.5 border border-surface-container-high">
                        Verified Patron Passport
                      </span>
                    </div>

                    <Link href="/account" onClick={() => setProfileOpen(false)} className="py-1.5 hover:text-primary transition-colors flex justify-between">
                      <span>Account Passport</span>
                    </Link>
                    <Link href="/admin" onClick={() => setProfileOpen(false)} className="py-1.5 text-secondary font-label-caps uppercase tracking-wider font-bold hover:text-primary transition-colors flex items-center justify-between border-y border-surface-container-high my-1 py-2">
                      <span>⚡ Admin Operations Hub</span>
                      <span>→</span>
                    </Link>
                    <Link href="/track-order" onClick={() => setProfileOpen(false)} className="py-1.5 hover:text-primary transition-colors flex justify-between">
                      <span>Order Tracking</span>
                    </Link>
                    <Link href="/wishlist" onClick={() => setProfileOpen(false)} className="py-1.5 hover:text-primary transition-colors flex justify-between">
                      <span>Saved Flacons ({wishlist.length})</span>
                    </Link>
                    <Link href="/customer-care" onClick={() => setProfileOpen(false)} className="py-1.5 hover:text-primary transition-colors flex justify-between">
                      <span>Customer Care</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="py-2 mt-2 border-t border-surface-container-high text-left font-label-caps text-xs uppercase tracking-wider text-error hover:underline flex items-center justify-between"
                    >
                      <span>Sign Out</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CART (Navigates to /cart or opens drawer) */}
            <Link
              href="/cart"
              className="flex items-center gap-space-xs font-label-caps text-label-caps tracking-widest uppercase text-on-surface-variant hover:text-on-surface transition-colors p-1"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
              <span className="hidden sm:inline font-bold">
                CART {itemCount > 0 ? `(${itemCount})` : ''}
              </span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-1 text-on-surface flex items-center"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface border-b border-surface-container-high px-margin py-space-md shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-space-xs font-label-caps text-label-caps uppercase tracking-widest">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-surface-container-low text-on-surface flex justify-between items-center"
              >
                <span>SHOP</span>
                <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
              </Link>
              <Link
                href="/fragrance"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-surface-container-low text-on-surface flex justify-between items-center"
              >
                <span>FRAGRANCE</span>
                <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
              </Link>
              <Link
                href="/beauty"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-surface-container-low text-on-surface flex justify-between items-center"
              >
                <span>BEAUTY</span>
                <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
              </Link>
              <Link
                href="/hampers"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-surface-container-low text-on-surface flex justify-between items-center font-bold text-secondary"
              >
                <span>HAMPERS</span>
                <span className="material-symbols-outlined text-sm text-secondary">chevron_right</span>
              </Link>
              <Link
                href="/discover"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 border-b border-surface-container-low text-on-surface flex justify-between items-center"
              >
                <span>DISCOVER</span>
                <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
              </Link>

              <div className="flex items-center justify-between pt-3 text-secondary text-xs">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  <span>PROFILE</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">favorite</span>
                  <span>WISHLIST ({wishlist.length})</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Interactive Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-surface max-w-2xl w-full border border-surface-container-high shadow-2xl p-space-lg relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-space-md mb-space-md">
              <div className="flex items-center gap-space-sm flex-1">
                <span className="material-symbols-outlined text-2xl text-secondary">search</span>
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fragrances, hampers, beauty, notes (e.g., Oudh, Saffron, Gift Box)..."
                  className="w-full bg-transparent font-body text-base text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-on-surface-variant hover:text-primary p-1"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {searchQuery.trim() !== '' && (
              <div className="max-h-96 overflow-y-auto space-y-space-xs">
                {filteredProducts.length === 0 ? (
                  <p className="text-center font-editorial-serif text-on-surface-variant py-space-lg">
                    No creations found matching &quot;{searchQuery}&quot;.
                  </p>
                ) : (
                  filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                        router.push(`/product/${prod.id}`);
                      }}
                      className="flex items-center gap-space-md p-space-sm hover:bg-surface-container-low cursor-pointer transition-colors border border-transparent hover:border-surface-container-high"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-14 h-16 object-cover bg-surface-container"
                      />
                      <div className="flex-1">
                        <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block">
                          {prod.category}
                        </span>
                        <h4 className="font-display text-sm text-primary">{prod.name}</h4>
                        <p className="font-body text-xs text-on-surface-variant truncate">
                          {prod.tagline}
                        </p>
                      </div>
                      <span className="font-body text-xs font-semibold text-primary">
                        {prod.formattedPrice}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
