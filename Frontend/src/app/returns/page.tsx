'use client';

import { useState } from 'react';
import Link from 'next/link';
import CustomerCareNav from '@/components/CustomerCareNav';

export default function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [reason, setReason] = useState('Damaged');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedReturn, setSubmittedReturn] = useState<any | null>(null);

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmittedReturn({
        returnId: `RET-${Math.floor(100000 + Math.random() * 900000)}`,
        orderNumber,
        productName,
        reason,
        status: 'Under Review',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      });
      setSubmitting(false);
    }, 800);
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
          <span className="text-primary font-semibold">Returns & Exchanges</span>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-space-2xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold block mb-1">
            Atelier Policy & Returns Dossier
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mb-space-sm">
            RETURNS & EXCHANGES
          </h1>
          <p className="font-editorial-serif text-lg text-on-surface-variant leading-relaxed">
            Our return guidelines safeguard product freshness, hygiene standards, and your complete peace of mind.
          </p>
        </div>

        {/* Interactive Return Request Section */}
        <div className="bg-surface-container-lowest border border-surface-container-high p-space-xl shadow-sm mb-space-3xl max-w-4xl">
          <span className="font-label-caps text-[0.625rem] uppercase tracking-[0.2em] text-secondary font-bold block mb-1">
            SELF-SERVICE PORTAL
          </span>
          <h2 className="font-display text-2xl text-primary mb-space-md">
            REQUEST A RETURN OR EXCHANGE
          </h2>

          {submittedReturn ? (
            <div className="bg-surface-container-low p-space-lg border border-surface-container-high space-y-space-md">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-3xl">task_alt</span>
                <div>
                  <h3 className="font-display text-xl text-primary">Return Request Submitted</h3>
                  <p className="font-label-caps text-xs uppercase tracking-wider text-secondary font-semibold">
                    Return Ref: {submittedReturn.returnId} • Date: {submittedReturn.date}
                  </p>
                </div>
              </div>

              <div className="p-space-md bg-surface-container-lowest border border-surface-container-high font-body text-xs text-on-surface-variant space-y-1">
                <p><strong>Order Number:</strong> {submittedReturn.orderNumber}</p>
                <p><strong>Product:</strong> {submittedReturn.productName}</p>
                <p><strong>Reason:</strong> {submittedReturn.reason}</p>
                <p><strong>Status:</strong> <span className="text-secondary font-bold">{submittedReturn.status}</span></p>
              </div>

              {/* Status Timeline */}
              <div className="pt-space-md border-t border-surface-container-high">
                <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-bold block mb-2">
                  RETURN STATUS PROGRESSION
                </span>
                <div className="flex items-center justify-between font-label-caps text-[10px] text-on-surface-variant uppercase">
                  <span className="text-secondary font-bold">1. SUBMITTED</span>
                  <span className="text-primary font-bold">2. UNDER REVIEW</span>
                  <span className="text-outline">3. APPROVED</span>
                  <span className="text-outline">4. REFUND / EXCHANGE</span>
                  <span className="text-outline">5. COMPLETED</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSubmittedReturn(null)}
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider px-space-lg py-2.5 mt-2"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleReturnSubmit} className="space-y-space-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold block mb-1">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. VNY-948201"
                    className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold block mb-1">
                    Select Product / Flacon *
                  </label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. NOIR 01 Eau de Parfum (50ml)"
                    className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold block mb-1">
                    Reason for Return / Exchange *
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="Damaged product">Damaged during transit</option>
                    <option value="Wrong product">Received wrong product</option>
                    <option value="Missing item">Missing item in box</option>
                    <option value="Product issue">Defective atomizer or cap</option>
                    <option value="Unopened return">Unopened 14-day return</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold block mb-1">
                    Details & Notes *
                  </label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe issue (e.g. leaking bottle upon unboxing)"
                    className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting Request...' : 'SUBMIT RETURN REQUEST'}
              </button>
            </form>
          )}
        </div>

        {/* Detailed Return Policy Sections */}
        <div className="space-y-space-2xl max-w-4xl">
          {/* 1. RETURN ELIGIBILITY */}
          <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
            <h2 className="font-display text-2xl text-primary mb-space-md">
              1. General Return Eligibility
            </h2>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-space-sm">
              We offer a <strong>14-day return window</strong> from the date of delivery. To qualify, products must be completely unused, unsealed, and in their original luxury box with intact batch holograms.
            </p>
          </section>

          {/* 2. BEAUTY PRODUCT CONDITIONS */}
          <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
            <h2 className="font-display text-2xl text-primary mb-space-md">
              2. Cosmetic & Beauty Product Hygiene Conditions
            </h2>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Because VĀNYA formulates bio-active skincare, mists, and lip salves without artificial preservatives, opened or tested beauty containers cannot be accepted for return due to health and safety regulations. We recommend purchasing our 10ml Discovery Quads prior to unsealing full 50ml or 100ml flacons.
            </p>
          </section>

          {/* 3. DAMAGED PRODUCT, 4. WRONG PRODUCT, 5. MISSING ITEM */}
          <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
            <h2 className="font-display text-2xl text-primary mb-space-md">
              3. Damaged, Incorrect, or Missing Items
            </h2>
            <div className="space-y-space-md font-body text-xs text-on-surface-variant leading-relaxed">
              <p>
                If your order arrives with broken glass, leaking caps, incorrect items, or missing components, please notify our team within <strong>48 hours</strong> of delivery.
              </p>
              <div className="bg-surface-container-low p-space-md border border-surface-container-high font-label-caps text-xs text-primary">
                • Step 1: Photograph outer package label & damaged contents.<br />
                • Step 2: Submit a return request above or email concierge@vanya-artisanal.com.<br />
                • Step 3: Our courier will pick up the parcel and dispatch an immediate fresh replacement.
              </div>
            </div>
          </section>

          {/* 6. EXCHANGES & 7. REFUNDS */}
          <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
            <h2 className="font-display text-2xl text-primary mb-space-md">
              4. Exchanges & Refund Processing
            </h2>
            <div className="font-body text-xs text-on-surface-variant leading-relaxed space-y-space-sm">
              <p>
                <strong>Exchanges:</strong> Permitted for unopened items of equal or greater value within 14 days.<br />
                <strong>Refund Method:</strong> Approved refunds are credited back to the original payment source (UPI, Credit Card, Bank Account) or issued as a VĀNYA Store Voucher.<br />
                <strong>Timeline:</strong> Processing takes 3–5 business days following atelier inspection.
              </p>
            </div>
          </section>

          {/* 8. NON-RETURNABLE ITEMS */}
          <section className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-sm">
            <h2 className="font-display text-2xl text-primary mb-space-md">
              5. Non-Returnable Items List
            </h2>
            <ul className="list-disc list-inside space-y-1 font-body text-xs text-on-surface-variant">
              <li>Opened or spray-tested Perfumes / Extraits</li>
              <li>Unsealed facial creams, lipid balms, or lip salves</li>
              <li>Bespoke customized hampers with engraved gold plates</li>
              <li>Items marked "Final Sale" or "Archival Vault Clearance"</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
