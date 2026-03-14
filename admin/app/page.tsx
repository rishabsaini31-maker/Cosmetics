import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-zinc-50">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Manage products, orders, users, and view analytics. Use the
            navigation above to get started.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
