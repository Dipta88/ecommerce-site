"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
  });

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-48 animate-pulse rounded-2xl bg-muted" />
            <div className="h-32 animate-pulse rounded-2xl bg-muted" />
          </div>
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="text-7xl">📦</div>
        <h1 className="mt-4 text-3xl font-bold">Nothing to checkout</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Your cart is empty.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow hover:bg-indigo-700">
          Shop now
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="text-7xl">🎉</div>
        <h1 className="mt-4 text-3xl font-bold">Order placed!</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Thank you, {form.name || "customer"}. A confirmation has been sent to {form.email || "your email"}.
        </p>
        <p className="mt-1 text-sm text-zinc-500">Order total: ${total.toFixed(2)}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow hover:bg-indigo-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const update = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    clear();
    setPlaced(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <form onSubmit={submit} className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold">Contact & Shipping</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" value={form.name} onChange={update("name")} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
              <input required type="email" placeholder="Email" value={form.email} onChange={update("email")} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
              <input required placeholder="Address" value={form.address} onChange={update("address")} className="sm:col-span-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
              <input required placeholder="City" value={form.city} onChange={update("city")} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
              <input required placeholder="ZIP code" value={form.zip} onChange={update("zip")} className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold">Payment</h2>
            <p className="mt-1 text-xs text-zinc-500">Demo only — no real charge.</p>
            <input
              required
              placeholder="Card number (demo)"
              value={form.card}
              onChange={update("card")}
              className="mt-4 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-indigo-600 py-3 text-sm font-bold text-white shadow hover:bg-indigo-700"
          >
            Place Order — ${total.toFixed(2)}
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.product.id} className="flex justify-between gap-2">
                <span className="text-zinc-600 dark:text-zinc-400">
                  {i.product.name} × {i.quantity}
                </span>
                <span className="font-medium">${(i.product.price * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-zinc-200 pt-3 text-sm dark:border-zinc-800">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-extrabold dark:border-zinc-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
