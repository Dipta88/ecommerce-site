import { notFound } from "next/navigation";
import { getCategory, getProductsByCategory } from "@/lib/products";
import CategoryBrowser from "@/components/CategoryBrowser";

export async function generateStaticParams() {
  const { categories } = await import("@/lib/products");
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = getProductsByCategory(slug);
  return <CategoryBrowser category={category} products={items} />;
}
