'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CustomerCareNav() {
  const pathname = usePathname();

  const links = [
    { href: '/customer-care', label: 'Overview Hub' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/track-order', label: 'Order Tracking' },
    { href: '/shipping', label: 'Shipping & Delivery' },
    { href: '/returns', label: 'Returns & Exchanges' },
    { href: '/payment-security', label: 'Payment & Security' },
    { href: '/faqs', label: 'FAQs' },
  ];

  return (
    <nav aria-label="Customer Care Navigation" className="w-full bg-surface-container-low border-b border-surface-container-high py-2 mb-space-2xl overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop flex items-center gap-space-md sm:gap-space-xl min-w-max">
        <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.25em] text-secondary font-bold mr-2 hidden md:inline">
          CUSTOMER CARE:
        </span>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-label-caps text-xs uppercase tracking-[0.18em] py-2 transition-all border-b-2 ${
                isActive
                  ? 'text-primary font-bold border-primary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
