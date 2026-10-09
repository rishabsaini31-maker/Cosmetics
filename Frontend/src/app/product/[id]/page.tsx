'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getProductById, PRODUCTS } from '@/data/products';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'prod-01';
  const product = getProductById(id) || PRODUCTS[0];

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedVolume, setSelectedVolume] = useState<string>(product.volume[0] || '50 ml');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'craft' | 'ingredients'>('notes');

  const isFav = isInWishlist(product.id);

  return (
    <main className="w-full bg-surface min-h-screen py-space-2xl pb-24 lg:pb-space-2xl">
      <div className="max-w-7xl mx-auto px-margin lg:px-margin-desktop">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-space-lg">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-primary font-semibold truncate">{product.name}</span>
        </div>

        {/* PDP Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop mb-space-3xl">
          {/* Gallery Column */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-space-md">
            {/* Gallery Thumbnails */}
            <div className="flex md:flex-col gap-space-sm overflow-x-auto md:overflow-y-auto max-h-[500px] no-scrollbar">
              {(product.gallery || [product.image]).map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-24 flex-shrink-0 bg-surface-container overflow-hidden border-2 transition-all ${
                    selectedImage === imgUrl ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Active Image Showcase */}
            <div className="flex-1 aspect-[3/4] bg-surface-container overflow-hidden relative border border-surface-container-high shadow-lg">
              <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <span className="absolute top-space-md left-space-md bg-secondary text-on-secondary font-label-caps text-xs px-3 py-1 uppercase tracking-widest shadow-md">
                  {product.badge}
                </span>
              )}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Add to wishlist"
                className="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-container-lowest/90 flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-md"
              >
                <span className={`material-symbols-outlined text-[22px] ${isFav ? 'text-error' : ''}`}>
                  favorite
                </span>
              </button>
            </div>
          </div>

          {/* Details & Actions Column */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-space-md lg:pt-0">
            <div>
              <div className="inline-flex items-center gap-2 mb-space-xs">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-label-caps text-xs text-secondary uppercase tracking-[0.2em] font-semibold">
                  {product.category}
                </span>
              </div>

              <h1 className="font-display text-3xl lg:text-4xl text-primary mb-space-xs">
                {product.name}
              </h1>

              <p className="font-editorial-serif text-lg text-on-surface-variant mb-space-md leading-relaxed">
                {product.tagline}
              </p>

              <div className="flex items-center gap-4 mb-space-lg pb-space-md border-b border-surface-container-high">
                <span className="font-body text-2xl font-bold text-primary">
                  {product.formattedPrice}
                </span>
                <span className="font-label-caps text-xs uppercase tracking-wider text-secondary bg-surface-container-low px-2.5 py-1">
                  Complimentary Shipping
                </span>
              </div>

              {/* Volume Selection */}
              <div className="mb-space-lg">
                <label className="font-label-caps text-xs uppercase tracking-widest text-primary block mb-space-xs font-semibold">
                  Select Vessel Size
                </label>
                <div className="flex gap-space-sm flex-wrap">
                  {product.volume.map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setSelectedVolume(vol)}
                      className={`font-label-caps text-xs uppercase tracking-wider px-space-md py-3 border transition-all ${
                        selectedVolume === vol
                          ? 'bg-primary text-on-primary border-primary font-semibold shadow-sm'
                          : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-high hover:border-secondary'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Bag */}
              <div className="flex items-center gap-space-md mb-space-xl">
                <div className="flex items-center border border-surface-container-high bg-surface-container-lowest h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 text-sm font-semibold hover:bg-surface-container-low h-full"
                  >
                    -
                  </button>
                  <span className="px-4 font-body text-sm font-semibold text-primary">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 text-sm font-semibold hover:bg-surface-container-low h-full"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product, quantity, selectedVolume)}
                  className="flex-1 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] h-12 flex items-center justify-center hover:bg-tertiary-container transition-colors shadow-md"
                >
                  Add to Bag • {product.formattedPrice}
                </button>
              </div>

              {/* Sillage & Longevity Cards */}
              <div className="grid grid-cols-2 gap-space-md p-space-md bg-surface-container-low border border-surface-container-high mb-space-xl">
                <div>
                  <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary block font-semibold">
                    Sillage Projection
                  </span>
                  <span className="font-body text-sm font-semibold text-primary block mt-0.5">
                    {product.sillage}
                  </span>
                </div>
                <div>
                  <span className="font-label-caps text-[0.65rem] uppercase tracking-widest text-secondary block font-semibold">
                    Skin Bond Longevity
                  </span>
                  <span className="font-body text-sm font-semibold text-primary block mt-0.5">
                    {product.longevity}
                  </span>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="border-t border-surface-container-high pt-space-md">
                <div className="flex gap-space-md border-b border-surface-container-high pb-space-xs mb-space-md overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setActiveTab('notes')}
                    className={`font-label-caps text-xs uppercase tracking-widest pb-1 transition-colors whitespace-nowrap ${
                      activeTab === 'notes' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    Olfactory Notes
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('craft')}
                    className={`font-label-caps text-xs uppercase tracking-widest pb-1 transition-colors whitespace-nowrap ${
                      activeTab === 'craft' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    Craft & Distillation
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('ingredients')}
                    className={`font-label-caps text-xs uppercase tracking-widest pb-1 transition-colors whitespace-nowrap ${
                      activeTab === 'ingredients' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    Ingredients
                  </button>
                </div>

                {activeTab === 'notes' && (
                  <div className="space-y-space-sm font-body text-xs text-on-surface">
                    <div>
                      <span className="font-label-caps text-[0.65rem] uppercase tracking-wider text-secondary block font-semibold">
                        Top Notes (Opening)
                      </span>
                      <p>{product.notes.top.join(' • ')}</p>
                    </div>
                    <div>
                      <span className="font-label-caps text-[0.65rem] uppercase tracking-wider text-secondary block font-semibold">
                        Heart Notes (Evolution)
                      </span>
                      <p>{product.notes.heart.join(' • ')}</p>
                    </div>
                    <div>
                      <span className="font-label-caps text-[0.65rem] uppercase tracking-wider text-secondary block font-semibold">
                        Base Notes (Dry Down)
                      </span>
                      <p>{product.notes.base.join(' • ')}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'craft' && (
                  <p className="font-editorial-serif text-sm text-on-surface-variant leading-relaxed">
                    {product.craftDetails}
                  </p>
                )}

                {activeTab === 'ingredients' && (
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    {product.ingredients.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        <div className="pt-space-3xl border-t border-surface-container-high">
          <h3 className="font-display text-2xl text-primary mb-space-xl">
            You May Also Enjoy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3).map((rel) => (
              <div
                key={rel.id}
                onClick={() => router.push(`/product/${rel.id}`)}
                className="group bg-surface-container-lowest p-space-md border border-surface-container-high cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-[3/4] bg-surface-container overflow-hidden mb-space-md">
                  <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="font-label-caps text-[0.6rem] uppercase tracking-widest text-secondary block mb-1">
                  {rel.category}
                </span>
                <h4 className="font-display text-lg text-primary group-hover:text-secondary transition-colors">
                  {rel.name}
                </h4>
                <span className="font-body text-xs font-semibold text-primary block mt-2">
                  {rel.formattedPrice}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add-To-Cart Bar (Shown only on small/medium screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-surface-container-high p-3 flex items-center justify-between gap-3 shadow-2xl lg:hidden">
        <div>
          <span className="font-display text-sm font-medium text-primary block line-clamp-1">{product.name}</span>
          <span className="font-body text-xs font-bold text-secondary">{product.formattedPrice}</span>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product, quantity, selectedVolume)}
          className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.18em] px-4 py-2.5 hover:bg-tertiary-container transition-colors shadow-md flex-shrink-0"
        >
          Add to Bag
        </button>
      </div>
    </main>
  );
}
