'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subscribeToNewsletter } from '@/services/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      const res = await subscribeToNewsletter(email);
      setLoading(false);
      if (res.success) {
        setSubscribed(true);
        setMessage(res.message);
        setEmail('');
      } else {
        setMessage(res.message || 'Subscription failed');
      }
    }
  };

  return (
    <footer className="w-full bg-surface-container-low pt-space-3xl pb-space-xl border-t border-surface-container-high">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Newsletter Section */}
        <div className="pb-space-2xl mb-space-2xl border-b border-surface-container-high">
          <div className="max-w-xl mx-auto text-center">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">
              Slow Olfactory Chronicles
            </span>
            <h3 className="font-display text-3xl text-on-surface mt-space-xs mb-space-xs">
              Be the First to Know
            </h3>
            <p className="font-editorial-serif text-base text-on-surface-variant mb-space-lg">
              Receive curated private invitations to limited harvest batches, botanical monograph drops, and salon appointments.
            </p>

            {subscribed ? (
              <div className="p-space-md bg-surface-container-lowest border border-secondary text-secondary font-label-caps text-xs uppercase tracking-widest">
                Thank you for subscribing to our atelier correspondence.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-space-xs">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your correspondence email"
                  required
                  className="flex-1 bg-surface-container-lowest px-space-md py-space-sm font-body text-xs text-on-surface placeholder:text-outline focus:outline-none border border-surface-container-high"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-space-sm hover:bg-tertiary-container transition-colors disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            {message && !subscribed && (
              <p className="text-xs text-error mt-2 font-label-caps">{message}</p>
            )}
          </div>
        </div>

        {/* 4 Columns Footer Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-2xl border-b border-surface-container-high">
          {/* Column 1: SHOP */}
          <div className="flex flex-col">
            <h4 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary mb-space-lg font-bold pb-2 border-b border-surface-container-high">
              SHOP
            </h4>
            <ul className="flex flex-col gap-space-sm font-body text-xs text-on-surface-variant">
              <li className="hover:text-primary transition-colors">
                <Link href="/fragrance">Fragrance</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/beauty">Skincare</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/beauty?category=makeup">Makeup</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/beauty?category=body">Body Care</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/shop">Beauty Essentials</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/hampers">Hampers</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/combos">Combos</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/shop?badge=Bestseller">Best Sellers</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/shop?badge=New">New Arrivals</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: DISCOVER */}
          <div className="flex flex-col">
            <h4 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary mb-space-lg font-bold pb-2 border-b border-surface-container-high">
              DISCOVER
            </h4>
            <ul className="flex flex-col gap-space-sm font-body text-xs text-on-surface-variant">
              <li className="hover:text-primary transition-colors">
                <Link href="/collections">Collections</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/discover">Beauty Finder</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/discover#finder">Fragrance Finder</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/journal">Beauty Guide</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/journal">Fragrance Guide</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/journal">Journal</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER CARE */}
          <div className="flex flex-col">
            <h4 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary mb-space-lg font-bold pb-2 border-b border-surface-container-high">
              CUSTOMER CARE
            </h4>
            <ul className="flex flex-col gap-space-sm font-body text-xs text-on-surface-variant">
              <li className="hover:text-primary transition-colors">
                <Link href="/about#locations">Contact Us</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/account">Order Tracking</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/checkout">Shipping</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/about">Returns & Exchanges</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/about">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT */}
          <div className="flex flex-col">
            <h4 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary mb-space-lg font-bold pb-2 border-b border-surface-container-high">
              ABOUT
            </h4>
            <ul className="flex flex-col gap-space-sm font-body text-xs text-on-surface-variant">
              <li className="hover:text-primary transition-colors">
                <Link href="/about">Our Story</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/about">Our Philosophy</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/journal">Ingredients</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/about">Sustainability</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/journal">Press</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link href="/about">Careers</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body text-xs text-on-surface-variant">
          <div className="flex flex-col sm:flex-row items-center gap-space-sm text-center sm:text-left">
            <span>© 2025 VĀNYA HAUTE PARFUMERIE PVT LTD. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-secondary font-semibold">HONOURING CENTURIES OF INDIAN BOTANICAL ARTISTRY</span>
          </div>

          <div className="flex items-center gap-space-md font-label-caps text-[0.625rem] tracking-wider text-outline uppercase select-none">
            <span>UPI</span>
            <span>•</span>
            <span>VISA</span>
            <span>•</span>
            <span>MASTERCARD</span>
            <span>•</span>
            <span>AMEX</span>
            <span>•</span>
            <span>NET BANKING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
