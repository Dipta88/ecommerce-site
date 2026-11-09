import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getProductsByCategory, categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  const { products } = await import("@/lib/products");
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const category = categories.find((c) => c.slug === product.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/#${product.category}`} className="hover:text-indigo-600">
          {category?.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-white">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div
          className={`flex h-96 items-center justify-center rounded-3xl bg-gradient-to-br ${product.color} text-[10rem] shadow-2xl`}
        >
          <span className="drop-shadow-2xl">{product.emoji}</span>
        </div>

        <div>
          {product.badge && (
            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-amber-500">★★★★★</span>
            <span className="font-medium">{product.rating}</span>
            <span className="text-zinc-500">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-zinc-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-zinc-600 dark:text-zinc-300">{product.description}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <span className="text-emerald-500">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 text-sm">
            <span className="font-medium">Availability: </span>
            {product.stock > 0 ? (
              <span className="text-emerald-600">{product.stock} in stock — ships in 1-2 days</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>

          <ProductDetailClient product={product} />

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-zinc-200 pt-6 text-center text-xs text-zinc-500 dark:border-zinc-800">
            <div>
              <div className="text-2xl">🚚</div>
              Free shipping $50+
            </div>
            <div>
              <div className="text-2xl">↩️</div>
              30-day returns
            </div>
            <div>
              <div className="text-2xl">🔒</div>
              Secure checkout
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
