'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, Product } from '@/data/products';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, toggleWishlist, wishlist, totalAmount, itemCount } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const shippingThreshold = 999;
  const isFreeShipping = totalAmount >= shippingThreshold;
  const amountAway = shippingThreshold - totalAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VANYA10') {
      const discountVal = Math.round(totalAmount * 0.1);
      setAppliedDiscount(discountVal);
      setPromoMessage('10% Archival Discount Applied!');
    } else if (promoCode.trim() !== '') {
      setAppliedDiscount(0);
      setPromoMessage('Invalid promo code');
    }
  };

  const finalTotal = Math.max(0, totalAmount - appliedDiscount + (isFreeShipping ? 0 : 150));

  // Determine context-aware recommendations based on cart categories
  const hasPerfume = cart.some((i) => i.product.category === 'Parfum Extrait' || i.product.category === 'Botanical Mist');
  const hasSkincare = cart.some((i) => i.product.category === 'Skincare');
  const hasHamper = cart.some((i) => i.product.category === 'Hampers' || i.product.category === 'Combos');

  const recommendations = PRODUCTS.filter((p) => {
    if (cart.some((item) => item.product.id === p.id)) return false;
    if (hasPerfume && (p.category === 'Body Nectars' || p.category === 'Archival Sets')) return true;
    if (hasSkincare && (p.category === 'Botanical Mist' || p.category === 'Skincare')) return true;
    if (hasHamper && (p.category === 'Parfum Extrait' || p.category === 'Skincare')) return true;
    return true;
  }).slice(0, 3);

  if (cart.length === 0) {
    return (
      <main className="w-full bg-surface min-h-screen pb-space-3xl">
        <div className="max-w-4xl mx-auto px-margin lg:px-margin-desktop text-center py-space-3xl">
          <h1 className="font-display text-3xl lg:text-4xl text-primary mb-space-xs uppercase tracking-wider">
            YOUR CART IS EMPTY
          </h1>
          <p className="font-editorial-serif text-lg text-on-surface-variant mb-space-2xl">
            Discover fragrance, beauty and everyday rituals curated for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md max-w-lg mx-auto">
            <Link
              href="/fragrance"
              className="w-full sm:w-auto bg-primary text-on-primary font-label-caps text-xs px-space-xl py-4 uppercase tracking-[0.2em] hover:bg-tertiary-container transition-colors shadow-sm"
            >
              SHOP FRAGRANCE
            </Link>
            <Link
              href="/beauty"
              className="w-full sm:w-auto bg-surface-container-lowest text-primary font-label-caps text-xs px-space-xl py-4 uppercase tracking-[0.2em] border border-surface-container-high hover:bg-surface-container transition-colors"
            >
              SHOP BEAUTY
            </Link>
            <Link
              href="/hampers"
              className="w-full sm:w-auto bg-surface-container-low text-secondary font-label-caps text-xs px-space-xl py-4 uppercase tracking-[0.2em] border border-surface-container-high hover:bg-surface-container-lowest transition-colors"
            >
              EXPLORE HAMPERS
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-surface min-h-screen pb-space-3xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop pt-space-md">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-md">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Your Cart</span>
        </div>

        {/* Minimal Cart Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-space-md mb-space-xl border-b border-surface-container-high">
          <h1 className="font-display text-3xl lg:text-4xl text-primary uppercase tracking-wider">
            YOUR CART
          </h1>
          <span className="font-label-caps text-xs uppercase tracking-widest text-secondary font-semibold mt-1 sm:mt-0">
            {itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'} · ₹{totalAmount.toLocaleString()}
          </span>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-surface-container-low p-space-md mb-space-2xl border-l-2 border-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-label-caps text-xs uppercase tracking-wider text-primary font-semibold">
            {isFreeShipping
              ? 'Complimentary shipping unlocked.'
              : `₹${amountAway.toLocaleString()} away from complimentary shipping.`}
          </span>
          <div className="w-full sm:w-48 bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full transition-all duration-500"
              style={{ width: `${Math.min((totalAmount / shippingThreshold) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Item Rows & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start mb-space-3xl">
          {/* Cart Products List (8 columns) */}
          <div className="lg:col-span-8 space-y-space-lg">
            {cart.map((item, idx) => {
              const isSaved = wishlist.includes(item.product.id);
              return (
                <div
                  key={`${item.product.id}-${item.selectedVolume || idx}`}
                  className="flex flex-col sm:flex-row gap-space-lg p-space-lg bg-surface-container-lowest border-b border-surface-container-high relative transition-all"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover bg-surface-container flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary">
                          {item.product.category} {item.selectedVolume ? `· ${item.selectedVolume}` : ''}
                        </span>
                        <span className="font-body text-base font-bold text-primary">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-display text-lg text-primary hover:text-secondary transition-colors font-medium">
                          {item.product.name}
                        </h3>
                      </Link>

                      <p className="font-body text-xs text-on-surface-variant mt-0.5">
                        {item.product.tagline}
                      </p>
                    </div>

                    {/* Actions: Quantity Selector, Save for Later, Remove */}
                    <div className="flex flex-wrap items-center justify-between gap-space-md mt-space-md pt-space-xs border-t border-surface-container-low">
                      {/* Quantity Selector: − 1 + */}
                      <div className="flex items-center border border-surface-container-high bg-surface-container-lowest">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 text-xs text-on-surface hover:bg-surface-container-low"
                        >
                          −
                        </button>
                        <span className="px-3 text-xs font-body font-semibold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 text-xs text-on-surface hover:bg-surface-container-low"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-space-md font-label-caps text-[0.65rem] uppercase tracking-wider">
                        <button
                          type="button"
                          onClick={() => toggleWishlist(item.product.id)}
                          className={`transition-colors ${isSaved ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-primary'}`}
                        >
                          {isSaved ? 'Saved for Later' : 'Save for Later'}
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-error hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Order Summary Sidebar (4 columns) */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high shadow-md">
              <h2 className="font-label-caps text-xs font-bold uppercase tracking-[0.2em] text-primary pb-space-sm mb-space-md border-b border-surface-container-high">
                Summary
              </h2>

              <div className="space-y-space-sm font-body text-xs text-on-surface mb-space-lg">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-secondary font-semibold">
                    <span>Discount</span>
                    <span>− ₹{appliedDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? 'Complimentary' : '₹150'}</span>
                </div>

                <div className="flex justify-between text-primary font-bold text-base pt-space-sm border-t border-surface-container-high">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="mb-space-xl">
                <label className="font-label-caps text-[0.65rem] uppercase tracking-wider text-outline block mb-1">
                  Enter Promo Code
                </label>
                <div className="flex gap-space-xs">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="VANYA10"
                    className="flex-1 bg-surface-container-low border border-surface-container-high px-space-sm py-2 font-body text-xs text-on-surface placeholder:text-outline focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider px-space-md py-2 hover:bg-tertiary-container transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[0.65rem] font-label-caps mt-1 ${appliedDiscount > 0 ? 'text-secondary' : 'text-error'}`}>
                    {promoMessage}
                  </p>
                )}
              </form>

              {/* Checkout CTAs */}
              <div className="space-y-space-xs">
                <button
                  type="button"
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-primary text-on-primary font-label-caps text-xs py-4 uppercase tracking-[0.2em] hover:bg-tertiary-container transition-colors shadow-md text-center block"
                >
                  PROCEED TO CHECKOUT
                </button>

                <Link
                  href="/shop"
                  className="w-full bg-surface-container-lowest text-primary font-label-caps text-xs py-3.5 uppercase tracking-[0.2em] border border-surface-container-high hover:bg-surface-container transition-colors text-center block"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section: COMPLETE YOUR RITUAL */}
        {recommendations.length > 0 && (
          <div className="pt-space-3xl border-t border-surface-container-high">
            <span className="font-label-caps text-xs uppercase tracking-widest text-secondary font-semibold block mb-1">
              Curated Pairings
            </span>
            <h2 className="font-display text-3xl text-primary mb-space-xl">
              COMPLETE YOUR RITUAL
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="group bg-surface-container-lowest p-space-md flex flex-col justify-between border border-surface-container-high shadow-sm hover:shadow-md transition-all"
                >
                  <div>
                    <Link href={`/product/${rec.id}`} className="block aspect-[3/4] bg-surface-container overflow-hidden mb-space-md">
                      <img src={rec.image} alt={rec.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block mb-1">
                      {rec.category}
                    </span>
                    <Link href={`/product/${rec.id}`}>
                      <h4 className="font-display text-lg text-primary group-hover:text-secondary transition-colors">
                        {rec.name}
                      </h4>
                    </Link>
                    <p className="font-body text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {rec.tagline}
                    </p>
                  </div>

                  <div className="mt-space-lg pt-space-md border-t border-surface-container-high flex items-center justify-between">
                    <span className="font-body text-sm font-semibold text-primary">{rec.formattedPrice}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(rec.id, 1)}
                      className="bg-primary text-on-primary font-label-caps text-[0.65rem] px-space-md py-2 uppercase tracking-wider hover:bg-tertiary-container transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
