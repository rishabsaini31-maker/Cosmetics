import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 bg-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold tracking-tight text-black">
        AdminPanel
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <Link href="/orders" className="hover:underline">
          Orders
        </Link>
        <Link href="/users" className="hover:underline">
          Users
        </Link>
        <Link href="/analytics" className="hover:underline">
          Analytics
        </Link>
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
}
