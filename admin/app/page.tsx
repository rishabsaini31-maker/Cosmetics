import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Manage products, orders, users, and view analytics. Use the
            navigation to get started.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
