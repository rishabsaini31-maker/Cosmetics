'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin, DateRangeOption } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminDashboard, updateAdminOrderStatus } from '@/services/adminApi';

function DashboardContent() {
  const { dateRange, setDateRange, showToast } = useAdmin();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeChartMetric, setActiveChartMetric] = useState<'revenue' | 'orders' | 'aov'>('revenue');

  const dateOptions: DateRangeOption[] = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'This Month',
    'Previous Month',
    'This Year',
    'Custom Range',
  ];

  const loadDashboard = async () => {
    setLoading(true);
    const res = await fetchAdminDashboard();
    if (res.success) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, [dateRange]);

  const handleQuickStatusChange = async (orderId: string, status: string) => {
    const res = await updateAdminOrderStatus(orderId, status);
    if (res.success) {
      showToast(`Order ${orderId} status set to ${status}`, 'success');
      loadDashboard();
    } else {
      showToast(res.message || 'Failed to update order status', 'error');
    }
  };

  if (loading || !data) {
    return (
      <div className="py-space-3xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
        Loading VĀNYA Admin Command Center...
      </div>
    );
  }

  const kpis = data.kpis;

  return (
    <div className="space-y-space-2xl">
      
      {/* Top Header Bar & Global Date Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            PERFORMANCE SNAPSHOT
          </span>
          <h2 className="font-display text-2xl text-primary font-medium">
            Executive Summary
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-label-caps text-[0.625rem] uppercase tracking-wider text-outline font-bold">
            DATE RANGE:
          </span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRangeOption)}
            className="bg-surface-container-lowest border border-surface-container-high px-3 py-1.5 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none focus:border-primary shadow-sm"
          >
            {dateOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. TOP KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
        {/* Total Revenue */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              TOTAL REVENUE
            </span>
            <span className="font-display text-3xl font-bold text-primary block">
              {kpis.revenue.formatted}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className="text-emerald-700 font-bold">{kpis.revenue.change}</span>
            <span className="text-on-surface-variant font-mono">{kpis.revenue.prevText}</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              TOTAL ORDERS
            </span>
            <span className="font-display text-3xl font-bold text-primary block">
              {kpis.orders.value}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className="text-emerald-700 font-bold">{kpis.orders.change}</span>
            <span className="text-on-surface-variant font-mono">{kpis.orders.prevText}</span>
          </div>
        </div>

        {/* Average Order Value (AOV) */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              AVG ORDER VALUE (AOV)
            </span>
            <span className="font-display text-3xl font-bold text-primary block">
              {kpis.aov.formatted}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className="text-emerald-700 font-bold">{kpis.aov.change}</span>
            <span className="text-on-surface-variant font-mono">{kpis.aov.prevText}</span>
          </div>
        </div>
      </div>

      {/* 2. REVENUE & ORDERS TREND VISUALIZER */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-space-md">
          <div>
            <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
              GROWTH ANALYTICS
            </span>
            <h3 className="font-display text-xl text-primary font-medium">
              Revenue & Order Trajectory
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-surface-container-low p-1 border border-surface-container-high">
            {(['revenue', 'orders', 'aov'] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setActiveChartMetric(metric)}
                className={`px-3 py-1 font-label-caps text-[0.6875rem] uppercase tracking-wider transition-colors ${
                  activeChartMetric === metric
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>

        {/* CSS Trend Chart Bar Visualization */}
        <div className="pt-space-md">
          <div className="h-48 flex items-end gap-2 sm:gap-4 border-b border-surface-container-high pb-2 px-2">
            {data.trendData.map((d: any, idx: number) => {
              const maxVal = Math.max(...data.trendData.map((t: any) => t[activeChartMetric]));
              const heightPercent = maxVal > 0 ? (d[activeChartMetric] / maxVal) * 100 : 10;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-primary text-on-primary px-2 py-0.5 font-mono text-[0.6rem] whitespace-nowrap z-10">
                    {activeChartMetric === 'revenue' || activeChartMetric === 'aov' ? `₹${d[activeChartMetric].toLocaleString('en-IN')}` : `${d[activeChartMetric]} orders`}
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-secondary/80 group-hover:bg-primary transition-colors rounded-t-sm"
                  />
                  <span className="font-mono text-[0.6rem] text-outline truncate w-full text-center">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. RECENT ORDERS TABLE */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
        <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high mb-space-md">
          <div>
            <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
              DISPATCH QUEUE
            </span>
            <h3 className="font-display text-xl text-primary font-medium">
              Recent Store Orders
            </h3>
          </div>
          <Link href="/orders" className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-body text-xs">
            <thead>
              <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order: any) => (
                <tr key={order.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-primary">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      #{order.id}
                    </Link>
                  </td>
                  <td className="py-3 px-3 font-medium text-primary">{order.customerName}</td>
                  <td className="py-3 px-3 text-on-surface-variant font-mono">{order.date}</td>
                  <td className="py-3 px-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleQuickStatusChange(order.id, e.target.value)}
                      className="bg-surface border border-surface-container-high px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider font-bold text-primary focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-primary">{order.formattedAmount}</td>
                  <td className="py-3 px-3 text-right">
                    <Link href={`/orders/${order.id}`} className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. TOP PRODUCTS & LOW STOCK ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
        
        {/* Top Performing Products */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high mb-space-md">
            <div>
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
                CATALOG HIGHLIGHTS
              </span>
              <h3 className="font-display text-xl text-primary font-medium">
                Top Performing Items
              </h3>
            </div>
            <Link href="/products" className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
              View Catalog
            </Link>
          </div>

          <div className="space-y-space-md">
            {data.topProducts.map((p: any) => (
              <div key={p.id} className="flex items-center justify-between gap-4 pb-3 border-b border-surface-container-high last:border-b-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover border border-surface-container-high flex-shrink-0" />
                  <div>
                    <span className="font-display text-sm text-primary font-medium block">{p.name}</span>
                    <span className="font-label-caps text-[0.625rem] text-secondary uppercase">{p.category}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-primary block">{p.formattedRevenue}</span>
                  <span className="font-body text-[0.6875rem] text-outline">{p.unitsSold} units sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Inventory Alerts */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high mb-space-md">
            <div>
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-error font-bold block mb-0.5">
                STOCK WARNINGS
              </span>
              <h3 className="font-display text-xl text-primary font-medium">
                Inventory Alerts
              </h3>
            </div>
            <Link href="/inventory" className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
              Manage Stock
            </Link>
          </div>

          <div className="space-y-space-md">
            {data.lowStockItems.length > 0 ? (
              data.lowStockItems.map((item: any) => (
                <div key={item.id} className="p-3 bg-surface-container-low border border-surface-container-high flex items-center justify-between">
                  <div>
                    <span className="font-display text-sm text-primary font-medium block">{item.name}</span>
                    <span className="font-mono text-[0.625rem] text-outline block">{item.sku}</span>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider font-bold block ${
                      item.status === 'OUT OF STOCK' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {item.currentStock} Units ({item.status})
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-space-lg text-center font-editorial-serif text-xs text-on-surface-variant">
                All catalog items currently satisfy low stock thresholds.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Access Admin Portal Modules Grid */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-space-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
          <div>
            <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
              COMMAND SECTIONS
            </span>
            <h3 className="font-display text-xl text-primary font-medium">
              Admin Operations Hub
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'Orders', icon: 'local_shipping', href: '/orders', desc: 'Dispatch & Waybills' },
            { label: 'Products', icon: 'inventory_2', href: '/products', desc: 'Catalog & Formulations' },
            { label: 'Inventory', icon: 'warehouse', href: '/inventory', desc: 'Stock & Thresholds' },
            { label: 'Customers', icon: 'group', href: '/customers', desc: 'Patron Monographs' },
            { label: 'Hampers & Combos', icon: 'card_giftcard', href: '/hampers', desc: 'Curated Sets' },
            { label: 'Analytics', icon: 'insights', href: '/analytics', desc: 'Olfactory Performance' },
            { label: 'Reports', icon: 'assessment', href: '/reports', desc: 'CSV Data Exports' },
            { label: 'Promotions', icon: 'campaign', href: '/marketing', desc: 'Coupons & Banners' },
            { label: 'Reviews', icon: 'rate_review', href: '/reviews', desc: 'Patron Feedback' },
            { label: 'Content CMS', icon: 'description', href: '/content', desc: 'Homepage & Gazette' },
            { label: 'Theme', icon: 'palette', href: '/theme', desc: 'Palette & Styling' },
            { label: 'System Settings', icon: 'settings', href: '/settings', desc: 'Store Configuration' },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="p-3 bg-surface-container-low border border-surface-container-high hover:border-primary hover:bg-surface-container-lowest transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[20px] text-secondary group-hover:text-primary transition-colors">
                  {item.icon}
                </span>
                <span className="font-label-caps text-xs font-bold uppercase tracking-wider text-primary group-hover:underline">
                  {item.label}
                </span>
              </div>
              <span className="font-body text-[0.6875rem] text-on-surface-variant line-clamp-1">
                {item.desc}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <DashboardContent />
      </AdminLayout>
    </AdminProvider>
  );
}
