import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 bg-white shadow-sm sticky top-12 z-40">
      <Link href="/" className="text-2xl font-bold tracking-tight text-black">
        BrandName
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/cart" className="hover:underline">
          🛒 Cart
        </Link>
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
}
