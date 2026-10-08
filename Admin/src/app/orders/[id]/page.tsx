'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminOrderById, updateAdminOrderStatus } from '@/services/adminApi';

function OrderDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useAdmin();
  const orderId = (params?.id as string) || '';

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const loadOrder = async () => {
    setLoading(true);
    const res = await fetchAdminOrderById(orderId);
    if (res.success && res.data) {
      setOrder(res.data);
      setSelectedStatus(res.data.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateAdminOrderStatus(orderId, selectedStatus, statusNote);
    if (res.success) {
      showToast(`Order status updated to ${selectedStatus}`, 'success');
      setStatusNote('');
      loadOrder();
    } else {
      showToast(res.message || 'Update failed', 'error');
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (loading || !order) {
    return (
      <div className="py-space-3xl text-center font-label-caps text-xs uppercase tracking-widest text-secondary animate-pulse">
        Loading Order Dispatch Details...
      </div>
    );
  }

  return (
    <div className="space-y-space-2xl print:bg-white print:p-0">
      
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-space-md border-b border-surface-container-high print:hidden">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/orders" className="hover:text-primary">Orders</Link>
            <span>/</span>
            <span className="text-primary font-semibold">{order.id}</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium flex items-center gap-3">
            <span>Order #{order.id}</span>
            <span className="text-xs font-label-caps uppercase tracking-wider px-3 py-1 bg-surface-container text-secondary border border-surface-container-high">
              {order.status}
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrintInvoice}
            className="bg-surface-container-lowest text-primary border border-surface-container-high font-label-caps text-xs uppercase tracking-wider px-4 py-2 hover:border-primary transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>PRINT INVOICE</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Customer Info & Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
        
        {/* Left Column: Items & Timeline */}
        <div className="lg:col-span-8 space-y-space-xl">
          
          {/* Order Items Table */}
          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
            <h2 className="font-display text-xl text-primary font-medium mb-space-md border-b border-surface-container-high pb-2">
              Order Items ({order.items?.length || 0})
            </h2>

            <div className="space-y-space-md">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between gap-4 pb-3 border-b border-surface-container-high last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover border border-surface-container-high flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-base text-primary font-medium">{item.name}</h3>
                      <span className="font-label-caps text-[0.625rem] uppercase tracking-wider text-secondary block">{item.category}</span>
                      <span className="font-mono text-xs text-outline block">Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-primary block">₹{(item.total || item.quantity * item.unitPrice).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
            <h2 className="font-display text-xl text-primary font-medium mb-space-md border-b border-surface-container-high pb-2">
              Order Dispatch Timeline
            </h2>

            <div className="relative border-l-2 border-surface-container-high ml-3 space-y-space-md pt-1 pb-1">
              {order.timeline?.map((step: any, idx: number) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secondary border-2 border-surface" />
                  <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold block">
                    {step.state}
                  </span>
                  <span className="font-mono text-[0.6875rem] text-outline block">
                    {new Date(step.timestamp).toLocaleString('en-IN')}
                  </span>
                  {step.note && (
                    <p className="font-body text-xs text-on-surface-variant mt-0.5">{step.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status Update Form */}
          <div className="bg-surface-container-low p-space-lg border border-surface-container-high print:hidden">
            <h2 className="font-display text-lg text-primary font-medium mb-3">
              Update Order Status
            </h2>
            <form onSubmit={handleStatusUpdate} className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1">
                <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">
                  NEW STATUS
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2 font-label-caps text-xs uppercase tracking-wider text-primary focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div className="flex-2 w-full sm:w-auto">
                <label className="font-label-caps text-[0.625rem] uppercase tracking-wider text-primary font-bold block mb-1">
                  STATUS NOTE / WAYBILL REF
                </label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Bluedart Tracking #9948201"
                  className="w-full bg-surface-container-lowest border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-2.5 hover:bg-tertiary-container transition-colors"
              >
                UPDATE STATUS
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Customer Details & Financials */}
        <div className="lg:col-span-4 space-y-space-xl">
          
          {/* Customer Monograph */}
          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
            <h2 className="font-display text-lg text-primary font-medium mb-3 border-b border-surface-container-high pb-2">
              Customer Monograph
            </h2>

            <div className="space-y-2 font-body text-xs text-on-surface-variant">
              <div>
                <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block">NAME</span>
                <span className="text-primary font-medium">{order.customerName}</span>
              </div>
              <div>
                <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block">EMAIL</span>
                <span className="font-mono text-primary">{order.customerEmail}</span>
              </div>
              {order.customerPhone && (
                <div>
                  <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block">PHONE</span>
                  <span className="font-mono">{order.customerPhone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
            <h2 className="font-display text-lg text-primary font-medium mb-3 border-b border-surface-container-high pb-2">
              Shipping Address
            </h2>

            <div className="font-body text-xs text-on-surface-variant leading-relaxed">
              <p className="font-medium text-primary">{order.customerName}</p>
              <p>{order.shippingAddress?.street}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}</p>
              <p className="uppercase font-label-caps text-[0.625rem] text-secondary font-bold mt-1">{order.shippingAddress?.country || 'India'}</p>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high">
            <h2 className="font-display text-lg text-primary font-medium mb-3 border-b border-surface-container-high pb-2">
              Financial Breakdown
            </h2>

            <div className="space-y-2 font-body text-xs text-on-surface-variant border-b border-surface-container-high pb-3 mb-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-primary">₹{(order.subtotal || order.amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="font-mono text-secondary">-₹{(order.discount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-primary">₹{(order.shippingFee || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (GST 18%)</span>
                <span className="font-mono text-primary">₹{(order.tax || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center font-display text-xl text-primary font-bold">
              <span>Grand Total</span>
              <span className="font-mono">{order.formattedAmount}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-container-high font-body text-xs text-on-surface-variant">
              <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block">PAYMENT METHOD</span>
              <span>{order.paymentMethod} ({order.paymentStatus})</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function OrderDetailPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <OrderDetailContent />
      </AdminLayout>
    </AdminProvider>
  );
}
