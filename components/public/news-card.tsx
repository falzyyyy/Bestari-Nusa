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
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-card/65 hover:border-primary/40 hover:shadow-sm transition-all duration-[800ms] ease-[0.16,1,0.3,1] w-full"
    >
      {/* Cover Image with Grayscale Filter & Slow Custom Zoom */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-primary-soft/10">
        <img
          src={post.cover_image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800&h=550"}
          alt={post.title}
          className="w-full h-full object-cover grayscale saturate-[0.8] brightness-[0.95] group-hover:grayscale-0 group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[800ms] ease-[0.16,1,0.3,1]"
          loading="lazy"
        />
        {/* Category Tag overlay - Vintage Label */}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-white/95 dark:bg-card/95 text-primary text-[9px] font-bold uppercase tracking-widest rounded border border-border/20 shadow-sm">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Card Body content */}
      <div className="flex flex-col p-6 flex-grow">
        {/* Metadata bar */}
        <div className="flex items-center gap-3.5 text-xs text-muted mb-3">
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
        <h3 className="text-base md:text-lg font-bold tracking-tight mb-2.5 text-foreground group-hover:text-primary transition-colors duration-500 line-clamp-2">
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
