'use client';

import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import CraftStory from '@/components/CraftStory';
import FragranceFinder from '@/components/FragranceFinder';

export default function Home() {
  const handleAddToCart = () => {
    // Handled by global cart context or local quick-add
  };

  return (
    <main className="w-full bg-surface flex flex-col">
      <Hero />
      <Categories />
      <FeaturedProducts onAddToCart={handleAddToCart} />
      <CraftStory />
      <FragranceFinder />
    </main>
  );
}
