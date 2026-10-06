'use client';

import { useState } from 'react';
import Link from 'next/link';
import CustomerCareNav from '@/components/CustomerCareNav';
import { lookupOrder, Order, MOCK_ORDERS } from '@/data/orders';

const STATUS_STEPS = [
  'ORDER CONFIRMED',
  'PROCESSING',
  'SHIPPED',
  'OUT FOR DELIVERY',
  'DELIVERED',
];

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [verificationInput, setVerificationInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setErrorMessage('');

    if (!orderNumber.trim()) {
      setErrorMessage('Please enter a valid order number.');
      setActiveOrder(null);
      return;
    }

    const order = lookupOrder(orderNumber, verificationInput);
    if (!order) {
      setErrorMessage('No order found matching the provided order number and email/phone verification.');
      setActiveOrder(null);
    } else {
      setActiveOrder(order);
    }
  };

  const getStepStatus = (stepName: string, currentStatus: string) => {
    const currentIndex = STATUS_STEPS.indexOf(currentStatus);
    const stepIndex = STATUS_STEPS.indexOf(stepName);

    if (currentStatus === 'CANCELLED' || currentStatus === 'RETURNED' || currentStatus === 'REFUNDED') {
      return 'inactive';
    }

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      <CustomerCareNav />

      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/customer-care" className="hover:text-primary">Customer Care</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Order Tracking</span>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-space-2xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold block mb-1">
            Dispatch Monograph & Courier Status
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mb-space-sm">
            ORDER TRACKING
          </h1>
          <p className="font-editorial-serif text-lg text-on-surface-variant leading-relaxed">
            Track your VĀNYA order from confirmation to delivery.
          </p>
        </div>

        {/* Tracking Search Form Box */}
        <div className="bg-surface-container-lowest border border-surface-container-high p-space-xl shadow-sm mb-space-2xl max-w-3xl">
          <h2 className="font-label-caps text-xs uppercase tracking-[0.2em] font-bold text-primary mb-space-md">
            ENTER DISPATCH CREDS
          </h2>
          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-space-md items-end">
            <div className="sm:col-span-5">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Order Number *
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. VNY-948201 or VAN-9821-IN"
                required
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                Email or Mobile Number
              </label>
              <input
                type="text"
                value={verificationInput}
                onChange={(e) => setVerificationInput(e.target.value)}
                placeholder="Verification email/phone"
                className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2.5 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] py-3 hover:bg-tertiary-container transition-colors"
              >
                TRACK ORDER
              </button>
            </div>
          </form>

          {/* Quick Demo Selector for instant testing */}
          <div className="mt-space-md pt-space-sm border-t border-surface-container-high/60 flex items-center gap-2 font-label-caps text-[0.6875rem] text-on-surface-variant">
            <span className="uppercase text-secondary font-semibold">Demo Orders:</span>
            {MOCK_ORDERS.map((o) => (
              <button
                key={o.orderNumber}
                type="button"
                onClick={() => {
                  setOrderNumber(o.orderNumber);
                  setVerificationInput(o.email);
                  setActiveOrder(o);
                  setSearched(true);
                  setErrorMessage('');
                }}
                className="underline hover:text-primary"
              >
                {o.orderNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Error / Verification Failed Message */}
        {searched && errorMessage && (
          <div className="bg-surface-container-lowest border border-error/30 p-space-xl max-w-3xl mb-space-2xl text-center">
            <span className="material-symbols-outlined text-4xl text-error block mb-2 opacity-70">
              sentiment_dissatisfied
            </span>
            <h3 className="font-display text-xl text-primary mb-2">Verification Failed or Order Not Found</h3>
            <p className="font-editorial-serif text-sm text-on-surface-variant mb-space-md">
              {errorMessage}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-2.5"
            >
              Contact Atelier Concierge
            </Link>
          </div>
        )}

        {/* Active Tracked Order Details */}
        {activeOrder && (
          <div className="space-y-space-xl max-w-4xl">
            {/* Header info */}
            <div className="bg-surface-container-lowest border border-surface-container-high p-space-xl shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md border-b border-surface-container-high gap-4 mb-space-xl">
                <div>
                  <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary font-bold block mb-1">
                    ORDER DISPATCH DOSSIER
                  </span>
                  <h2 className="font-display text-3xl text-primary">
                    Order Ref: {activeOrder.orderNumber}
                  </h2>
                  <p className="font-body text-xs text-on-surface-variant mt-1">
                    Placed on {activeOrder.orderDate} • Est. Delivery: <strong className="text-primary">{activeOrder.estimatedDelivery}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block bg-surface-container-low text-secondary border border-surface-container-high font-label-caps text-xs px-3 py-1.5 uppercase tracking-wider font-bold">
                    Status: {activeOrder.status}
                  </span>
                  {activeOrder.trackingNumber && (
                    <p className="font-label-caps text-[0.6875rem] text-on-surface-variant mt-2 uppercase tracking-wider">
                      {activeOrder.courierName}: <strong>{activeOrder.trackingNumber}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Status Timeline Bar */}
              <div className="my-space-xl">
                <h3 className="font-label-caps text-xs uppercase tracking-[0.2em] font-bold text-primary mb-space-lg">
                  FULFILMENT TIMELINE
                </h3>

                {activeOrder.status === 'CANCELLED' || activeOrder.status === 'REFUNDED' ? (
                  <div className="bg-error-container/20 border border-error text-error p-space-md font-label-caps text-xs uppercase tracking-wider">
                    THIS ORDER HAS BEEN {activeOrder.status}. PLEASE CONTACT CONCIERGE FOR DETAILS.
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-2 relative text-center">
                    {STATUS_STEPS.map((step, idx) => {
                      const state = getStepStatus(step, activeOrder.status);
                      const isCompleted = state === 'completed';
                      const isActive = state === 'active';

                      return (
                        <div key={step} className="flex flex-col items-center">
                          {/* Dot / Indicator */}
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-label-caps text-[10px] mb-2 font-semibold transition-all ${
                              isCompleted
                                ? 'bg-secondary text-on-secondary'
                                : isActive
                                ? 'bg-primary text-on-primary ring-4 ring-primary/20'
                                : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                          >
                            {isCompleted ? '✓' : idx + 1}
                          </div>

                          <span
                            className={`font-label-caps text-[0.625rem] uppercase tracking-wider ${
                              isActive
                                ? 'text-primary font-bold'
                                : isCompleted
                                ? 'text-secondary font-semibold'
                                : 'text-on-surface-variant/60'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Order Items & Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg pt-space-md border-t border-surface-container-high">
                {/* Items list */}
                <div className="md:col-span-7 space-y-space-md">
                  <h4 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-2">
                    ITEMS IN THIS PACKAGE
                  </h4>
                  {activeOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-space-md bg-surface-container-low p-space-sm border border-surface-container-high">
                      <img src={item.image} alt={item.name} className="w-14 h-18 object-cover border border-surface-container-high" />
                      <div>
                        <span className="font-label-caps text-[0.625rem] text-secondary uppercase tracking-widest block">
                          {item.category}
                        </span>
                        <h5 className="font-display text-sm text-primary font-medium">{item.name}</h5>
                        <p className="font-body text-xs text-on-surface-variant mt-0.5">
                          Qty: {item.quantity} × {item.formattedPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address & Payment Breakdown */}
                <div className="md:col-span-5 bg-surface-container-low p-space-md border border-surface-container-high space-y-space-md">
                  <div>
                    <h4 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-1">
                      VERIFIED SHIPPING ADDRESS
                    </h4>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                      <strong>{activeOrder.shippingAddress.fullName}</strong><br />
                      {activeOrder.shippingAddress.street}<br />
                      {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.pincode}
                    </p>
                  </div>

                  <div className="pt-space-sm border-t border-surface-container-high">
                    <h4 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold mb-1">
                      PAYMENT SUMMARY
                    </h4>
                    <div className="flex justify-between font-body text-xs text-on-surface-variant py-0.5">
                      <span>Subtotal</span>
                      <span>₹{activeOrder.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-xs text-on-surface-variant py-0.5">
                      <span>Insured Courier Shipping</span>
                      <span>{activeOrder.shippingFee === 0 ? 'FREE' : `₹${activeOrder.shippingFee}`}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm font-bold text-primary pt-1 border-t border-surface-container-high">
                      <span>Total Paid</span>
                      <span>{activeOrder.formattedTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
