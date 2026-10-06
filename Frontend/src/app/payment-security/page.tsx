'use client';

import Link from 'next/link';
import CustomerCareNav from '@/components/CustomerCareNav';

export default function PaymentSecurityPage() {
  const enabledMethods = [
    { name: 'UPI (GPay / PhonePe / Paytm)', tag: 'Instant Zero-Fee Checkout' },
    { name: 'Visa & Mastercard', tag: 'Debit & Credit Cards' },
    { name: 'American Express', tag: 'International & Domestic Amex' },
    { name: 'Net Banking', tag: '50+ Major Indian Banks' },
    { name: 'Digital Wallets', tag: 'Airtel Money, Mobikwik, Amazon Pay' },
  ];

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
          <span className="text-primary font-semibold">Payment & Security</span>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-space-2xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold block mb-1">
            Transaction Monograph & Gateway Protocols
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mb-space-sm">
            PAYMENT & SECURITY
          </h1>
          <p className="font-editorial-serif text-lg text-on-surface-variant leading-relaxed">
            Payment processing is handled securely through the PCI-compliant payment providers integrated with the store.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-space-2xl">
            {/* 1. SUPPORTED PAYMENT METHODS */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                ENABLED OPTIONS
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                Accepted Payment Methods
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md font-body text-xs">
                {enabledMethods.map((m) => (
                  <div key={m.name} className="bg-surface-container-low p-space-md border border-surface-container-high">
                    <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold block">
                      {m.name}
                    </span>
                    <span className="text-on-surface-variant text-[11px] mt-0.5 block">
                      {m.tag}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. PAYMENT FAILURE & RESOLUTION */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                TRANSACTION ASSISTANCE
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                Payment Failure & Pending Charges
              </h2>
              <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-md">
                <div className="space-y-2">
                  <h3 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold">
                    Money Deducted But Order Not Created?
                  </h3>
                  <p>
                    If your bank account was debited due to a gateway timeout before reaching our confirmation page, please rest assured. Payment aggregators automatically auto-reverse unlinked transactions back to your account within <strong>3 to 5 business days</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold">
                    Duplicate Charge Concerns
                  </h3>
                  <p>
                    If you suspect a duplicate charge occurred while placing an order, please email your transaction reference or bank screenshot to our concierge for immediate verification and refund.
                  </p>
                </div>

                <div className="pt-space-sm border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-md">
                  <div>
                    <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold block">
                      Have a payment inquiry?
                    </span>
                    <span className="text-xs text-on-surface-variant">Our finance desk is ready to assist.</span>
                  </div>
                  <Link
                    href="/contact"
                    className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-lg py-3 hover:bg-tertiary-container transition-colors"
                  >
                    CONTACT CONCIERGE
                  </Link>
                </div>
              </div>
            </section>

            {/* 3. SECURITY INFORMATION */}
            <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                GATEWAY ENCRYPTION & PRIVACY
              </span>
              <h2 className="font-display text-2xl text-primary mb-space-md">
                Payment Security Information
              </h2>
              <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-sm">
                <p>
                  Payment processing is handled through the payment providers integrated with the store. All checkout transactions pass through SSL-encrypted gateway channels.
                </p>
                <p>
                  VĀNYA does not store card numbers, expiration dates, or bank passwords on our servers. Authentication occurs directly with your issuing bank via two-factor OTP protocols.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 sticky top-32 space-y-space-md">
            <div className="bg-surface-container-low p-space-lg border border-surface-container-high">
              <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
                SAFE CHECKOUT
              </span>
              <h3 className="font-display text-lg text-primary mb-space-sm">Guaranteed Protection</h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                All checkout sessions are encrypted. If a payment fails, your funds remain protected by standard bank auto-reversal policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
