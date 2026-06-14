import React from "react";
import Link from "next/link";
import { db } from "@/lib/supabase";
import ProgramCard from "@/components/public/program-card";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Program Kerja",
  description: "Daftar program pemberdayaan pemuda, social mapping, dan inisiatif keberlanjutan Bestari Nusa."
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProgramsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || "";

  // Fetch active programs and categories
  const [allPrograms, categories] = await Promise.all([
    db.getPrograms(false, activeCategory || undefined),
    db.getCategories("program")
  ]);

  return (
    <div className="w-full py-16 md:py-24 space-y-16">
      
      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
          PROGRAM KAMI
        </h4>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Inisiatif Dampak Nyata
        </h1>
        <p className="text-sm md:text-base text-muted max-w-2xl mx-auto">
          Dari inkubasi kepemimpinan hingga restorasi pesisir pantai. Temukan ruang kontribusi Anda untuk mewujudkan Nusantara yang lestari.
        </p>
      </section>

      {/* Category Pills Filter */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border/40 pb-6">
          <Link
            href="/programs"
            className={`px-4.5 py-1.8 rounded-full text-xs md:text-sm font-semibold transition-all ${
              activeCategory === ""
                ? "bg-primary text-white shadow-sm"
                : "border border-border bg-card text-muted hover:text-foreground"
            }`}
          >
            Semua Program
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/programs?category=${cat.slug}`}
              className={`px-4.5 py-1.8 rounded-full text-xs md:text-sm font-semibold transition-all ${
                activeCategory === cat.slug
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border bg-card text-muted hover:text-foreground"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Programs Grid */}
      <section className="max-w-6xl mx-auto px-6">
        {allPrograms.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center space-y-3">
            <BookOpen className="w-10 h-10 text-muted" />
            <h3 className="text-lg font-bold text-foreground">Program Tidak Ditemukan</h3>
            <p className="text-xs md:text-sm text-muted">
              Belum ada program aktif di kategori ini. Silakan kembali lagi nanti atau hubungi kami untuk informasi lebih lanjut.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {allPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
