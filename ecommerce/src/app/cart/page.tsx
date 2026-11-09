"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQty, removeItem, clear, subtotal } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="text-7xl">🛒</div>
        <h1 className="mt-4 text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Looks like you haven&apos;t added anything yet. Start exploring our collections.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow hover:bg-indigo-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Shopping Cart</h1>
      <p className="mt-1 text-sm text-zinc-500">{items.reduce((s, i) => s + i.quantity, 0)} items</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div
                className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.product.color} text-4xl`}
              >
                {item.product.emoji}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="font-semibold hover:text-indigo-600"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-zinc-400 hover:text-red-500"
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-1 text-sm text-zinc-500">${item.product.price.toFixed(2)} each</div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-full border border-zinc-300 dark:border-zinc-700">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="h-8 w-8 text-sm font-bold text-zinc-600 hover:text-indigo-600 dark:text-zinc-300"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="h-8 w-8 text-sm font-bold text-zinc-600 hover:text-indigo-600 dark:text-zinc-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={clear}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Clear cart
            </button>
            <Link href="/" className="text-sm font-medium text-indigo-600 hover:underline">
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Tax (8%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
              <div className="flex justify-between text-base font-extrabold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          {subtotal < 50 && subtotal > 0 && (
            <p className="mt-3 text-xs text-amber-600">
              Add ${(50 - subtotal).toFixed(2)} more for free shipping.
            </p>
          )}
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-indigo-600 py-3 text-center text-sm font-bold text-white shadow hover:bg-indigo-700"
          >
            Proceed to Checkout
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
            <span>🔒</span> Secure checkout
          </div>
        </div>
      </div>
    </div>
  );
}
