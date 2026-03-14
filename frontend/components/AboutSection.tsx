export default function AboutSection() {
  return (
    <section className="w-full py-16 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 text-center flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          About Us
        </h2>
        <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-200 max-w-2xl mx-auto">
          We are committed to delivering premium, science-backed skincare and
          beauty products that empower you to look and feel your best. Our
          mission is to blend innovation, quality, and trust—helping you achieve
          radiant, healthy skin with every product.
        </p>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          Every formula is crafted with care, using only the finest ingredients
          and the latest research. Thank you for making us a part of your daily
          routine.
        </p>
      </div>
    </section>
  );
}
