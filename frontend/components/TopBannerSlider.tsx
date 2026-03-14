"use client";
import React, { useState } from "react";

const slides = [
  {
    text: "🚚 Enjoy Free Shipping on Orders Over ₹499",
  },
  {
    text: "🎁 Buy 1 Get 1 Free on Select Products",
  },
  {
    text: "🔥 Summer Sale: Up to 40% Off!",
  },
  {
    text: "🌿 100% Natural & Premium Ingredients",
  },
  {
    text: "🔬 Scientifically Researched Products",
  },
  {
    text: "📦 Combos Available for Extra Savings",
  },
];

export default function TopBannerSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <div className="w-full bg-green-600 text-center py-2 px-4 text-sm font-semibold text-white tracking-wide border-b border-green-700 dark:bg-green-900 dark:text-green-100 dark:border-green-800 sticky top-0 z-50 relative overflow-hidden">
      <div className="flex items-center justify-center gap-4">
        <span className="block w-full transition-all duration-500">
          {slides[current].text}
        </span>
      </div>
      {/* Dots removed for minimalist top banner */}
    </div>
  );
}
