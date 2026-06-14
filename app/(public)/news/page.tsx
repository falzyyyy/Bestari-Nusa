import React from "react";
import { db } from "@/lib/supabase";
import SearchableNewsList from "@/components/public/searchable-news-list";

export const metadata = {
  title: "Kajian & Cerita Dampak",
  description: "Temukan publikasi ilmiah, mapping desa, policy brief, dan kabar berita terbaru dari Bestari Nusa."
};

export default async function NewsPage() {
  // Fetch news articles and categories
  const [allPosts, categories] = await Promise.all([
    db.getPosts(false),
    db.getCategories("news")
  ]);

  return (
    <div className="w-full py-16 md:py-24 space-y-12">
      
      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          CERITA & KAJIAN
        </h4>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Kabar Dampak & Riset Aksi
        </h1>
        <p className="text-sm md:text-base text-muted max-w-2xl mx-auto">
          Bagian dari komitmen keterbukaan informasi. Kami mendokumentasikan setiap temuan riset antropologis desa serta cerita perjuangan program di sini.
        </p>
      </section>

      {/* Main Searchable List */}
      <section className="max-w-6xl mx-auto px-6">
        <SearchableNewsList initialPosts={allPosts} categories={categories} />
      </section>

    </div>
  );
}
