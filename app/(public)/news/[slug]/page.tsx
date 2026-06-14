import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await db.getPostBySlug(resolvedParams.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await db.getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Fetch all categories to resolve the category name
  const categories = await db.getCategories("news");
  const category = categories.find(c => c.id === post.category_id);

  // Fetch author profile if possible (mocking fallback values here)
  const authorName = "Tim Riset Bestari";
  const authorRole = "Editor Lapangan";
  const authorAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100";

  return (
    <div className="w-full py-16 md:py-24 space-y-10">
      
      {/* Back button and Meta header */}
      <section className="max-w-3xl mx-auto px-6">
        <Link 
          href="/news"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-muted hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Cerita
        </Link>

        {/* Category Tag */}
        <span className="px-2.5 py-1 bg-primary-soft/60 dark:bg-primary-soft/10 text-primary-dark dark:text-primary text-[10px] font-bold uppercase tracking-wider rounded border border-primary/20">
          {category?.name || "Riset Sosial"}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight mt-4.5">
          {post.title}
        </h1>

        {/* Author & publishing stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-6 mt-6">
          
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-soft/40 border border-border">
              <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-foreground">{authorName}</h5>
              <p className="text-[10px] text-muted">{authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted">
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>{post.reading_time || 3} Menit Baca</span>
            </div>
          </div>

        </div>
      </section>

      {/* Large Cover Visual */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="aspect-[21/10] w-full rounded-3xl overflow-hidden border border-border shadow-sm">
          <img
            src={post.cover_image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200&h=600"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Content prose parsing */}
      <section className="max-w-3xl mx-auto px-6">
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </section>

    </div>
  );
}
