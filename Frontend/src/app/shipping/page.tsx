'use client';

import Link from 'next/link';
import CustomerCareNav from '@/components/CustomerCareNav';

export default function ShippingPage() {
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
          <span className="text-primary font-semibold">Shipping & Delivery</span>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-space-2xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold block mb-1">
            Fulfilment & Logistics Monograph
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mb-space-sm">
            SHIPPING & DELIVERY
          </h1>
          <p className="font-editorial-serif text-lg text-on-surface-variant leading-relaxed">
            Every VĀNYA flacon and skincare salve is hand-checked, cushioned in protective linen boxes, and dispatched via insured courier partners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
          {/* Main Policy Content (8 cols) */}
          <div className="lg:col-span-8 space-y-space-2xl">
            {/* 1. SHIPPING CHARGES */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                SECTION 01
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                1. Shipping Charges
              </h2>
              <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-sm">
                <p>
                  For all orders under ₹999 across India, a standard insured courier shipping fee of <strong>₹99</strong> is applied at checkout.
                </p>
                <div className="bg-surface-container-low p-space-md border border-surface-container-high font-label-caps text-xs text-primary">
                  • Orders under ₹999: Flat ₹99 Shipping Charge<br />
                  • Orders ₹999 and above: FREE Complimentary Shipping
                </div>
              </div>
            </section>

            {/* 2. COMPLIMENTARY SHIPPING */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                SECTION 02
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                2. Complimentary Shipping
              </h2>
              <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-sm">
                <p className="font-editorial-serif text-base text-primary font-medium">
                  "Complimentary shipping on orders above ₹999."
                </p>
                <p>
                  We automatically apply free expedited courier shipping to your cart whenever your merchandise total reaches or exceeds ₹999. No coupon code required.
                </p>
              </div>
            </section>

            {/* 3. DELIVERY LOCATIONS */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                SECTION 03
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                3. Delivery Locations & Coverage
              </h2>
              <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-sm">
                <p>
                  We deliver pan-India across over 19,000+ postal pincodes using tier-1 logistics networks including BlueDart, Delhivery, and DHL Express.
                </p>
                <p>
                  <em>Note on Remote Locations:</em> Certain tier-3 pincodes or island territories may require an additional 24–48 hours for local post transfer.
                </p>
              </div>
            </section>

            {/* 4. DELIVERY TIMELINES */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                SECTION 04
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                4. Delivery Timelines
              </h2>
              <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="bg-surface-container-low p-space-md border border-surface-container-high">
                    <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold block mb-1">
                      Atelier Dispatch Time
                    </span>
                    <p>24 to 48 hours for hand-sealing and batch authentication.</p>
                  </div>

                  <div className="bg-surface-container-low p-space-md border border-surface-container-high">
                    <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold block mb-1">
                      Metro Transit Time
                    </span>
                    <p>2 to 3 business days following courier pickup.</p>
                  </div>
                </div>

                <p>
                  Rest of India and regional destinations require 4 to 6 business days. Delays caused by weather warnings, festive courier surges, or local transport strikes will be communicated via SMS.
                </p>
              </div>
            </section>

            {/* 5. ORDER TRACKING */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                SECTION 05
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                5. How Order Tracking Works
              </h2>
              <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-sm">
                <p>
                  Upon handover to our courier partner, you receive an automated SMS and email containing your Air Waybill (AWB) tracking number. You can monitor your shipment anytime on our <Link href="/track-order" className="underline text-primary font-semibold">Order Tracking</Link> portal.
                </p>
              </div>
            </section>

            {/* 6. DELIVERY ISSUES */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                SECTION 06
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                6. Resolving Delivery Issues
              </h2>
              <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-md">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Delayed Package:</strong> If your transit exceeds 7 business days, notify us for priority escalation.</li>
                  <li><strong>Damaged Package:</strong> If outer carton arrives crushed or leaking, photograph the package before opening and inform us within 48 hours.</li>
                  <li><strong>Marked Delivered but Not Received:</strong> Check with building security / reception. If unlocated, notify us within 24 hours for carrier investigation.</li>
                  <li><strong>Wrong Package Received:</strong> Keep items intact and contact us immediately for return pick-up.</li>
                </ul>

                <div className="pt-space-md border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-md">
                  <div>
                    <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold block">
                      Need help with a shipment?
                    </span>
                    <span className="text-xs text-on-surface-variant">Our concierge team will resolve your issue within 24 hours.</span>
                  </div>
                  <Link
                    href="/contact"
                    className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-3 hover:bg-tertiary-container transition-colors"
                  >
                    CONTACT US
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 sticky top-32 space-y-space-md">
            <div className="bg-surface-container-low p-space-lg border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                QUICK SUMMARY
              </span>
              <h3 className="font-display text-lg text-primary mb-space-sm">Shipping Highlights</h3>
              <ul className="space-y-space-xs font-body text-xs text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check</span>
                  <span>Free shipping above ₹999</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check</span>
                  <span>2–3 Day Metro Delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check</span>
                  <span>100% Insured Transit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base">check</span>
                  <span>Live AWB Tracking Links</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
