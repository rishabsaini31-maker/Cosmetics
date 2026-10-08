'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin, DateRangeOption } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminDashboard, updateAdminOrderStatus } from '@/services/adminApi';

function DashboardContent() {
  const { dateRange, setDateRange, showToast } = useAdmin();
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const categoryOptions = [
    'All',
    'Fragrance',
    'Skincare',
    'Makeup',
    'Body Care',
    'Beauty Essentials',
    'Hampers',
    'Combos',
  ];

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAdminDashboard(
        dateRange,
        selectedCategory,
        dateRange === 'Custom Range' ? customStart : undefined,
        dateRange === 'Custom Range' ? customEnd : undefined
      );

      if (res.success) {
        setData(res);
      } else {
        setError(res.message || 'Unable to load store performance metrics.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error while connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [dateRange, selectedCategory, customStart, customEnd]);

  const handleQuickStatusChange = async (orderId: string, status: string) => {
    const res = await updateAdminOrderStatus(orderId, status);
    if (res.success) {
      showToast(`Order ${orderId} status set to ${status}`, 'success');
      loadDashboard();
    } else {
      showToast(res.message || 'Failed to update order status', 'error');
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'delivered') return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (s === 'shipped') return 'bg-amber-50 text-amber-800 border-amber-200';
    if (s === 'processing' || s === 'confirmed') return 'bg-sky-50 text-sky-800 border-sky-200';
    if (s === 'pending') return 'bg-stone-100 text-stone-700 border-stone-300';
    if (s === 'cancelled' || s === 'refunded' || s === 'returned') return 'bg-red-50 text-red-800 border-red-200';
    return 'bg-surface-container-high text-primary border-surface-container-high';
  };

  // Skeleton Loader State
  if (loading && !data) {
    return (
      <div className="space-y-space-2xl animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between pb-space-md border-b border-surface-container-high gap-4">
          <div className="space-y-2">
            <div className="h-3 w-32 bg-surface-container-high rounded" />
            <div className="h-7 w-56 bg-surface-container-high rounded" />
          </div>
          <div className="h-9 w-40 bg-surface-container-high rounded" />
        </div>

        {/* KPI Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-surface-container-lowest p-space-lg border border-surface-container-high h-32 flex flex-col justify-between">
              <div className="h-3 w-28 bg-surface-container-high rounded" />
              <div className="h-8 w-36 bg-surface-container-high rounded my-2" />
              <div className="h-3 w-44 bg-surface-container-high rounded" />
            </div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-desktop">
          <div className="lg:col-span-2 bg-surface-container-lowest p-space-lg border border-surface-container-high h-80" />
          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high h-80" />
        </div>
      </div>
    );
  }

  // Error State Banner
  if (error && !data) {
    return (
      <div className="p-space-2xl bg-surface-container-lowest border border-red-200 text-center space-y-4 max-w-2xl mx-auto my-12">
        <span className="material-symbols-outlined text-4xl text-red-700">warning</span>
        <h3 className="font-display text-xl text-primary font-medium">Dashboard Unavailable</h3>
        <p className="font-body text-sm text-on-surface-variant">{error}</p>
        <button
          onClick={loadDashboard}
          className="px-6 py-2.5 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-widest hover:bg-black transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const orderStatuses = data?.orderStatuses || {};
  const revenueOverview = data?.revenueOverview || { chartPoints: [], hasData: false };
  const needsAttention = data?.needsAttention || [];
  const recentOrders = data?.recentOrders || [];
  const topProducts = data?.topProducts || [];
  const salesByCategory = data?.salesByCategory || [];
  const inventoryAlerts = data?.inventoryAlerts || [];
  const customerOverview = data?.customerOverview || {};
  const recentActivity = data?.recentActivity || [];

  // SVG Chart Calculation
  const chartPoints = revenueOverview.chartPoints || [];
  const maxChartVal = Math.max(
    1,
    ...chartPoints.map((p: any) =>
      activeChartMetric === 'revenue' ? p.revenue : activeChartMetric === 'orders' ? p.orders : p.aov
    )
  );

  return (
    <div className="space-y-space-2xl pb-16">
      
      {/* 1. STORE OVERVIEW SUBTITLE & GLOBAL DATE RANGE SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <p className="font-body text-xs text-secondary">
            Overview of your VĀNYA store performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
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

          {dateRange === 'Custom Range' && (
            <div className="flex items-center gap-1 mt-2 sm:mt-0">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="bg-surface-container-lowest border border-surface-container-high px-2 py-1 text-xs text-primary font-body"
              />
              <span className="text-xs text-outline">to</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="bg-surface-container-lowest border border-surface-container-high px-2 py-1 text-xs text-primary font-body"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. PRIMARY KPI CARDS ROW (6 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
        
        {/* KPI 1: TOTAL REVENUE */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between hover:border-surface-variant transition-colors">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              TOTAL REVENUE
            </span>
            <span className="font-display text-3xl font-bold text-primary block">
              {kpis.totalRevenue?.formatted || '—'}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className={`font-bold flex items-center gap-0.5 ${kpis.totalRevenue?.trend === 'down' ? 'text-red-700' : 'text-emerald-700'}`}>
              {kpis.totalRevenue?.trend === 'down' ? '↓' : '↑'} {kpis.totalRevenue?.change}
            </span>
            <span className="text-on-surface-variant font-body text-[0.7rem]">
              {kpis.totalRevenue?.prevText}
            </span>
          </div>
        </div>

        {/* KPI 2: ORDERS */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between hover:border-surface-variant transition-colors">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              ORDERS
            </span>
            <span className="font-display text-3xl font-bold text-primary block">
              {kpis.orders?.value ?? '—'}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className={`font-bold flex items-center gap-0.5 ${kpis.orders?.trend === 'down' ? 'text-red-700' : 'text-emerald-700'}`}>
              {kpis.orders?.trend === 'down' ? '↓' : '↑'} {kpis.orders?.change}
            </span>
            <span className="text-on-surface-variant font-body text-[0.7rem]">
              {kpis.orders?.prevText}
            </span>
          </div>
        </div>

        {/* KPI 3: AVERAGE ORDER VALUE */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between hover:border-surface-variant transition-colors">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              AVERAGE ORDER VALUE
            </span>
            <span className="font-display text-3xl font-bold text-primary block">
              {kpis.averageOrderValue?.formatted || '—'}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className={`font-bold flex items-center gap-0.5 ${kpis.averageOrderValue?.trend === 'down' ? 'text-red-700' : 'text-emerald-700'}`}>
              {kpis.averageOrderValue?.trend === 'down' ? '↓' : '↑'} {kpis.averageOrderValue?.change}
            </span>
            <span className="text-on-surface-variant font-body text-[0.7rem]">
              {kpis.averageOrderValue?.prevText}
            </span>
          </div>
        </div>

        {/* KPI 4: CUSTOMERS */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between hover:border-surface-variant transition-colors">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              CUSTOMERS
            </span>
            <span className="font-display text-3xl font-bold text-primary block">
              {kpis.customers?.value ?? '—'}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
              ↑ {kpis.customers?.change}
            </span>
            <span className="text-on-surface-variant font-body text-[0.7rem]">
              +{kpis.customers?.newCustomers || 0} new this period
            </span>
          </div>
        </div>

        {/* KPI 5: REFUNDS */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between hover:border-surface-variant transition-colors">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              REFUNDS
            </span>
            <span className="font-display text-3xl font-bold text-primary block">
              {kpis.refunds?.formatted || '₹0'}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className="text-on-surface-variant font-bold">
              {kpis.refunds?.change}
            </span>
            <span className="text-on-surface-variant font-body text-[0.7rem]">
              {kpis.refunds?.prevText}
            </span>
          </div>
        </div>

        {/* KPI 6: CONVERSION RATE */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between hover:border-surface-variant transition-colors">
          <div>
            <span className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
              CONVERSION RATE
            </span>
            <span className="font-body text-xs text-on-surface-variant font-medium block my-1">
              {kpis.conversionRate?.value || 'Analytics tracking not configured'}
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-surface-container-high flex items-center justify-between font-label-caps text-xs">
            <span className="text-outline text-[0.6875rem]">TRACKING STATUS</span>
            <span className="text-on-surface-variant font-body text-[0.7rem] italic">
              {kpis.conversionRate?.prevText}
            </span>
          </div>
        </div>
      </div>

      {/* 3. REVENUE OVERVIEW & NEEDS ATTENTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-desktop">
        
        {/* REVENUE OVERVIEW CHART (2 COLS) */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-space-md">
            <div>
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
                GROWTH ANALYTICS
              </span>
              <h2 className="font-display text-xl text-primary font-medium">
                REVENUE OVERVIEW
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Metric Tabs */}
              <div className="flex items-center border border-surface-container-high bg-surface-container-low p-0.5">
                <button
                  onClick={() => setActiveChartMetric('revenue')}
                  className={`px-3 py-1 font-label-caps text-[0.6875rem] uppercase tracking-wider transition-colors ${
                    activeChartMetric === 'revenue' ? 'bg-primary text-on-primary font-bold' : 'text-secondary hover:text-primary'
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setActiveChartMetric('orders')}
                  className={`px-3 py-1 font-label-caps text-[0.6875rem] uppercase tracking-wider transition-colors ${
                    activeChartMetric === 'orders' ? 'bg-primary text-on-primary font-bold' : 'text-secondary hover:text-primary'
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveChartMetric('aov')}
                  className={`px-3 py-1 font-label-caps text-[0.6875rem] uppercase tracking-wider transition-colors ${
                    activeChartMetric === 'aov' ? 'bg-primary text-on-primary font-bold' : 'text-secondary hover:text-primary'
                  }`}
                >
                  AOV
                </button>
              </div>

              <Link
                href="/admin/analytics"
                className="font-label-caps text-xs uppercase tracking-wider text-secondary hover:text-primary transition-colors font-bold whitespace-nowrap flex items-center gap-1"
              >
                View Analytics →
              </Link>
            </div>
          </div>

          {/* Minimal SVG Chart or Empty State */}
          {!revenueOverview.hasData || chartPoints.length === 0 ? (
            <div className="py-16 text-center space-y-2 border border-dashed border-surface-container-high bg-surface-container-low/30">
              <span className="material-symbols-outlined text-3xl text-outline">analytics</span>
              <h4 className="font-display text-base text-primary font-medium">No sales data available yet</h4>
              <p className="font-body text-xs text-on-surface-variant max-w-sm mx-auto">
                Once your store receives orders for the selected period, revenue trends will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-64 w-full relative pt-4 pb-2">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 200">
                  {/* Subtle Gridlines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#eae8e4" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#eae8e4" strokeDasharray="3 3" />
                  <line x1="0" y1="140" x2="500" y2="140" stroke="#eae8e4" strokeDasharray="3 3" />

                  {/* Line Generator */}
                  {(() => {
                    const pts = chartPoints.map((p: any, idx: number) => {
                      const val = activeChartMetric === 'revenue' ? p.revenue : activeChartMetric === 'orders' ? p.orders : p.aov;
                      const x = (idx / Math.max(1, chartPoints.length - 1)) * 480 + 10;
                      const y = 180 - (val / maxChartVal) * 150;
                      return { x, y, val, date: p.date };
                    });

                    const pathD = pts.reduce((acc: string, pt: any, i: number) => {
                      return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
                    }, '');

                    const areaD = `${pathD} L ${pts[pts.length - 1].x},190 L ${pts[0].x},190 Z`;

                    return (
                      <>
                        {/* Area Fill */}
                        <path d={areaD} fill="rgba(114, 91, 51, 0.08)" />
                        {/* Smooth Line */}
                        <path d={pathD} fill="none" stroke="#725b33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Data Points */}
                        {pts.map((pt: any, i: number) => (
                          <g key={i} className="group cursor-pointer">
                            <circle cx={pt.x} cy={pt.y} r="4" fill="#161616" stroke="#ffffff" strokeWidth="2" />
                            {/* Hover Tooltip */}
                            <title>{`${pt.date}: ${activeChartMetric === 'revenue' || activeChartMetric === 'aov' ? '₹' + pt.val.toLocaleString('en-IN') : pt.val + ' orders'}`}</title>
                          </g>
                        ))}
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Date Labels Bar */}
              <div className="flex justify-between font-label-caps text-[0.625rem] text-outline uppercase tracking-wider pt-2 border-t border-surface-container-high">
                {chartPoints.filter((_: any, idx: number) => idx % Math.max(1, Math.floor(chartPoints.length / 6)) === 0).map((p: any, i: number) => (
                  <span key={i}>{p.date}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* NEEDS ATTENTION SECTION (1 COL) */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-surface-container-high pb-space-md mb-4 flex items-center justify-between">
              <div>
                <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
                  OPERATIONAL ALERTS
                </span>
                <h3 className="font-display text-xl text-primary font-medium">
                  NEEDS ATTENTION
                </h3>
              </div>
              <span className="material-symbols-outlined text-outline text-xl">priority_high</span>
            </div>

            {needsAttention.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <span className="material-symbols-outlined text-emerald-700 text-3xl">check_circle</span>
                <p className="font-body text-xs text-primary font-medium">No urgent items requiring attention</p>
                <p className="font-body text-[0.7rem] text-on-surface-variant">All inventory and order fulfillment operations are clean.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {needsAttention.map((alert: any) => (
                  <div
                    key={alert.id}
                    className={`p-3 border flex items-center justify-between text-xs font-body transition-colors ${
                      alert.type === 'error'
                        ? 'bg-red-50/50 border-red-200 text-red-900'
                        : alert.type === 'warning'
                        ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                        : 'bg-surface-container-low border-surface-container-high text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-base ${alert.type === 'error' ? 'text-red-700' : alert.type === 'warning' ? 'text-amber-700' : 'text-secondary'}`}>
                        {alert.type === 'error' ? 'cancel' : alert.type === 'warning' ? 'error' : 'info'}
                      </span>
                      <span className="font-medium">{alert.message}</span>
                    </div>

                    <Link
                      href={alert.link.startsWith('/admin') ? alert.link : `/admin${alert.link}`}
                      className="font-label-caps text-[0.625rem] uppercase tracking-wider text-secondary font-bold hover:text-primary whitespace-nowrap ml-2 flex items-center gap-0.5"
                    >
                      → {alert.actionText || 'View'}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-surface-container-high text-[0.6875rem] font-label-caps uppercase text-outline flex items-center justify-between">
            <span>STORE STATUS</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> OPERATIONAL
            </span>
          </div>
        </div>

      </div>

      {/* 4. ORDER OVERVIEW STATUS BAR */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-high pb-space-sm">
          <div>
            <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
              FULFILLMENT BREAKDOWN
            </span>
            <h3 className="font-display text-xl text-primary font-medium">
              ORDER OVERVIEW
            </h3>
          </div>
          <Link href="/admin/orders" className="font-label-caps text-xs uppercase tracking-wider text-secondary hover:text-primary font-bold">
            VIEW ALL ORDERS →
          </Link>
        </div>

        {/* Order Status Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: 'Pending', count: orderStatuses.pending, status: 'pending' },
            { label: 'Confirmed', count: orderStatuses.confirmed, status: 'confirmed' },
            { label: 'Processing', count: orderStatuses.processing, status: 'processing' },
            { label: 'Shipped', count: orderStatuses.shipped, status: 'shipped' },
            { label: 'Delivered', count: orderStatuses.delivered, status: 'delivered' },
            { label: 'Cancelled', count: orderStatuses.cancelled, status: 'cancelled' },
            { label: 'Returned', count: orderStatuses.returned, status: 'returned' },
            { label: 'Refunded', count: orderStatuses.refunded, status: 'refunded' },
          ].map((item) => (
            <Link
              key={item.label}
              href={`/admin/orders?status=${item.status}`}
              className="p-3 bg-surface-container-low border border-surface-container-high hover:border-primary transition-all text-center group"
            >
              <span className="font-label-caps text-[0.625rem] uppercase tracking-wider text-outline group-hover:text-primary block mb-1">
                {item.label}
              </span>
              <span className="font-display text-xl font-bold text-primary block">
                {item.count || 0}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. RECENT ORDERS TABLE */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container-high pb-space-sm">
          <div>
            <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
              LATEST TRANSACTIONS
            </span>
            <h3 className="font-display text-xl text-primary font-medium">
              RECENT ORDERS
            </h3>
          </div>
          <Link href="/admin/orders" className="font-label-caps text-xs uppercase tracking-wider text-secondary hover:text-primary font-bold">
            VIEW ALL ORDERS →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-12 text-center space-y-2 border border-dashed border-surface-container-high">
            <span className="material-symbols-outlined text-3xl text-outline">shopping_bag</span>
            <h4 className="font-display text-base text-primary font-medium">No orders have been placed yet</h4>
            <p className="font-body text-xs text-on-surface-variant">Customer orders will be listed here as soon as purchases occur.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-xs">
              <thead>
                <tr className="border-b border-surface-container-high font-label-caps text-[0.6875rem] text-outline uppercase tracking-wider bg-surface-container-low/40">
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-primary">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4 text-primary font-medium">
                      {order.customerName}
                      <span className="block text-[0.7rem] font-normal text-on-surface-variant">
                        {order.customerEmail}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant whitespace-nowrap">
                      {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant">
                      {order.items?.length || 1} item{(order.items?.length || 1) > 1 ? 's' : ''}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-primary">
                      {order.formattedAmount || `₹${(order.amount || 0).toLocaleString('en-IN')}`}
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant">
                      <span className="inline-block px-2 py-0.5 text-[0.6875rem] font-label-caps uppercase bg-surface-container-low border border-surface-container-high">
                        {order.paymentStatus || 'Paid'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 text-[0.625rem] font-label-caps uppercase tracking-wider border font-bold ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold hover:text-primary"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 6. MIDDLE GRID: TOP PRODUCTS & SALES BY CATEGORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
        
        {/* TOP PRODUCTS */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm space-y-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-container-high pb-space-sm">
            <div>
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
                CATALOG PERFORMANCE
              </span>
              <h3 className="font-display text-xl text-primary font-medium">
                TOP PRODUCTS
              </h3>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-surface-container-lowest border border-surface-container-high px-2.5 py-1 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none focus:border-primary shadow-sm"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {topProducts.length === 0 ? (
            <div className="py-12 text-center space-y-2 border border-dashed border-surface-container-high">
              <span className="material-symbols-outlined text-3xl text-outline">inventory_2</span>
              <h4 className="font-display text-base text-primary font-medium">NO PRODUCT SALES YET</h4>
              <p className="font-body text-xs text-on-surface-variant">Product performance will appear once orders are placed.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p: any) => (
                <div key={p.id} className="p-3 bg-surface-container-low border border-surface-container-high flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover border border-surface-container-high" />
                    <div>
                      <h4 className="font-body text-xs font-semibold text-primary line-clamp-1">{p.name}</h4>
                      <span className="font-label-caps text-[0.625rem] uppercase text-outline tracking-wider block">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-body text-xs">
                    <span className="font-semibold text-primary block">{p.formattedRevenue}</span>
                    <span className="text-on-surface-variant text-[0.7rem] block">{p.unitsSold} sold • {p.stock} stock</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SALES BY CATEGORY */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm space-y-space-md">
          <div className="border-b border-surface-container-high pb-space-sm">
            <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
              REVENUE DISTRIBUTION
            </span>
            <h3 className="font-display text-xl text-primary font-medium">
              SALES BY CATEGORY
            </h3>
          </div>

          <div className="space-y-4">
            {salesByCategory.map((cat: any) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex items-center justify-between font-body text-xs">
                  <span className="font-medium text-primary">{cat.category}</span>
                  <div className="text-right font-label-caps">
                    <span className="font-bold text-primary">{cat.formattedRevenue}</span>
                    <span className="text-outline text-[0.6875rem] ml-2">({cat.revenueShare}%)</span>
                  </div>
                </div>
                {/* Minimal Progress Bar */}
                <div className="h-1.5 w-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-secondary transition-all duration-500"
                    style={{ width: `${Math.max(2, cat.revenueShare)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7. LOWER GRID: INVENTORY ALERTS & CUSTOMER OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-desktop">
        
        {/* INVENTORY ALERTS */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm space-y-space-md">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
            <div>
              <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
                STOCK MONITORING
              </span>
              <h3 className="font-display text-xl text-primary font-medium">
                INVENTORY ALERTS
              </h3>
            </div>
            <Link href="/admin/inventory" className="font-label-caps text-xs uppercase tracking-wider text-secondary hover:text-primary font-bold">
              VIEW INVENTORY →
            </Link>
          </div>

          {inventoryAlerts.length === 0 ? (
            <div className="py-12 text-center space-y-2 border border-dashed border-surface-container-high">
              <span className="material-symbols-outlined text-emerald-700 text-3xl">check_circle</span>
              <h4 className="font-display text-base text-primary font-medium">NO INVENTORY ALERTS</h4>
              <p className="font-body text-xs text-on-surface-variant">All products currently have sufficient stock levels.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {inventoryAlerts.map((item: any) => (
                <div key={item.id} className="p-3 bg-surface-container-low border border-surface-container-high flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover border border-surface-container-high" />
                    <div>
                      <h4 className="font-body text-xs font-semibold text-primary">{item.name}</h4>
                      <span className="font-mono text-[0.6875rem] text-outline block">{item.sku}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right font-body text-xs">
                      <span className={`font-bold block ${item.currentStock === 0 ? 'text-red-700' : 'text-amber-700'}`}>
                        {item.currentStock} units left
                      </span>
                      <span className="text-outline text-[0.6875rem]">Threshold: {item.threshold}</span>
                    </div>

                    <Link
                      href={`/admin/inventory?id=${item.id}`}
                      className="px-3 py-1 bg-surface-container-lowest border border-surface-container-high hover:border-primary font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold whitespace-nowrap"
                    >
                      Update Stock
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CUSTOMER OVERVIEW */}
        <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm space-y-space-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-surface-container-high pb-space-sm mb-4">
              <div>
                <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
                  AUDIENCE INSIGHTS
                </span>
                <h3 className="font-display text-xl text-primary font-medium">
                  CUSTOMER OVERVIEW
                </h3>
              </div>
              <Link href="/admin/customers" className="font-label-caps text-xs uppercase tracking-wider text-secondary hover:text-primary font-bold">
                VIEW CUSTOMERS →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-surface-container-low border border-surface-container-high">
                <span className="font-label-caps text-[0.625rem] uppercase text-outline block mb-1">TOTAL CLIENTELE</span>
                <span className="font-display text-2xl font-bold text-primary block">{customerOverview.totalCustomers || 0}</span>
                <span className="font-body text-[0.7rem] text-emerald-700 font-medium">Active database users</span>
              </div>

              <div className="p-4 bg-surface-container-low border border-surface-container-high">
                <span className="font-label-caps text-[0.625rem] uppercase text-outline block mb-1">NEW THIS PERIOD</span>
                <span className="font-display text-2xl font-bold text-primary block">{customerOverview.newCustomers || 0}</span>
                <span className="font-body text-[0.7rem] text-secondary font-medium">Registrations</span>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border border-surface-container-high flex items-center justify-between">
              <div>
                <span className="font-label-caps text-[0.625rem] uppercase text-outline block mb-0.5">RETURNING CUSTOMERS</span>
                <span className="font-body text-xs font-semibold text-primary">{customerOverview.returningCustomers || 0} Clients</span>
              </div>
              <div className="text-right">
                <span className="font-label-caps text-[0.625rem] uppercase text-outline block mb-0.5">REPEAT PURCHASE RATE</span>
                <span className="font-display text-lg font-bold text-emerald-700">{customerOverview.repeatPurchaseRate || '0%'}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-container-high text-right">
            <Link
              href="/admin/customers"
              className="font-label-caps text-xs uppercase tracking-wider text-secondary hover:text-primary font-bold inline-flex items-center gap-1"
            >
              Manage Customer Directory →
            </Link>
          </div>
        </div>

      </div>

      {/* 8. QUICK ACTIONS SECTION */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm space-y-space-md">
        <div className="border-b border-surface-container-high pb-space-sm">
          <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
            STORE MANAGEMENT
          </span>
          <h3 className="font-display text-xl text-primary font-medium">
            QUICK ACTIONS
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-primary text-on-primary hover:bg-black font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span> + Add Product
          </Link>
          <Link
            href="/admin/hampers"
            className="px-4 py-2.5 bg-surface-container-low border border-surface-container-high hover:border-primary text-primary font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">card_giftcard</span> + Create Hamper
          </Link>
          <Link
            href="/admin/combos"
            className="px-4 py-2.5 bg-surface-container-low border border-surface-container-high hover:border-primary text-primary font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">style</span> + Create Combo
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2.5 bg-surface-container-low border border-surface-container-high hover:border-primary text-primary font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">local_shipping</span> View Orders
          </Link>
          <Link
            href="/admin/coupons"
            className="px-4 py-2.5 bg-surface-container-low border border-surface-container-high hover:border-primary text-primary font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">confirmation_number</span> Create Coupon
          </Link>
          <Link
            href="/admin/content/homepage"
            className="px-4 py-2.5 bg-surface-container-low border border-surface-container-high hover:border-primary text-primary font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">edit_note</span> Edit Homepage
          </Link>
          <Link
            href="/admin/reports"
            className="px-4 py-2.5 bg-surface-container-low border border-surface-container-high hover:border-primary text-primary font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">assessment</span> View Reports
          </Link>
        </div>
      </div>

      {/* 9. RECENT ACTIVITY LOG SECTION */}
      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm space-y-space-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
          <div>
            <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-0.5">
              SYSTEM AUDIT
            </span>
            <h3 className="font-display text-xl text-primary font-medium">
              RECENT ACTIVITY
            </h3>
          </div>
          <Link href="/admin/activity" className="font-label-caps text-xs uppercase tracking-wider text-secondary hover:text-primary font-bold">
            VIEW FULL AUDIT LOG →
          </Link>
        </div>

        {recentActivity.length === 0 ? (
          <div className="py-12 text-center space-y-2 border border-dashed border-surface-container-high">
            <span className="material-symbols-outlined text-3xl text-outline">history</span>
            <h4 className="font-display text-base text-primary font-medium">NO RECENT ACTIVITY</h4>
            <p className="font-body text-xs text-on-surface-variant">Admin operations and content changes will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((log: any, idx: number) => (
              <div key={log.id || idx} className="p-3 bg-surface-container-low border border-surface-container-high flex items-center justify-between text-xs font-body">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold font-label-caps text-xs">
                    {(log.user || 'A')[0].toUpperCase()}
                  </span>
                  <div>
                    <span className="font-semibold text-primary">{log.action || 'Admin Action'}</span>
                    <span className="text-on-surface-variant block text-[0.7rem]">{log.details || log.target || 'General configuration'}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-medium text-primary block">{log.user || 'VĀNYA Admin'}</span>
                  <span className="text-outline text-[0.6875rem]">
                    {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
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
