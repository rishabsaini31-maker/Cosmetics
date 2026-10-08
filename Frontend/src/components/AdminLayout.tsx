'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAdmin, DateRangeOption } from '@/context/AdminContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, openAuthModal, logout } = useAuth();
  const {
    sidebarCollapsed,
    toggleSidebar,
    globalSearch,
    setGlobalSearch,
  } = useAdmin();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  // Auto grant/prompt admin login if not signed in or not admin
  const isAdmin = user && (user.role === 'admin' || user.email === 'admin@vanya.com');

  const navGroups = [
    {
      group: 'MAIN',
      items: [
        { label: 'Dashboard', href: '/admin', icon: 'grid_view' },
      ],
    },
    {
      group: 'COMMERCE',
      items: [
        { label: 'Orders', href: '/admin/orders', icon: 'local_shipping' },
        { label: 'Products', href: '/admin/products', icon: 'inventory_2' },
        { label: 'Inventory', href: '/admin/inventory', icon: 'warehouse' },
        { label: 'Customers', href: '/admin/customers', icon: 'group' },
        { label: 'Hampers & Combos', href: '/admin/hampers', icon: 'card_giftcard' },
      ],
    },
    {
      group: 'ANALYTICS',
      items: [
        { label: 'Analytics', href: '/admin/analytics', icon: 'insights' },
        { label: 'Reports', href: '/admin/reports', icon: 'assessment' },
      ],
    },
    {
      group: 'MARKETING',
      items: [
        { label: 'Promotions', href: '/admin/marketing', icon: 'campaign' },
        { label: 'Coupons', href: '/admin/coupons', icon: 'confirmation_number' },
        { label: 'Campaigns', href: '/admin/campaigns', icon: 'ads_click' },
        { label: 'Reviews', href: '/admin/reviews', icon: 'rate_review' },
      ],
    },
    {
      group: 'CONTENT',
      items: [
        { label: 'Homepage', href: '/admin/content/homepage', icon: 'home' },
        { label: 'Collections', href: '/admin/content/collections', icon: 'collections' },
        { label: 'Navigation', href: '/admin/content/navigation', icon: 'menu' },
        { label: 'Pages', href: '/admin/content/pages', icon: 'description' },
        { label: 'Journal', href: '/admin/content/journal', icon: 'menu_book' },
        { label: 'Banners', href: '/admin/content/announcement', icon: 'subtitles' },
      ],
    },
    {
      group: 'DESIGN',
      items: [
        { label: 'Theme', href: '/admin/theme', icon: 'palette' },
        { label: 'Announcement Bar', href: '/admin/content/announcement', icon: 'campaign' },
        { label: 'Media Library', href: '/admin/media', icon: 'photo_library' },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { label: 'Users & Roles', href: '/admin/users', icon: 'admin_panel_settings' },
        { label: 'Settings', href: '/admin/settings', icon: 'settings' },
        { label: 'Activity Log', href: '/admin/activity', icon: 'history' },
      ],
    },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="bg-surface-container-lowest p-8 border border-surface-container-high max-w-md w-full text-center shadow-lg">
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
            RESTRICTED AREA
          </span>
          <h1 className="font-display text-3xl text-primary font-medium mb-3">
            VĀNYA Admin Operations
          </h1>
          <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed mb-6">
            Administrator privileges are required to access store command tools. Please sign in with an admin account (e.g. <code className="bg-surface-container px-1 py-0.5 text-primary">admin@vanya.com</code> / <code className="bg-surface-container px-1 py-0.5 text-primary">admin123</code>).
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => openAuthModal('login', 'admin@vanya.com')}
              className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] py-3 hover:bg-tertiary-container transition-colors"
            >
              SIGN IN AS ADMIN
            </button>
            <Link
              href="/"
              className="font-label-caps text-xs uppercase tracking-[0.18em] text-on-surface-variant hover:text-primary pt-2"
            >
              ← Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex text-on-surface font-body antialiased">
      
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col bg-surface-container-lowest border-r border-surface-container-high transition-all duration-300 z-30 fixed top-0 bottom-0 left-0 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-surface-container-high">
          <Link href="/admin" className="flex items-center gap-2 overflow-hidden">
            <span className="font-display text-xl uppercase tracking-[0.2em] text-primary font-bold whitespace-nowrap">
              {sidebarCollapsed ? 'V' : 'VĀNYA'}
            </span>
            {!sidebarCollapsed && (
              <span className="font-label-caps text-[0.55rem] uppercase tracking-widest text-secondary font-bold bg-surface-container px-1.5 py-0.5 border border-surface-container-high">
                ADMIN
              </span>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {sidebarCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 no-scrollbar">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              {!sidebarCollapsed && (
                <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.25em] text-secondary font-bold block px-3 mb-2">
                  {group.group}
                </span>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={sidebarCollapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3 py-2 text-xs font-label-caps uppercase tracking-wider transition-all border-l-2 ${
                        isActive
                          ? 'border-primary text-primary font-bold bg-surface-container-low'
                          : 'border-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        {item.icon}
                      </span>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Back to Store */}
        <div className="p-4 border-t border-surface-container-high">
          <Link
            href="/"
            className="flex items-center gap-2 font-label-caps text-[0.6875rem] uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            {!sidebarCollapsed && <span>View Storefront</span>}
          </Link>
        </div>
      </aside>

      {/* Main Administrative Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Topbar Header */}
        <header className="h-20 bg-surface/95 backdrop-blur-md border-b border-surface-container-high px-margin lg:px-margin-desktop flex items-center justify-between gap-4 sticky top-0 z-20">
          
          {/* Mobile Drawer Trigger & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden text-primary p-1"
              aria-label="Open Mobile Admin Navigation"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>

            <div>
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.25em] text-secondary font-semibold hidden sm:block">
                VĀNYA ADMIN HUB
              </span>
              <h1 className="font-display text-xl sm:text-2xl text-primary font-medium">
                {pathname === '/' || pathname === '/admin' ? 'Dashboard' : (pathname || '').replace(/^\/admin\/?/, '').replace('/', '').replace(/-/g, ' ')}
              </h1>
            </div>
          </div>

          {/* Center Search & Right Profile Control */}
          <div className="flex items-center gap-space-md">
            
            {/* Global Admin Search Bar */}
            <div className="hidden sm:flex items-center bg-surface-container-lowest border border-surface-container-high px-3 py-1.5 text-xs">
              <span className="material-symbols-outlined text-outline text-[16px] mr-2">search</span>
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search orders, products, customers..."
                className="bg-transparent font-body text-xs text-on-surface focus:outline-none w-44 lg:w-64"
              />
            </div>

            {/* Store Status Badge */}
            <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 font-label-caps text-[0.625rem] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>STORE LIVE</span>
            </div>

            {/* Notifications */}
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-surface-container-low border border-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative"
              title="Admin System Notifications"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
            </button>

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                className="flex items-center gap-2 bg-surface-container-low border border-surface-container-high px-3 py-1.5 transition-colors hover:border-primary"
              >
                <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-caps text-[10px] font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold hidden md:inline">
                  {user.name.split(' ')[0]}
                </span>
                <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
              </button>

              {adminMenuOpen && (
                <div
                  onMouseLeave={() => setAdminMenuOpen(false)}
                  className="absolute right-0 top-full mt-2 w-56 bg-surface-container-lowest border border-surface-container-high shadow-2xl p-3 z-50 animate-in fade-in"
                >
                  <div className="pb-2 mb-2 border-b border-surface-container-high">
                    <span className="font-display text-sm text-primary font-semibold block">{user.name}</span>
                    <span className="font-mono text-[0.65rem] text-on-surface-variant block">{user.email}</span>
                    <span className="inline-block mt-1 font-label-caps text-[0.625rem] uppercase tracking-wider text-secondary font-bold">
                      Master Administrator
                    </span>
                  </div>

                  <Link href="/admin/settings" onClick={() => setAdminMenuOpen(false)} className="block py-1.5 font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary">
                    Store Settings
                  </Link>
                  <Link href="/admin/users" onClick={() => setAdminMenuOpen(false)} className="block py-1.5 font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary">
                    User Roles
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setAdminMenuOpen(false);
                      router.push('/');
                    }}
                    className="w-full text-left py-2 mt-2 border-t border-surface-container-high font-label-caps text-xs uppercase tracking-wider text-error hover:underline"
                  >
                    Sign Out Admin
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm" onClick={() => setMobileDrawerOpen(false)} />
            <div className="relative bg-surface-container-lowest w-72 max-w-full flex flex-col h-full z-10 border-r border-surface-container-high">
              <div className="p-4 flex items-center justify-between border-b border-surface-container-high">
                <span className="font-display text-xl uppercase tracking-[0.2em] text-primary font-bold">
                  VĀNYA ADMIN
                </span>
                <button onClick={() => setMobileDrawerOpen(false)} className="text-primary p-1">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
                {navGroups.map((group, idx) => (
                  <div key={idx}>
                    <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.25em] text-secondary font-bold block px-2 mb-2">
                      {group.group}
                    </span>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 text-xs font-label-caps uppercase tracking-wider transition-all border-l-2 ${
                            pathname === item.href
                              ? 'border-primary text-primary font-bold bg-surface-container-low'
                              : 'border-transparent text-on-surface-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px] text-secondary">
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-margin lg:p-margin-desktop max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
