'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const router = useRouter();
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, totalAmount, itemCount } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 3500;
  const progressPercent = Math.min((totalAmount / freeShippingThreshold) * 100, 100);

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface border-l border-surface-container-high shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-space-lg border-b border-surface-container-high flex items-center justify-between">
            <h2 className="font-display text-xl text-primary">Your Shopping Bag ({itemCount})</h2>
            <button
              type="button"
              onClick={closeCart}
              className="text-on-surface-variant hover:text-primary transition-colors p-1"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Free Gift / Shipping Progress Bar */}
          <div className="bg-surface-container-low px-space-lg py-space-sm border-b border-surface-container-high">
            <div className="flex justify-between items-center text-xs font-label-caps uppercase tracking-wider mb-1">
              <span className="text-secondary">
                {totalAmount >= freeShippingThreshold
                  ? 'Complimentary 5ml Saffron Oudh Attar Unlocked!'
                  : `Add ₹${(freeShippingThreshold - totalAmount).toLocaleString()} for Free Discovery Vial`}
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
            {cart.length === 0 ? (
              <div className="text-center py-space-3xl text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl block mb-2 opacity-40">
                  local_mall
                </span>
                <p className="font-editorial-serif text-base mb-4">Your bag is currently empty.</p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    router.push('/shop');
                  }}
                  className="bg-primary text-on-primary font-label-caps text-xs px-space-lg py-3 uppercase tracking-widest hover:bg-tertiary-container transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedVolume || idx}`}
                  className="flex gap-space-md p-space-sm bg-surface-container-lowest border border-surface-container-high relative"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover bg-surface-container"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block">
                        {item.product.category} {item.selectedVolume ? `• ${item.selectedVolume}` : ''}
                      </span>
                      <h4 className="font-display text-sm text-primary">{item.product.name}</h4>
                      <span className="font-body text-xs font-semibold text-primary mt-1 block">
                        {item.product.formattedPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-surface-container-high">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-on-surface hover:bg-surface-container-low"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-body">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-on-surface hover:bg-surface-container-low"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="font-label-caps text-[0.6rem] uppercase tracking-widest text-error hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-space-lg border-t border-surface-container-high bg-surface-container-lowest">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant">
                  Subtotal
                </span>
                <span className="font-body text-lg font-bold text-primary">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>
              <p className="font-body text-xs text-on-surface-variant mb-4">
                Taxes and complimentary shipping calculated at checkout.
              </p>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-primary text-on-primary font-label-caps text-xs py-4 uppercase tracking-[0.2em] hover:bg-tertiary-container transition-colors shadow-md"
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
