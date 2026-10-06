'use client';

import Link from 'next/link';
import CustomerCareNav from '@/components/CustomerCareNav';

export default function CustomerCareHubPage() {
  const cards = [
    {
      title: 'CONTACT US',
      description: 'Reach our concierge team for order support, product consultations, and custom hamper inquiries.',
      icon: 'mail',
      href: '/contact',
      badge: 'Direct Concierge Support',
    },
    {
      title: 'ORDER TRACKING',
      description: 'Track your VĀNYA order status live from hand-distillation packing to door delivery.',
      icon: 'local_shipping',
      href: '/track-order',
      badge: 'Live AWB Courier Status',
    },
    {
      title: 'SHIPPING & DELIVERY',
      description: 'Explore delivery timelines, Pan-India courier coverage, and complimentary shipping terms.',
      icon: 'package_2',
      href: '/shipping',
      badge: 'Free Shipping Above ₹999',
    },
    {
      title: 'RETURNS & EXCHANGES',
      description: 'Review return rules for sealed cosmetics, damaged parcel replacements, and submit return requests.',
      icon: 'published_with_changes',
      href: '/returns',
      badge: '14-Day Return Window',
    },
    {
      title: 'PAYMENT & SECURITY',
      description: 'View accepted payment methods (UPI, Visa, Amex), failure resolutions, and security information.',
      icon: 'verified_user',
      href: '/payment-security',
      badge: 'PCI-Compliant Processing',
    },
    {
      title: 'FAQs',
      description: 'Find instant answers across Orders, Shipping, Fragrances, Skincare routines, and Hampers.',
      icon: 'help_outline',
      href: '/faqs',
      badge: 'Searchable Repository',
    },
  ];

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      <CustomerCareNav />

      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Customer Care</span>
        </div>

        {/* Hub Header */}
        <div className="max-w-3xl mb-space-2xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold block mb-1">
            Atelier Assistance & Service Monograph
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mb-space-sm">
            CUSTOMER CARE
          </h1>
          <p className="font-editorial-serif text-lg text-on-surface-variant leading-relaxed">
            We're here to help with orders, delivery, returns, payments and everything you need before and after your purchase.
          </p>
        </div>

        {/* 6 Minimal Luxury Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-space-3xl">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group bg-surface-container-lowest p-space-xl border border-surface-container-high hover:border-secondary transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-primary transition-colors">
                    {card.icon}
                  </span>
                  <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary bg-surface-container-low px-2.5 py-1 border border-surface-container-high">
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-label-caps text-sm uppercase tracking-[0.18em] font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                  {card.title}
                </h3>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-space-md">
                  {card.description}
                </p>
              </div>

              <div className="pt-space-sm border-t border-surface-container-high/60 flex items-center justify-between font-label-caps text-xs uppercase tracking-wider text-primary group-hover:text-secondary transition-colors font-semibold">
                <span>Access Monograph</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Direct Contact Banner */}
        <div className="bg-surface-container-low border border-surface-container-high p-space-xl text-center max-w-3xl mx-auto">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
            CONCIERGE DIRECT ASSISTANCE
          </span>
          <h2 className="font-display text-2xl text-primary mb-2">
            Speak with an Atelier Specialist
          </h2>
          <p className="font-editorial-serif text-sm text-on-surface-variant mb-space-md max-w-lg mx-auto leading-relaxed">
            Our beauty and fragrance consultants are available Monday through Saturday (10:00 AM – 7:00 PM IST) for personal guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md">
            <Link
              href="/contact"
              className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-3 hover:bg-tertiary-container transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/faqs"
              className="bg-surface-container-lowest border border-surface-container-high text-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-3 hover:border-primary transition-colors"
            >
              Explore FAQs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
