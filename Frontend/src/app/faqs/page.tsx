'use client';

import { useState } from 'react';
import Link from 'next/link';
import CustomerCareNav from '@/components/CustomerCareNav';
import { FAQS_DATA } from '@/data/faqs';

const CATEGORIES = [
  'ALL',
  'ORDERS',
  'SHIPPING',
  'RETURNS & EXCHANGES',
  'PAYMENTS',
  'FRAGRANCE',
  'SKINCARE',
  'MAKEUP',
  'HAMPERS & COMBOS',
  'ACCOUNT',
];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['ord-1', 'frg-1', 'shp-1']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    if (selectedCategory !== 'ALL' && faq.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQ = faq.question.toLowerCase().includes(q);
      const matchA = faq.answer.toLowerCase().includes(q);
      const matchC = faq.category.toLowerCase().includes(q);
      return matchQ || matchA || matchC;
    }
    return true;
  });

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
          <span className="text-primary font-semibold">FAQs</span>
        </div>

        {/* Heading */}
        <div className="max-w-3xl mb-space-2xl pb-space-lg border-b border-surface-container-high">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold block mb-1">
            Knowledge Repository & Guide
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-primary mb-space-sm">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="font-editorial-serif text-lg text-on-surface-variant leading-relaxed">
            Find answers to common questions regarding our botanical distillations, orders, delivery, and bespoke hampers.
          </p>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="space-y-space-md mb-space-2xl max-w-4xl">
          {/* Real-time Search Field */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your question... (e.g. shipping, returns, oudh, fragrance family, hampers)"
              className="w-full bg-surface-container-lowest border border-surface-container-high pl-12 pr-4 py-3.5 font-body text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary shadow-sm"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-outline hover:text-primary uppercase font-label-caps"
              >
                Clear
              </button>
            ) : null}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-label-caps text-[0.6875rem] uppercase tracking-wider px-3.5 py-1.5 transition-all border whitespace-nowrap ${
                    isSelected
                      ? 'bg-primary text-on-primary border-primary font-bold shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-high hover:border-secondary'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl space-y-space-md">
          {filteredFaqs.length === 0 && (
            <div className="text-center py-space-3xl bg-surface-container-lowest border border-surface-container-high p-space-xl">
              <span className="material-symbols-outlined text-4xl text-secondary block mb-2 opacity-50">
                help_center
              </span>
              <p className="font-editorial-serif text-lg text-on-surface-variant mb-4">
                No questions found matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="bg-primary text-on-primary font-label-caps text-xs px-space-lg py-3 uppercase tracking-widest"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {filteredFaqs.length > 0 &&
            filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-surface-container-lowest border border-surface-container-high transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-space-lg flex items-center justify-between gap-4 group"
                  >
                    <div>
                      <span className="font-label-caps text-[0.625rem] uppercase tracking-widest text-secondary font-bold block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="font-display text-base text-primary group-hover:text-secondary transition-colors font-medium">
                        {faq.question}
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-secondary transition-transform duration-300">
                      {isOpen ? 'remove' : 'add'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-space-lg pb-space-lg pt-1 border-t border-surface-container-high/60 font-body text-xs text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-space-3xl bg-surface-container-low border border-surface-container-high p-space-xl text-center max-w-4xl">
          <h3 className="font-display text-2xl text-primary mb-2">Still Need Assistance?</h3>
          <p className="font-editorial-serif text-sm text-on-surface-variant mb-space-md">
            Our atelier concierge team is ready to answer questions about orders, ingredients, or custom hampers.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-space-xl py-3 hover:bg-tertiary-container transition-colors"
          >
            CONTACT US DIRECTLY
          </Link>
        </div>
      </div>
    </main>
  );
}
