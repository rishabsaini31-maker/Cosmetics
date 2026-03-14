import Image from "next/image";

export default function CreateYourOwnKit() {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Create Your Own Kit
          </h2>
          <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-200 max-w-xl">
            Mix and match your favorites—serum, sunscreen, and more—to build a
            kit that fits your routine. Enjoy flexibility and savings!
          </p>
          <p className="text-lg md:text-xl text-green-700 dark:text-green-300 font-semibold">
            Buy any 3 or more, get{" "}
            <span className="font-bold">15% OFF</span>{" "}
          </p>
          <a
            href="/shop"
            className="inline-block mt-4 px-8 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow hover:bg-white hover:text-black border-2 border-black transition"
          >
            Shop Now
          </a>
        </div>
        <div className="flex-1 flex flex-row gap-8 justify-center md:justify-end">
          <Image
            src="/skincare.webp"
            alt="Sunscreen"
            width={260}
            height={320}
            className="rounded-2xl shadow-lg border-2 border-zinc-200 dark:border-zinc-700 object-cover w-[180px] h-[240px] md:w-[260px] md:h-[320px]"
          />
          <Image
            src="/serum.jpg"
            alt="Serum"
            width={260}
            height={320}
            className="rounded-2xl shadow-lg border-2 border-zinc-200 dark:border-zinc-700 object-cover w-[180px] h-[240px] md:w-[260px] md:h-[320px]"
          />
        </div>
      </div>
    </section>
  );
}
