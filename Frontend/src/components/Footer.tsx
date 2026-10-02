'use client';

import { useState } from 'react';
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
                  className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-space-sm hover:bg-tertiary-container transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-2xl border-b border-surface-container-high">
          <div className="flex flex-col">
            <h4 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary mb-space-lg font-bold">
              Shop
            </h4>
            <ul className="flex flex-col gap-space-sm font-body text-xs text-on-surface-variant">
              <li className="hover:text-on-surface transition-colors">
                <a href="#products">Perfumes & Extraits</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#products">Skincare & Elixirs</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#products">Botanical Body Care</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#products">Ritual Bathing Sets</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#products">The Discovery Vault</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary mb-space-lg font-bold">
              Services & Atelier
            </h4>
            <ul className="flex flex-col gap-space-sm font-body text-xs text-on-surface-variant">
              <li className="hover:text-on-surface transition-colors">
                <a href="#craft">Fragrance Consultation</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#craft">Bespoke Gifting Concierge</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#craft">Private Atelier Appointments</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#craft">Atelier Locator (Mumbai & Delhi)</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary mb-space-lg font-bold">
              Assistance
            </h4>
            <ul className="flex flex-col gap-space-sm font-body text-xs text-on-surface-variant">
              <li className="hover:text-on-surface transition-colors">
                <a href="#">Order Status & Tracking</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#">Complimentary Shipping</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#">Returns & Exchanges</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#">Authenticity & Archival Care</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-label-caps text-xs uppercase tracking-[0.2em] text-primary mb-space-lg font-bold">
              The House
            </h4>
            <ul className="flex flex-col gap-space-sm font-body text-xs text-on-surface-variant">
              <li className="hover:text-on-surface transition-colors">
                <a href="#craft">Our Story & Lineage</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#finder">Indian Botanicals Index</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#craft">Ethical Wildcrafting</a>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <a href="#">Press & Monograph Editorial</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
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
