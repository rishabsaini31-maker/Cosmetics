export default function Footer() {
  return (
    <footer className="w-full py-8 px-8 bg-zinc-100 text-center text-zinc-500 mt-16">
      &copy; {new Date().getFullYear()} AdminPanel. All rights reserved.
    </footer>
  );
}
