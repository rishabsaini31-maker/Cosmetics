'use client';

import React from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';

function ContentOverview() {
  const sections = [
    { name: 'Homepage Sections & Hero', href: '/admin/content/homepage', desc: 'Edit Hero text, primary CTAs, background images, and section layout order.' },
    { name: 'Announcement Bar Marquee', href: '/admin/content/announcement', desc: 'Edit running announcement texts, links, speed, and hover controls.' },
    { name: 'Navigation Menu', href: '/admin/content/navigation', desc: 'Manage main navigation links (SHOP, FRAGRANCE, BEAUTY, HAMPERS, DISCOVER).' },
    { name: 'Collections & Badges', href: '/admin/content/collections', desc: 'Manage featured collections, new arrivals, and harvest specials.' },
    { name: 'Static Editorial Pages', href: '/admin/content/pages', desc: 'Manage content blocks for About, Story, Philosophy, Ingredients, Sourcing, Sustainability, Press, Careers.' },
    { name: 'Journal Articles', href: '/admin/content/journal', desc: 'Create and edit fragrance guides, beauty monographs, and rituals.' },
  ];

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            STOREFRONT CMS
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Content Management System
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
        {sections.map((sec, i) => (
          <div key={i} className="bg-surface-container-lowest p-space-lg border border-surface-container-high flex flex-col justify-between">
            <div>
              <h2 className="font-display text-xl text-primary font-medium mb-2">{sec.name}</h2>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4">{sec.desc}</p>
            </div>
            <div>
              <Link href={sec.href} className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold hover:underline">
                Manage Section →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminContentPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <ContentOverview />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
