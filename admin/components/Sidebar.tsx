import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-full w-64 bg-zinc-900 text-white flex flex-col py-8 px-4 gap-4 fixed left-0 top-0 z-40 border-r border-zinc-800">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <nav className="flex flex-col gap-3">
        <Link href="/" className="hover:bg-zinc-800 rounded px-3 py-2">
          Dashboard
        </Link>
        <span className="text-xs uppercase text-zinc-400 mt-4 mb-1 tracking-widest">
          Homepage Sections
        </span>
        <Link
          href="/homepage/banner"
          className="hover:bg-zinc-800 rounded px-3 py-2"
        >
          Homepage Banner Images
        </Link>
        <Link
          href="/homepage/top-banner"
          className="hover:bg-zinc-800 rounded px-3 py-2"
        >
          Top Banner
        </Link>
        <Link
          href="/homepage/kit"
          className="hover:bg-zinc-800 rounded px-3 py-2"
        >
          Create Your Own Kit
        </Link>
        <Link
          href="/homepage/trust"
          className="hover:bg-zinc-800 rounded px-3 py-2"
        >
          Skincare You Can Trust
        </Link>
        <span className="text-xs uppercase text-zinc-400 mt-4 mb-1 tracking-widest">
          Other
        </span>
        <Link href="/products" className="hover:bg-zinc-800 rounded px-3 py-2">
          Products
        </Link>
        <Link href="/orders" className="hover:bg-zinc-800 rounded px-3 py-2">
          Orders
        </Link>
        <Link href="/users" className="hover:bg-zinc-800 rounded px-3 py-2">
          Users
        </Link>
        <Link href="/analytics" className="hover:bg-zinc-800 rounded px-3 py-2">
          Analytics
        </Link>
        <Link href="/settings" className="hover:bg-zinc-800 rounded px-3 py-2">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
