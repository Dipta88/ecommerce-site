"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-300 blur-3xl animate-pulse" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur"
            >
              ✨ New arrivals every week
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
            >
              Shop the future of everyday living.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-white/90">
              Discover 5 curated categories with 25 hand-picked products — electronics, fashion, home, beauty, and sports.
              Free shipping over $50 and easy 30-day returns.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/category/electronics"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-lg transition hover:bg-zinc-100"
              >
                Shop Now
              </Link>
              <Link
                href="/wishlist"
                className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/20"
              >
                View Wishlist
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category pills */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-wrap gap-3"
        >
          {categories.map((c) => (
            <motion.div key={c.slug} variants={fadeUp}>
              <Link
                href={`/category/${c.slug}`}
                className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${c.color} px-4 py-2 text-sm font-semibold text-white shadow transition hover:scale-105`}
              >
                <span>{c.emoji}</span>
                {c.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Product sections */}
      {categories.map((cat, ci) => {
        const items = getProductsByCategory(cat.slug);
        return (
          <section key={cat.slug} id={cat.slug} className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.05 }}
              className="mb-6 flex items-end justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-xl text-white shadow`}
                  >
                    {cat.emoji}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{cat.name}</h2>
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{cat.description}</p>
              </div>
              <Link href={`/category/${cat.slug}`} className="text-sm font-semibold text-accent hover:underline">
                View all →
              </Link>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
