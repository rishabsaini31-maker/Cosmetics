import ProductCard from "./ProductCard";
import { products } from "../lib/products";

// Example: pick top 3 best sellers (customize as needed)
const bestSellers = products.slice(0, 3);

export default function BestSellers() {
  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-50">
          Our Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
