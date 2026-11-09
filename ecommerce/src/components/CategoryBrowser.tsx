"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Product, Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export default function CategoryBrowser({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const [sort, setSort] = useState<Sort>("featured");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice && p.rating >= minRating
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [products, sort, minPrice, maxPrice, minRating]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/" className="text-sm text-zinc-500 hover:text-accent">
            ← Back to home
          </Link>
          <div className="mt-2 flex items-center gap-3">
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-2xl text-white shadow`}>
              {category.emoji}
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{category.name}</h1>
              <p className="text-sm text-zinc-500">{category.description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-500">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider">Filters</h3>

          <div className="mt-5">
            <label className="text-xs font-semibold text-zinc-500">Price range</label>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                placeholder="Min"
              />
              <span className="text-zinc-400">–</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-semibold text-zinc-500">Minimum rating</label>
            <div className="mt-2 flex gap-1">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    minRating === r
                      ? "bg-accent text-white"
                      : "bg-muted text-zinc-600 hover:bg-muted/70 dark:text-zinc-300"
                  }`}
                >
                  {r === 0 ? "All" : `${r}+`}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(500);
              setMinRating(0);
              setSort("featured");
            }}
            className="mt-6 w-full rounded-full border border-border py-2 text-sm font-medium hover:bg-muted"
          >
            Reset filters
          </button>
        </aside>

        <div>
          <p className="mb-4 text-sm text-zinc-500">{filtered.length} products</p>
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-zinc-500">No products match these filters.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
