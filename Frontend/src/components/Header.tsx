'use client';

import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Announcement Bar */}
      <div className="bg-primary-container text-on-primary-fixed-variant px-margin lg:px-margin-desktop py-space-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-label-caps text-label-caps uppercase tracking-widest text-[0.6875rem]">
          <div className="flex-1 text-center md:text-left truncate">
            <span className="text-secondary-fixed-dim">FREE COMPLIMENTARY COURIER ON ALL ORDERS ABOVE ₹999</span>
            <span className="mx-space-sm opacity-40">•</span>
            <span className="text-surface-container-high hidden sm:inline">BESPOKE PACKAGING & ARTISANAL SAMPLES INCLUDED</span>
          </div>
          <a
            href="#atelier"
            className="hidden md:flex items-center gap-space-xs text-secondary-fixed-dim hover:text-on-primary transition-colors duration-200"
          >
            <span>CURATED ATELIER • MUMBAI / NEW DELHI</span>
            <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="h-20 max-w-7xl mx-auto px-margin lg:px-margin-desktop flex items-center justify-between gap-space-lg">
        {/* Brandmark */}
        <div className="flex items-center gap-space-md">
          <a href="#" className="flex items-center gap-space-sm">
            <div className="flex flex-col">
              <span className="font-display text-2xl uppercase tracking-[0.2em] leading-none text-primary font-medium">
                VĀNYA
              </span>
              <span className="font-label-caps text-[0.55rem] tracking-[0.25em] text-secondary uppercase mt-0.5">
                Haute Parfumerie
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-space-xl">
          <a
            href="#categories"
            className="font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-surface-variant hover:text-on-surface py-2 transition-colors duration-200"
          >
            Shop
          </a>
          <a
            href="#categories"
            className="font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-surface-variant hover:text-on-surface py-2 transition-colors duration-200"
          >
            Collections
          </a>
          <a
            href="#finder"
            className="font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-surface-variant hover:text-on-surface py-2 transition-colors duration-200"
          >
            Fragrance Finder
          </a>
          <a
            href="#craft"
            className="font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-surface-variant hover:text-on-surface py-2 transition-colors duration-200"
          >
            The Journal
          </a>
          <a
            href="#craft"
            className="font-label-caps text-label-caps uppercase tracking-[0.18em] text-on-surface-variant hover:text-on-surface py-2 transition-colors duration-200"
          >
            About The Atelier
          </a>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-space-lg">
          <button
            type="button"
            aria-label="Search Atelier"
            className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 flex items-center"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          <div className="hidden sm:flex items-center font-label-caps text-label-caps tracking-widest text-on-surface-variant hover:text-on-surface cursor-pointer select-none">
            <span>INR ₹</span>
          </div>

          <a
            href="#account"
            className="hidden md:block font-label-caps text-label-caps tracking-widest uppercase text-on-surface-variant hover:text-on-surface transition-colors duration-200"
          >
            Account
          </a>

          <a
            href="#wishlist"
            className="relative text-on-surface-variant hover:text-on-surface transition-colors duration-200 flex items-center"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            <span className="absolute -top-1.5 -right-2 bg-secondary text-on-secondary font-label-caps text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              1
            </span>
          </a>

          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-space-xs font-label-caps text-label-caps tracking-widest uppercase text-on-surface-variant hover:text-on-surface transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="hidden sm:inline">Bag ({cartCount})</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-on-surface"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-surface-container-high px-margin py-space-md">
          <nav className="flex flex-col gap-space-md">
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface py-1"
            >
              Shop All
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface py-1"
            >
              Collections
            </a>
            <a
              href="#finder"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface py-1"
            >
              Fragrance Finder
            </a>
            <a
              href="#craft"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface py-1"
            >
              The Journal
            </a>
            <a
              href="#craft"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface py-1"
            >
              About The Atelier
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
