'use client';

import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import GiftingEditSection from '@/components/GiftingEditSection';
import CraftStory from '@/components/CraftStory';
import FragranceFinder from '@/components/FragranceFinder';

export default function Home() {
  return (
    <main className="w-full bg-surface flex flex-col">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <GiftingEditSection />
      <CraftStory />
      <FragranceFinder />
    </main>
  );
}
