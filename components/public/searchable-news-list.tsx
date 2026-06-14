"use client";

import React, { useState } from "react";
import { Search, Compass, BookOpen } from "lucide-react";
import { Post, Category } from "@/lib/store";
import NewsCard from "./news-card";

interface SearchableNewsListProps {
  initialPosts: Post[];
  categories: Category[];
}

export default function SearchableNewsList({ initialPosts, categories }: SearchableNewsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Filter posts based on search input and active category
  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory =
      activeCategory === "all" || post.category_id === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 w-full">
      {/* Search Input and Categories Toggles Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border/40 pb-6">
        
        {/* Categories toggles */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.8 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-primary text-white shadow-sm"
                : "border border-border bg-card text-muted hover:text-foreground"
            }`}
          >
            Semua Kajian
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.8 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border bg-card text-muted hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Cari artikel atau hasil riset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-card border border-border rounded-full text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
          />
        </div>

      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center space-y-3">
          <BookOpen className="w-10 h-10 text-muted" />
          <h3 className="text-lg font-bold text-foreground">Artikel Tidak Ditemukan</h3>
          <p className="text-xs md:text-sm text-muted">
            Tidak ada artikel yang cocok dengan filter pencarian Anda saat ini. Coba kata kunci lainnya.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredPosts.map((post) => {
            const cat = categories.find((c) => c.id === post.category_id);
            return (
              <NewsCard
                key={post.id}
                post={post}
                categoryName={cat?.name || "Riset Sosial"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
