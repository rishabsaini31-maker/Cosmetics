'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Product } from '@/components/FeaturedProducts';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([
    {
      id: 'prod-01',
      name: 'NOIR 01 Eau de Parfum',
      tagline: 'Smoked Oudh, Wild Bergamot & Teak Resin',
      category: 'Parfum Extrait',
      price: '₹6,800',
      badge: 'Bestseller',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      notes: ['Wild Bergamot', 'Mysore Sandalwood', 'Dry Amber'],
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
      <div className="flex-1 pt-28">{children}</div>
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}
