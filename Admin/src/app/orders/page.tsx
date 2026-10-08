'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminOrders, updateAdminOrderStatus } from '@/services/adminApi';

function OrdersListContent() {
  const { showToast } = useAdmin();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadOrders = async () => {
    setLoading(true);
    const res = await fetchAdminOrders(selectedStatus, selectedPaymentStatus, searchQuery);
    if (res.success) {
      setOrders(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [selectedStatus, selectedPaymentStatus, searchQuery]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updateAdminOrderStatus(id, newStatus);
    if (res.success) {
      showToast(`Order #${id} status updated to ${newStatus}`, 'success');
      loadOrders();
    } else {
      showToast(res.message || 'Status update failed', 'error');
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) {
      showToast('No order records to export', 'info');
      return;
    }
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Date', 'Status', 'Payment Method', 'Payment Status', 'Items Count', 'Total Amount'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      o.customerEmail,
      o.date,
      o.status,
      o.paymentMethod,
      o.paymentStatus,
      o.itemsCount,
      o.amount,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VANYA_Orders_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders exported to CSV successfully', 'success');
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high">
        <div>
          <span className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-bold block mb-1">
            COMMERCE DISPATCH
          </span>
          <h1 className="font-display text-3xl text-primary font-medium">
            Order Management & Waybills
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-surface-container-lowest text-primary border border-surface-container-high font-label-caps text-xs uppercase tracking-wider px-4 py-2 hover:border-primary transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>EXPORT ORDERS CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high space-y-space-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">
              FILTER BY ORDER STATUS
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
            >
              <option value="">All Fulfillment Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">
              FILTER BY PAYMENT STATUS
            </label>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
            >
              <option value="">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div>
            <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">
              SEARCH PATRON / ORDER #
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, name or email..."
              className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-space-2xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
            Fetching Patron Orders...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body text-xs">
              <thead>
                <tr className="border-b border-surface-container-high text-secondary font-label-caps text-[0.6875rem] uppercase tracking-wider">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Patron Details</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Fulfillment</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Flacons Count</th>
                  <th className="py-3 px-3">Total Amount</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-surface-container-high hover:bg-surface-container-low transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-primary">
                        <Link href={`/orders/${order.id}`} className="hover:underline">
                          #{order.id}
                        </Link>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-primary block">{order.customerName}</span>
                        <span className="font-mono text-[0.6875rem] text-outline block">{order.customerEmail}</span>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant font-mono">{order.date}</td>
                      <td className="py-3 px-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="bg-surface border border-surface-container-high px-2 py-1 font-label-caps text-[0.625rem] uppercase tracking-wider font-bold text-primary focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2 py-0.5 font-label-caps text-[0.625rem] uppercase tracking-wider font-bold border ${
                          order.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {order.paymentStatus} ({order.paymentMethod})
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-center">{order.itemsCount}</td>
                      <td className="py-3 px-3 font-mono font-bold text-primary">{order.formattedAmount}</td>
                      <td className="py-3 px-3 text-right">
                        <Link href={`/orders/${order.id}`} className="font-label-caps text-xs text-secondary font-bold uppercase hover:underline">
                          View Invoice →
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-space-xl text-center font-editorial-serif text-sm text-on-surface-variant">
                      No customer orders match the specified filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <OrdersListContent />
      </AdminLayout>
    </AdminProvider>
  );
}
