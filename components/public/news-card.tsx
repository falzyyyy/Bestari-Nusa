import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { Post } from "@/lib/store";

interface NewsCardProps {
  post: Post;
  categoryName?: string;
}

export default function NewsCard({ post, categoryName = "Riset Aksi" }: NewsCardProps) {
  return (
    <Link 
      href={`/news/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 w-full"
    >
      {/* Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-primary-soft/10">
        <img
          src={post.cover_image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800&h=500"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Tag overlay */}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-white/90 dark:bg-card/90 text-primary-dark dark:text-primary text-[10px] font-bold uppercase tracking-wider rounded border border-border/20 shadow-sm">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Card Body content */}
      <div className="flex flex-col p-6 flex-grow">
        {/* Metadata bar */}
        <div className="flex items-center gap-3.5 text-xs text-muted mb-2.5">
          {post.published_at && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{post.reading_time || 2} Min Baca</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-xs md:text-sm text-muted leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
