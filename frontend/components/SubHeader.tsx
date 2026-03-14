"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function SubHeader() {
  const [hovered, setHovered] = useState<string | null>(null);
  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => setHovered(null);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="w-full flex items-center justify-center gap-8 py-5 px-8 text-lg bg-zinc-50 border-b border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 sticky top-24 z-30 overflow-visible">
      <Link
        href="/"
        className="hover:underline font-medium text-zinc-700 dark:text-zinc-200"
      >
        Home
      </Link>
      <div
        className="relative overflow-visible"
        onMouseEnter={() => setHovered("skincare")}
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          href="/shop"
          className="hover:underline font-medium text-zinc-700 dark:text-zinc-200"
        >
          Skincare & Korean Skincare
        </Link>
        {hovered === "skincare" && (
          <div className="hidden md:flex fixed top-32 right-0 z-[60] w-1/2 h-[340px] max-w-2xl bg-white border-l-2 border-zinc-200 shadow-2xl rounded-l-2xl p-10 text-base text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 pointer-events-auto flex-row items-center gap-10 transition-all duration-300">
            <div>
              <div className="font-semibold mb-2">
                Skincare & Korean Skincare
              </div>
              <div>
                Explore cleansers, moisturizers, trending K-beauty, and more.
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="relative overflow-visible"
        onMouseEnter={() => setHovered("premium-serums")}
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          href="/category/premium-serums"
          className="hover:underline font-medium text-zinc-700 dark:text-zinc-200"
        >
          ✨ Premium Serums
        </Link>
        {hovered === "premium-serums" && (
          <div className="hidden md:flex fixed top-32 right-0 z-[60] w-1/2 h-[340px] max-w-2xl bg-white border-l-2 border-zinc-200 shadow-2xl rounded-l-2xl p-10 text-base text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 pointer-events-auto flex-row items-center gap-10 transition-all duration-300">
            <div>
              <div className="font-semibold mb-2">Premium Serums</div>
              <div>Potent actives for glowing skin.</div>
            </div>
            <Image
              src="/serum.jpg"
              alt="Premium Serums"
              width={240}
              height={240}
              className="rounded-lg w-60 h-60 object-contain border-2 border-zinc-200 bg-zinc-50 p-2"
            />
          </div>
        )}
      </div>
      <div
        className="relative overflow-visible"
        onMouseEnter={() => setHovered("sun-protection")}
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          href="/category/sun-protection"
          className="hover:underline font-medium text-zinc-700 dark:text-zinc-200"
        >
          ☀️ Sun Protection
        </Link>
        {hovered === "sun-protection" && (
          <div className="hidden md:flex fixed top-32 right-0 z-[60] w-1/2 h-[340px] max-w-2xl bg-white border-l-2 border-zinc-200 shadow-2xl rounded-l-2xl p-10 text-base text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 pointer-events-auto flex-row items-center gap-10 transition-all duration-300">
            <div>
              <div className="font-semibold mb-2">Sun Protection</div>
              <div>SPF, PA+++, and more for all skin types.</div>
            </div>
            <Image
              src="/skincare.webp"
              alt="Sun Protection"
              width={240}
              height={240}
              className="rounded-lg w-60 h-60 object-contain border-2 border-zinc-200 bg-zinc-50 p-2"
            />
          </div>
        )}
      </div>
      <div
        className="relative overflow-visible"
        onMouseEnter={() => setHovered("perfumes")}
        onMouseLeave={() => setHovered(null)}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Coming Soon");
          }}
          className="hover:underline font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-1"
        >
          <span role="img" aria-label="Perfume"></span>
          <Image
            src="/perfume-bottle.svg"
            alt="Perfume Bottle"
            width={20}
            height={20}
            className="inline w-5 h-5 ml-1"
          />
          Fragrance / Perfumes
        </a>
        {hovered === "perfumes" && (
          <div className="hidden md:flex fixed top-32 right-0 z-[60] w-1/2 h-[340px] max-w-2xl bg-white border-l-2 border-zinc-200 shadow-2xl rounded-l-2xl p-10 text-base text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 pointer-events-auto flex-row items-center gap-10 transition-all duration-300">
            <div>
              <div className="font-semibold mb-2">Fragrance / Perfumes</div>
              <div>Premium scents launching soon!</div>
            </div>
            <Image
              src="/perfume.webp"
              alt="Premium Perfume Bottle"
              width={240}
              height={240}
              className="rounded-lg w-60 h-60 object-contain border-2 border-zinc-200 bg-zinc-50 p-2"
            />
          </div>
        )}
      </div>
      <div
        className="relative overflow-visible"
        onMouseEnter={() => setHovered("gifting")}
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          href="/gifting"
          className="hover:underline font-medium text-zinc-700 dark:text-zinc-200"
        >
          🎁 Gifting
        </Link>
        {hovered === "gifting" && (
          <div className="hidden md:flex fixed top-32 right-0 z-[60] w-1/2 h-[340px] max-w-2xl bg-white border-l-2 border-zinc-200 shadow-2xl rounded-l-2xl p-10 text-base text-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 pointer-events-auto flex-row items-center gap-10 transition-all duration-300">
            <div className="flex flex-col gap-2">
              <div className="font-semibold mb-2">Gift Options</div>
              <Link href="/gifting/under-399" className="hover:underline">
                Gifts under ₹399
              </Link>
              <Link href="/gifting/under-499" className="hover:underline">
                Gifts under ₹499
              </Link>
              <Link href="/gifting/under-599" className="hover:underline">
                Gifts under ₹599
              </Link>
              <Link href="/gifting/under-699" className="hover:underline">
                Gifts under ₹699
              </Link>
            </div>
            <Image
              src="/skincare.webp"
              alt="Gifting Placeholder"
              width={240}
              height={240}
              className="rounded-lg w-60 h-60 object-contain border-2 border-zinc-200 bg-zinc-50 p-2"
            />
          </div>
        )}
      </div>
      <Link
        href="/blog"
        className="hover:underline font-medium text-zinc-700 dark:text-zinc-200"
      >
        Blog
      </Link>
      <Link
        href="/about"
        className="hover:underline font-medium text-zinc-700 dark:text-zinc-200"
      >
        About
      </Link>
    </div>
  );
}
