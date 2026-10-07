'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminOrders, updateAdminOrderStatus } from '@/services/adminApi';

function OrdersContent() {
  const { showToast } = useAdmin();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [search, setSearch] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    const res = await fetchAdminOrders(statusFilter, paymentFilter, search);
    if (res.success) {
      setOrders(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter, paymentFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadOrders();
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    const res = await updateAdminOrderStatus(orderId, status);
    if (res.success) {
      showToast(`Order ${orderId} updated to ${status}`, 'success');
      loadOrders();
    } else {
      showToast(res.message || 'Status update failed', 'error');
    }
  };

  const handleExportCsv = () => {
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Date', 'Amount', 'Payment Status', 'Fulfillment Status', 'Status'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      o.customerEmail,
      new Date(o.date).toISOString().split('T')[0],
      o.amount,
      o.paymentStatus,
      o.fulfillmentStatus || o.status,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VANYA_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Orders exported to CSV', 'info');
  };

  return (
    <div className="space-y-space-xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            COMMERCE DISPATCH
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Orders Management
          </h1>
        </div>

        <button
          onClick={handleExportCsv}
          className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-2 hover:bg-tertiary-container transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>EXPORT CSV</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-surface-container-lowest p-space-md border border-surface-container-high flex flex-col md:flex-row md:items-center justify-between gap- space-md">
        
        <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container-low border border-surface-container-high px-3 py-1.5 flex-1 max-w-md">
          <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, customer name or email..."
            className="bg-transparent font-body text-xs text-on-surface focus:outline-none w-full"
          />
        </form>

        <div className="flex flex-wrap items-center gap-space-sm font-label-caps text-xs uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <span className="text-outline">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface-container-low border border-surface-container-high px-2 py-1 text-primary focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-outline">Payment:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-surface-container-low border border-surface-container-high px-2 py-1 text-primary focus:outline-none"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

      </div>

      {/* Order Table */}
      <div className="bg-surface-container-lowest border border-surface-container-high overflow-x-auto">
        {loading ? (
          <div className="p-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Fetching order dispatches...
          </div>
        ) : orders.length > 0 ? (
          <table className="w-full text-left font-body text-xs border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-container-high font-label-caps text-[0.6875rem] uppercase tracking-wider text-secondary">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Fulfillment</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-3 font-mono text-primary font-bold">{o.id}</td>
                  <td className="p-3">
                    <span className="font-medium text-primary block">{o.customerName}</span>
                    <span className="font-mono text-[0.6875rem] text-outline">{o.customerEmail}</span>
                  </td>
                  <td className="p-3 text-on-surface-variant whitespace-nowrap">
                    {new Date(o.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-3 text-on-surface-variant">{o.items?.length || 1} item(s)</td>
                  <td className="p-3 font-medium text-primary">{o.formattedAmount}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3 font-label-caps text-[0.625rem] uppercase tracking-wider text-on-surface-variant">
                    {o.fulfillmentStatus || o.status}
                  </td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      className="bg-surface-container-lowest border border-surface-container-high px-2 py-1 font-label-caps text-[0.625rem] uppercase tracking-wider text-primary focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="font-label-caps text-xs uppercase tracking-wider text-secondary font-bold hover:underline"
                    >
                      View Order →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-space-3xl text-center">
            <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-2">
              NO ORDERS FOUND
            </span>
            <p className="font-editorial-serif text-sm text-on-surface-variant max-w-md mx-auto">
              No customer orders match the selected filters or search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayout>
          <OrdersContent />
        </AdminLayout>
      </AdminProvider>
    </AuthProvider>
  );
}
