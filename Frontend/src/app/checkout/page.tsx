'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: 'Rishab',
    lastName: 'Saini',
    email: 'rishab@vanya.com',
    phone: '+91 98765 43210',
    address: '12 Atelier Boulevard, Malabar Hill',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400006',
    paymentMethod: 'upi',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingFee = totalAmount > 999 ? 0 : 150;
  const grandTotal = totalAmount + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `VNY-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <main className="w-full bg-surface min-h-screen py-space-3xl flex items-center justify-center">
        <div className="max-w-md w-full bg-surface-container-lowest p-space-2xl border border-surface-container-high shadow-2xl text-center">
          <span className="material-symbols-outlined text-5xl text-secondary block mb-space-md">
            check_circle
          </span>
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
            Order Confirmation
          </span>
          <h1 className="font-display text-3xl text-primary mt-space-xs mb-space-xs">
            Thank You for Your Order
          </h1>
          <p className="font-editorial-serif text-sm text-on-surface-variant mb-space-md">
            Your archival flacons have been reserved under Reference ID:
          </p>
          <div className="bg-surface-container-low p-space-md font-body text-lg font-bold text-primary tracking-widest mb-space-lg">
            {orderId}
          </div>
          <p className="font-body text-xs text-on-surface-variant mb-space-xl">
            A confirmation email with shipping dispatch details has been dispatched to{' '}
            <strong>{formData.email}</strong>.
          </p>
          <button
            type="button"
            onClick={() => router.push('/shop')}
            className="w-full bg-primary text-on-primary font-label-caps text-xs py-4 uppercase tracking-[0.2em] hover:bg-tertiary-container transition-colors"
          >
            Continue Exploring Atelier
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Secure Checkout</span>
        </div>

        <h1 className="font-display text-3xl lg:text-4xl text-primary mb-space-2xl pb-space-md border-b border-surface-container-high">
          VĀNYA — Secure Checkout
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-space-3xl">
            <p className="font-editorial-serif text-lg text-on-surface-variant mb-space-md">
              Your shopping bag is empty. Please add items before checking out.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-primary text-on-primary font-label-caps text-xs px-space-xl py-4 uppercase tracking-widest"
            >
              Explore Shop
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
            {/* Shipping & Payment Details */}
            <div className="lg:col-span-7 space-y-space-xl">
              {/* Contact Info */}
              <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm">
                <h2 className="font-display text-xl text-primary mb-space-md">1. Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-space-sm font-body text-xs text-on-surface focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-space-sm font-body text-xs text-on-surface focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm">
                <h2 className="font-display text-xl text-primary mb-space-md">2. Shipping Destination</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md space-y-0">
                  <div>
                    <label className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-space-sm font-body text-xs text-on-surface focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-space-sm font-body text-xs text-on-surface focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-space-sm font-body text-xs text-on-surface focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-space-sm font-body text-xs text-on-surface focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant block mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-space-sm font-body text-xs text-on-surface focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-sm">
                <h2 className="font-display text-xl text-primary mb-space-md">3. Payment Method</h2>
                <div className="space-y-space-sm">
                  {[
                    { id: 'upi', title: 'UPI / GPay / PhonePe / Paytm', subtitle: 'Instant 256-bit Encrypted Transfer' },
                    { id: 'card', title: 'Credit / Debit Card', subtitle: 'Visa, Mastercard, Amex, RuPay' },
                    { id: 'netbanking', title: 'Net Banking', subtitle: 'All Major Indian Banks Supported' },
                    { id: 'cod', title: 'Cash on Delivery (COD)', subtitle: 'Pay upon courier arrival' },
                  ].map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-start gap-3 p-space-md border cursor-pointer transition-all ${
                        formData.paymentMethod === pm.id
                          ? 'border-primary bg-surface-container-low'
                          : 'border-surface-container-high bg-surface-container-lowest'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.id}
                        checked={formData.paymentMethod === pm.id}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <span className="font-display text-sm text-primary font-medium block">{pm.title}</span>
                        <span className="font-body text-xs text-on-surface-variant">{pm.subtitle}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest p-space-lg border border-surface-container-high shadow-md sticky top-32">
                <h2 className="font-display text-xl text-primary mb-space-md pb-space-xs border-b border-surface-container-high">
                  Order Summary
                </h2>

                <div className="space-y-space-md max-h-80 overflow-y-auto pr-1 mb-space-lg">
                  {cart.map((item, idx) => (
                    <div key={`${item.product.id}-${idx}`} className="flex items-center gap-space-md">
                      <img src={item.product.image} alt={item.product.name} className="w-14 h-16 object-cover bg-surface-container" />
                      <div className="flex-1">
                        <h4 className="font-display text-sm text-primary">{item.product.name}</h4>
                        <span className="font-body text-xs text-on-surface-variant block">
                          Qty: {item.quantity} • {item.selectedVolume || '50ml'}
                        </span>
                      </div>
                      <span className="font-body text-xs font-semibold text-primary">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-surface-container-high pt-space-md space-y-2 font-body text-xs">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Complimentary Courier Shipping</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-primary font-bold text-base pt-2 border-t border-surface-container-high">
                    <span>Total Payable</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-space-lg bg-primary text-on-primary font-label-caps text-xs py-4 uppercase tracking-[0.2em] hover:bg-tertiary-container transition-colors shadow-lg"
                >
                  Place Order & Pay ₹{grandTotal.toLocaleString()}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
