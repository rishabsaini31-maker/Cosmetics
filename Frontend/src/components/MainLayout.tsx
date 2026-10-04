'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-surface">
        <Header />
        <div className="flex-1 pt-28">{children}</div>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
