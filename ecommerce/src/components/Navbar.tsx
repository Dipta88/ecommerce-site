"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Moon, Search, ShoppingBag, Sun } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { categories } from "@/lib/products";

export default function Navbar() {
  const { count } = useCart();
  const { resolved, toggle } = useTheme();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
            N
          </span>
          <span className="hidden text-xl font-bold tracking-tight sm:block">NexCart</span>
        </Link>

        <form onSubmit={submit} className="relative hidden flex-1 max-w-md md:block">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, categories..."
            className="w-full rounded-full border border-border bg-muted/60 px-4 py-2 pl-10 text-sm outline-none transition focus:border-accent focus:bg-background focus:ring-2 focus:ring-accent/30"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </form>

        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-muted hover:text-foreground dark:text-zinc-300"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-zinc-700 transition hover:border-accent hover:text-accent dark:text-zinc-200 md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-zinc-700 transition hover:border-pink-400 hover:text-pink-500 dark:text-zinc-200"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>

          <button
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-zinc-700 transition hover:border-accent hover:text-accent dark:text-zinc-200"
            aria-label="Toggle theme"
          >
            {resolved === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-zinc-700 transition hover:border-accent hover:text-accent dark:text-zinc-200"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-1 text-[11px] font-bold text-white shadow"
              >
                {count}
              </motion.span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <form onSubmit={submit} className="relative">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-border bg-muted/60 px-4 py-2 pl-10 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          </form>
        </div>
      )}
    </header>
  );
}
