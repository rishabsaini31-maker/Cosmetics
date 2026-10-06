'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AboutNav() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/about', label: 'Overview' },
    { href: '/about/our-story', label: 'Our Story' },
    { href: '/about/our-philosophy', label: 'Our Philosophy' },
    { href: '/about/ingredients', label: 'Ingredients & Formulation' },
    { href: '/about/craft-and-sourcing', label: 'Craft & Sourcing' },
    { href: '/about/sustainability', label: 'Sustainability' },
    { href: '/about/press', label: 'Press' },
    { href: '/about/careers', label: 'Careers' },
  ];

  return (
    <nav aria-label="About Section Navigation" className="w-full bg-surface-container-low border-b border-surface-container-high py-2.5 mb-space-2xl sticky top-20 z-40 backdrop-blur-md bg-surface-container-low/95">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop flex items-center justify-between">
        
        {/* Desktop & Tablet Horizontal Nav */}
        <div className="hidden md:flex items-center gap-space-md lg:gap-space-xl overflow-x-auto no-scrollbar w-full">
          <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.25em] text-secondary font-bold mr-2 whitespace-nowrap">
            ABOUT VĀNYA:
          </span>
          <div className="flex items-center gap-space-md lg:gap-space-lg">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-label-caps text-xs uppercase tracking-[0.16em] py-1.5 transition-all border-b-2 whitespace-nowrap ${
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
        </div>

        {/* Mobile Accordion / Dropdown View */}
        <div className="md:hidden w-full flex items-center justify-between gap-3">
          <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold whitespace-nowrap">
            ABOUT:
          </span>
          <select
            value={pathname || '/about'}
            onChange={(e) => router.push(e.target.value)}
            className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none focus:border-primary"
            aria-label="Select About Page"
          >
            {links.map((link) => (
              <option key={link.href} value={link.href}>
                {link.label}
              </option>
            ))}
          </select>
        </div>

      </div>
    </nav>
  );
}
