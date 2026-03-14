import TopBannerSlider from "../components/TopBannerSlider";
import Navbar from "../components/Navbar";
import SubHeader from "../components/SubHeader";

import Footer from "../components/Footer";
import LiveSupportWidget from "../components/LiveSupportWidget";
import PoweredBySCS from "../components/PoweredBySCS";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/products";
import AdBannerSlider from "../components/AdBannerSlider";

import BestSellers from "../components/BestSellers";
import CreateYourOwnKit from "../components/CreateYourOwnKit";
import CustomerTestimonials from "../components/CustomerTestimonials";
import FutureOfPersonalCare from "../components/FutureOfPersonalCare";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <TopBannerSlider />
      <Navbar />
      <SubHeader />
      {/* Sliding Advertising Banner Section */}
      <AdBannerSlider />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-zinc-50">
            Glow Up Your Routine
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Discover science-backed skincare for every skin type. Shop our
            bestsellers and start your journey to radiant, healthy skin.
          </p>
        </section>
        <BestSellers />
        <CreateYourOwnKit />
        <FutureOfPersonalCare />
      </main>
      <CustomerTestimonials />
      <Footer />
      <LiveSupportWidget />
      <PoweredBySCS />
    </div>
  );
}
