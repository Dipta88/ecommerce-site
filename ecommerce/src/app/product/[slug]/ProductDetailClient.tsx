"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-zinc-300 dark:border-zinc-700">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="h-11 w-11 text-lg font-bold text-zinc-600 hover:text-indigo-600 dark:text-zinc-300"
        >
          −
        </button>
        <span className="w-10 text-center font-semibold">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
          className="h-11 w-11 text-lg font-bold text-zinc-600 hover:text-indigo-600 dark:text-zinc-300"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className="flex-1 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-zinc-300 sm:flex-none"
      >
        {added ? "✓ Added to cart" : "Add to cart"}
      </button>
      <Link href="/cart" className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-bold hover:border-indigo-400 dark:border-zinc-700">
        Go to cart
      </Link>
    </div>
  );
}
