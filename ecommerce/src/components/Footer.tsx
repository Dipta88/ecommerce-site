import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow">
                N
              </span>
              <span className="text-xl font-bold tracking-tight">NexCart</span>
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Your one-stop destination for premium products across electronics, fashion, home, beauty, and sports.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/" className="hover:text-indigo-600">All Products</Link></li>
              <li><Link href="/#electronics" className="hover:text-indigo-600">Electronics</Link></li>
              <li><Link href="/#fashion" className="hover:text-indigo-600">Fashion</Link></li>
              <li><Link href="/#home-living" className="hover:text-indigo-600">Home & Living</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li><span className="cursor-default">Help Center</span></li>
              <li><span className="cursor-default">Shipping & Returns</span></li>
              <li><span className="cursor-default">Track Order</span></li>
              <li><span className="cursor-default">Contact Us</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">Stay Updated</h4>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Get the latest deals and new arrivals.</p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
              />
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500 dark:border-zinc-800">
          © 2026 NexCart. Built with Next.js & Tailwind CSS. Demo store — no real transactions.
        </div>
      </div>
    </footer>
  );
}
