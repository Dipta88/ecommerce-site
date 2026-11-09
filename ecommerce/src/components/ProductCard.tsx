"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const liked = mounted && has(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    toast.success(`${product.name} added to cart`, { icon: "🛒" });
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden">
        <div
          className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${product.color} text-7xl`}
        >
          <motion.span
            className="drop-shadow-lg"
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {product.emoji}
          </motion.span>
          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-zinc-900 shadow backdrop-blur">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute right-12 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          toggle(product.id);
          toast(liked ? "Removed from wishlist" : "Added to wishlist", { icon: liked ? "💔" : "♥" });
        }}
        aria-label="Toggle wishlist"
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur transition ${
          liked ? "text-pink-500" : "text-zinc-400 hover:text-pink-500"
        }`}
      >
        <Heart className={`h-5 w-5 ${liked ? "fill-pink-500" : ""}`} />
      </motion.button>

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-1 text-base font-semibold text-foreground transition hover:text-accent"
        >
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{product.description}</p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</div>
            {product.originalPrice && (
              <div className="text-xs text-zinc-400 line-through">${product.originalPrice.toFixed(2)}</div>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow transition ${
              added
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            } disabled:cursor-not-allowed disabled:bg-zinc-300`}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.stock === 0 ? "Out of stock" : added ? "Added" : "Add"}
          </motion.button>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
          <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
          <span className="opacity-0 transition group-hover:opacity-100">View details →</span>
        </div>
      </div>
    </motion.div>
  );
}
