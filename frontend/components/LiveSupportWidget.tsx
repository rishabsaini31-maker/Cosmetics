"use client";
import { useState } from "react";

export default function LiveSupportWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-20 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl font-bold border-4 border-white focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Live Support"
      >
        💬
      </button>
      {/* Chat Box */}
      {open && (
        <div className="mt-4 w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-4 flex flex-col gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-600 text-2xl">🟢</span>
            <span className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
              Live Support
            </span>
          </div>
          <div className="text-zinc-700 dark:text-zinc-200 text-sm mb-2">
            Hi! How can we help you today? Our team is online and ready to
            assist you.
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2 transition">
            Send
          </button>
        </div>
      )}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
