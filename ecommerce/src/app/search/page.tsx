import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const instant = false;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").trim().toLowerCase();
  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.features.some((f) => f.toLowerCase().includes(query)) ||
          p.category.includes(query)
      )
    : products;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {query ? `Search results for "${q}"` : "All products"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">{results.length} products found</p>
      </div>

      {results.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-6xl">🔎</div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">No products match your search.</p>
          <Link href="/" className="mt-4 inline-block text-accent hover:underline">
            Back to home
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
