'use client';

import { Product } from './FeaturedProducts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemoveItem }: CartDrawerProps) {
  if (!isOpen) return null;

  const total = items.reduce((acc, item) => {
    const numeric = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 0;
    return acc + numeric;
  }, 0);

  const freeShippingThreshold = 3500;
  const progressPercent = Math.min((total / freeShippingThreshold) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-surface-container-high shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-space-lg border-b border-surface-container-high flex items-center justify-between">
            <h2 className="font-display text-xl text-primary">Your Shopping Bag ({items.length})</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Free Gift Progress Bar */}
          <div className="bg-surface-container-low px-space-lg py-space-sm border-b border-surface-container-high">
            <div className="flex justify-between items-center text-xs font-label-caps uppercase tracking-wider mb-1">
              <span className="text-secondary">
                {total >= freeShippingThreshold
                  ? 'Complimentary 5ml Saffron Oudh Attar Unlocked!'
                  : `Add ₹${(freeShippingThreshold - total).toLocaleString()} for Free Discovery Vial`}
              </span>
              <span className="text-on-surface font-semibold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-secondary h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-space-lg space-y-space-md">
            {items.length === 0 ? (
              <div className="text-center py-space-3xl text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl block mb-2 opacity-40">
                  local_mall
                </span>
                <p className="font-editorial-serif text-base mb-4">Your bag is currently empty.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-primary text-on-primary font-label-caps text-xs px-space-lg py-3 uppercase tracking-widest"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex gap-space-md p-space-sm bg-surface-container-lowest border border-surface-container-high relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-surface-container"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block">
                        {item.category}
                      </span>
                      <h4 className="font-display text-sm text-primary">{item.name}</h4>
                      <span className="font-body text-xs font-semibold text-primary mt-1 block">
                        {item.price}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-left font-label-caps text-[0.6rem] uppercase tracking-widest text-error hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="p-space-lg border-t border-surface-container-high bg-surface-container-lowest">
              <div className="flex justify-between items-center mb-4">
                <span className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant">
                  Subtotal
                </span>
                <span className="font-body text-lg font-bold text-primary">
                  ₹{total.toLocaleString()}
                </span>
              </div>
              <p className="font-body text-xs text-on-surface-variant mb-4">
                Taxes and complimentary shipping calculated at checkout.
              </p>
              <button
                type="button"
                className="w-full bg-primary text-on-primary font-label-caps text-xs py-4 uppercase tracking-[0.2em] hover:bg-tertiary-container transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
