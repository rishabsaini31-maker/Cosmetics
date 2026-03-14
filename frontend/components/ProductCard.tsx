import Image from "next/image";
import Button from "./Button";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition-shadow">
      <Image
        src={product.image}
        alt={product.name}
        width={180}
        height={180}
        className="rounded mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-zinc-500 mb-2">{product.category}</p>
      <p className="font-bold text-xl mb-4">${product.price}</p>
      <Button>Add to Cart</Button>
    </div>
  );
}
