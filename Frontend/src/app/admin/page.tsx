'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
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
            <span className="font-display text-3xl sm:text-4xl text-primary font-medium block">
              {kpis.totalRevenue.formatted}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-body text-xs">
            <span className="text-emerald-700 font-bold font-label-caps">{kpis.totalRevenue.change}</span>
            <span className="text-outline italic">vs previous period ({dateRange})</span>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              TOTAL ORDERS
            </span>
            <span className="font-display text-3xl sm:text-4xl text-primary font-medium block">
              {kpis.orders.value}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-body text-xs">
            <span className="text-emerald-700 font-bold font-label-caps">{kpis.orders.change}</span>
            <span className="text-outline italic">vs previous period ({dateRange})</span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              AVERAGE ORDER VALUE
            </span>
            <span className="font-display text-3xl sm:text-4xl text-primary font-medium block">
              {kpis.averageOrderValue.formatted}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-body text-xs">
            <span className="text-emerald-700 font-bold font-label-caps">{kpis.averageOrderValue.change}</span>
            <span className="text-outline italic">vs previous period ({dateRange})</span>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              CUSTOMERS
            </span>
            <span className="font-display text-3xl sm:text-4xl text-primary font-medium block">
              {kpis.customers.value}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-body text-xs">
            <span className="text-emerald-700 font-bold font-label-caps">{kpis.customers.change}</span>
            <span className="text-outline italic">vs previous period ({dateRange})</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              CONVERSION RATE
            </span>
            <span className="font-display text-3xl sm:text-4xl text-primary font-medium block">
              {kpis.conversionRate.value}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-body text-xs">
            <span className="text-emerald-700 font-bold font-label-caps">{kpis.conversionRate.change}</span>
            <span className="text-outline italic">vs previous period ({dateRange})</span>
          </div>
        </div>

        {/* Refunds */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              REFUNDS & RETURNS
            </span>
            <span className="font-display text-3xl sm:text-4xl text-primary font-medium block">
              {kpis.refunds.formatted}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-body text-xs">
            <span className="text-outline font-bold font-label-caps">{kpis.refunds.change}</span>
            <span className="text-outline italic">vs previous period ({dateRange})</span>
          </div>
        </div>
      </div>

      {/* 2. REVENUE OVERVIEW & CHART WORKSPACE */}
      <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high mb-space-lg">
          <div>
            <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              ANALYTICS CHART
            </span>
            <h3 className="font-display text-2xl text-primary font-medium">
              Revenue & Orders Trend
            </h3>
          </div>

          <div className="flex items-center gap-1 border border-surface-container-high bg-surface-container-low p-1">
            <button
              onClick={() => setActiveChartMetric('revenue')}
              className={`px-3 py-1 font-label-caps text-[0.6875rem] uppercase tracking-wider transition-all ${
                activeChartMetric === 'revenue'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setActiveChartMetric('orders')}
              className={`px-3 py-1 font-label-caps text-[0.6875rem] uppercase tracking-wider transition-all ${
                activeChartMetric === 'orders'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveChartMetric('aov')}
              className={`px-3 py-1 font-label-caps text-[0.6875rem] uppercase tracking-wider transition-all ${
                activeChartMetric === 'aov'
                  ? 'bg-primary text-on-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Avg Order Value
            </button>
          </div>
        </div>

        {/* Minimal Editorial Visual Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-surface-container-high px-4">
          {[
            { label: '01 Oct', val: 42000 },
            { label: '02 Oct', val: 58000 },
            { label: '03 Oct', val: 36000 },
            { label: '04 Oct', val: 78000 },
            { label: '05 Oct', val: 92000 },
            { label: '06 Oct', val: 64000 },
            { label: '07 Oct', val: 112450 },
          ].map((bar, idx) => {
            const heightPct = Math.min(100, Math.max(15, (bar.val / 120000) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[0.625rem] text-secondary font-bold">
                  ₹{bar.val.toLocaleString('en-IN')}
                </div>
                <div
                  style={{ height: `${heightPct}%` }}
                  className="w-full bg-secondary-fixed-dim group-hover:bg-primary transition-colors border-t border-secondary"
                />
                <span className="font-label-caps text-[0.625rem] text-outline uppercase">{bar.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ORDER STATUS SUMMARY & RECENT ORDERS */}
      <div className="space-y-space-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-0.5">
              COMMERCE PIPELINE
            </span>
            <h3 className="font-display text-2xl text-primary font-medium">
              Order Status Overview
            </h3>
          </div>
          <Link
            href="/admin/orders"
            className="font-label-caps text-xs uppercase tracking-[0.18em] text-secondary font-bold hover:text-primary transition-colors"
          >
            VIEW ALL ORDERS →
          </Link>
        </div>

        {/* Status Count Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-space-xs text-center">
          <div className="bg-surface-container-lowest p-3 border border-surface-container-high">
            <span className="font-label-caps text-[0.625rem] text-outline block mb-1">TOTAL</span>
            <span className="font-display text-xl text-primary font-bold">{data.orderStatuses.total}</span>
          </div>
          <div className="bg-surface-container-lowest p-3 border border-surface-container-high">
            <span className="font-label-caps text-[0.625rem] text-amber-700 block mb-1">PENDING</span>
            <span className="font-display text-xl text-amber-700 font-bold">{data.orderStatuses.pending}</span>
          </div>
          <div className="bg-surface-container-lowest p-3 border border-surface-container-high">
            <span className="font-label-caps text-[0.625rem] text-blue-700 block mb-1">PROCESSING</span>
            <span className="font-display text-xl text-blue-700 font-bold">{data.orderStatuses.processing}</span>
          </div>
          <div className="bg-surface-container-lowest p-3 border border-surface-container-high">
            <span className="font-label-caps text-[0.625rem] text-indigo-700 block mb-1">SHIPPED</span>
            <span className="font-display text-xl text-indigo-700 font-bold">{data.orderStatuses.shipped}</span>
          </div>
          <div className="bg-surface-container-lowest p-3 border border-surface-container-high">
            <span className="font-label-caps text-[0.625rem] text-emerald-700 block mb-1">DELIVERED</span>
            <span className="font-display text-xl text-emerald-700 font-bold">{data.orderStatuses.delivered}</span>
          </div>
          <div className="bg-surface-container-lowest p-3 border border-surface-container-high">
            <span className="font-label-caps text-[0.625rem] text-red-700 block mb-1">CANCELLED</span>
            <span className="font-display text-xl text-red-700 font-bold">{data.orderStatuses.cancelled}</span>
          </div>
          <div className="bg-surface-container-lowest p-3 border border-surface-container-high">
            <span className="font-label-caps text-[0.625rem] text-purple-700 block mb-1">REFUNDED</span>
            <span className="font-display text-xl text-purple-700 font-bold">{data.orderStatuses.refunded}</span>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-surface-container-lowest border border-surface-container-high overflow-x-auto">
          <table className="w-full text-left font-body text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Items</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {data.recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 font-mono text-primary font-bold">{order.id}</td>
                  <td className="p-3">
                    <span className="font-medium text-primary block">{order.customerName}</span>
                    <span className="font-mono text-[0.6875rem] text-outline">{order.customerEmail}</span>
                  </td>
                  <td className="p-3 text-on-surface-variant whitespace-nowrap">
                    {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-3 text-on-surface-variant">{order.items?.length || 1} item(s)</td>
                  <td className="p-3 font-medium text-primary">{order.formattedAmount}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleQuickStatusChange(order.id, e.target.value)}
                      className="bg-surface-container-lowest border border-surface-container-high px-2 py-1 font-label-caps text-[0.625rem] uppercase tracking-wider text-primary focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. TOP PRODUCTS & LOW STOCK ALERTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
        
        {/* Top Performing Products */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg border border-surface-container-high">
          <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high mb-space-md">
            <div>
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
                CATALOG METRICS
              </span>
              <h3 className="font-display text-xl text-primary font-medium">
                Top Performing Products
              </h3>
            </div>
            <Link href="/admin/products" className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-space-md">
            {data.topProducts.map((p: any) => (
              <div key={p.id} className="flex items-center justify-between gap-3 pb-3 border-b border-surface-container-high last:border-b-0 last:pb-0">
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
            <Link href="/admin/inventory" className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
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
            { label: 'Orders', icon: 'local_shipping', href: '/admin/orders', desc: 'Dispatch & Waybills' },
            { label: 'Products', icon: 'inventory_2', href: '/admin/products', desc: 'Catalog & Formulations' },
            { label: 'Inventory', icon: 'warehouse', href: '/admin/inventory', desc: 'Stock & Thresholds' },
            { label: 'Customers', icon: 'group', href: '/admin/customers', desc: 'Patron Monographs' },
            { label: 'Hampers & Combos', icon: 'card_giftcard', href: '/admin/hampers', desc: 'Curated Sets' },
            { label: 'Analytics', icon: 'insights', href: '/admin/analytics', desc: 'Olfactory Performance' },
            { label: 'Reports', icon: 'assessment', href: '/admin/reports', desc: 'CSV Data Exports' },
            { label: 'Promotions', icon: 'campaign', href: '/admin/marketing', desc: 'Coupons & Banners' },
            { label: 'Reviews', icon: 'rate_review', href: '/admin/reviews', desc: 'Patron Feedback' },
            { label: 'Content CMS', icon: 'description', href: '/admin/content', desc: 'Homepage & Gazette' },
            { label: 'Theme', icon: 'palette', href: '/admin/theme', desc: 'Palette & Styling' },
            { label: 'System Settings', icon: 'settings', href: '/admin/settings', desc: 'Store Configuration' },
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
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <DashboardContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
