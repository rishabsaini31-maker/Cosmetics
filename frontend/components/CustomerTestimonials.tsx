"use client";

const testimonials = [
  {
    name: "Aarav S.",
    text: "My skin has never felt better! The serum is a game changer. Highly recommend to anyone serious about skincare.",
  },
  {
    name: "Priya M.",
    text: "I love the sunscreen—lightweight, non-greasy, and super effective. My go-to for daily protection!",
  },
  {
    name: "Rahul K.",
    text: "Fast shipping, beautiful packaging, and the products really work. I’m a loyal customer now!",
  },
  {
    name: "Sneha T.",
    text: "The create-your-own kit is so convenient! I got the serum, sunscreen, and face wash—love the results.",
  },
  {
    name: "Vikram P.",
    text: "Customer support was very helpful and my order arrived quickly. The products are top-notch.",
  },
  {
    name: "Meera D.",
    text: "I’ve noticed a real difference in my skin’s texture. The ingredients are gentle and effective.",
  },
  {
    name: "Ankit R.",
    text: "Great value for money and the packaging is beautiful. Will definitely recommend to friends!",
  },
];

import React, { useState, useEffect } from "react";

export default function CustomerTestimonials() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const groupSize = 3; // Main visible testimonials
  const sideCount = 1; // One on each side
  const totalVisible = groupSize + 2 * sideCount; // 5 at a time
  const total = testimonials.length;
  const totalGroups = Math.ceil(total / groupSize);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroup((g) => (g + 1) % totalGroups);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalGroups]);

  // Compute indices for visible testimonials (with wrap-around)
  const startIdx = (currentGroup * groupSize - sideCount + total) % total;
  const visibleTestimonials = Array.from({ length: totalVisible }).map(
    (_, i) => {
      return testimonials[(startIdx + i) % total];
    },
  );

  return (
    <section className="w-full py-16 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          What Our Customers Say
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch min-h-[260px] transition-all duration-500">
          {visibleTestimonials.map((t, i) => (
            <div
              key={i}
              className={`flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 flex flex-col gap-4 items-center mx-auto aspect-square min-w-[220px] max-w-[320px] p-8
                      ${i === sideCount ? "scale-100 opacity-100" : "scale-90 opacity-70"}
                      ${i < sideCount || i >= sideCount + groupSize ? "hidden md:block" : ""}
                    `}
            >
              <p className="text-lg text-zinc-700 dark:text-zinc-200 flex-1 flex items-center justify-center text-center">
                “{t.text}”
              </p>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 mt-2">
                - {t.name}
              </span>
            </div>
          ))}
        </div>
        {/* No navigation dots */}
      </div>
    </section>
  );
}
