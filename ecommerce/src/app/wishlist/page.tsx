"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { ids, clear } = useWishlist();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const items = mounted ? products.filter((p) => ids.includes(p.id)) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Your Wishlist</h1>
          <p className="mt-1 text-sm text-zinc-500">{items.length} saved items</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-6xl">♡</div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">No saved items yet.</p>
          <Link href="/" className="mt-4 inline-block text-accent hover:underline">
            Discover products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
