import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/shared/types/content";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-EC", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-lg border border-slate-200/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-soft">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {post.coverImage ? <img src={post.coverImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="h-full w-full bg-gradient-to-br from-primary to-slate-700" />}
      </div>
      <div className="flex min-h-[220px] flex-col p-5">
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">{post.category}</span>
        <h3 className="line-clamp-2 font-display text-xl font-bold text-primary transition-colors group-hover:text-secondary">{post.title}</h3>
        <p className="mt-3 line-clamp-3 flex-grow text-sm leading-6 text-muted">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><CalendarDays size={14} />{formatDate(post.publishedAt)}</span>
          <ArrowRight size={17} className="text-secondary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
