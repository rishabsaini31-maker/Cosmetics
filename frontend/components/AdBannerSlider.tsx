"use client";

import Image from "next/image";
import React, { useState } from "react";

const banners = [
  {
    img: "/serum.jpg",
    title: "Premium Serums",
    desc: "Potent actives for glowing, healthy skin. Discover our best-selling serums.",
    cta: "Shop Serums",
    href: "/category/premium-serums",
  },
  {
    img: "/skincare.webp",
    title: "Science-Backed Skincare",
    desc: "Gentle, effective, and trusted by experts. Explore our skincare essentials.",
    cta: "Explore Skincare",
    href: "/shop",
  },
  {
    img: "/perfume.webp",
    title: "Signature Fragrances",
    desc: "Elevate your presence with our premium perfumes. Unforgettable scents await.",
    cta: "View Perfumes",
    href: "/perfumes",
  },
];

export default function AdBannerSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 py-16 mb-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-4">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4 drop-shadow-lg">
            {banners[current].title.split(" ").map((word, idx) =>
              idx === 0 ? (
                <span
                  key={idx}
                  className="text-green-700 dark:text-green-400 font-black italic"
                >
                  {word}{" "}
                </span>
              ) : (
                <span key={idx}>{word} </span>
              ),
            )}
          </h2>
          <p className="text-2xl md:text-3xl text-zinc-700 dark:text-zinc-200 max-w-2xl drop-shadow font-medium">
            {banners[current].desc.split(" ").map((word, idx) =>
              idx === 0 ? (
                <span
                  key={idx}
                  className="text-black dark:text-white font-bold underline"
                >
                  {word}{" "}
                </span>
              ) : (
                <span key={idx}>{word} </span>
              ),
            )}
          </p>
          <a
            href={banners[current].href}
            className="inline-block mt-4 px-8 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow hover:bg-white hover:text-black border-2 border-black transition"
          >
            {banners[current].cta}
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center relative">
          <Image
            src={banners[current].img}
            alt={banners[current].title}
            width={420}
            height={520}
            className="rounded-2xl shadow-2xl border-4 border-zinc-200 dark:border-zinc-700 object-cover w-[340px] h-[440px] md:w-[420px] md:h-[520px] transition-all duration-500"
            priority
          />
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-1 mt-8">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full border border-black dark:border-white transition ${i === current ? "bg-black dark:bg-white" : "bg-transparent"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
