import { CalendarDays, Clock3 } from "lucide-react";
import type { BlogPost } from "@/shared/types/content";
import { BlogCard } from "./blog-card";
import { ShareActions } from "./share-actions";
import sanitizeHtml from "sanitize-html";
function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
export function BlogArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const html = sanitizeHtml(post.contentHtml ?? "", {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "strong",
      "em",
      "u",
      "blockquote",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "hr",
      "br",
      "figure",
      "figcaption",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
      figure: [],
      figcaption: [],
      span: ["style"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-32 md:px-10">
      <article className="mx-auto max-w-4xl">
        <header className="mb-12">
          <div className="mb-4 inline-flex items-center rounded-sm border border-slate-200 bg-slate-100 px-3 py-1">
            <span className="mr-2 h-2 w-2 rounded-full bg-secondary" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              {post.category}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-primary md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200 py-4 text-sm text-slate-500">
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                  {post.author.avatar && (
                    <img
                      src={post.author.avatar}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <span className="block font-semibold text-primary">
                    {post.author.name}
                  </span>
                  {post.author.role && (
                    <span className="text-xs">{post.author.role}</span>
                  )}
                </div>
              </div>
            )}
            <span className="flex items-center gap-2">
              <CalendarDays size={17} />
              {formatDate(post.publishedAt)}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-2">
                <Clock3 size={17} />
                {post.readingTime} min de lectura
              </span>
            )}
          </div>
        </header>
        {post.coverImage && (
          <figure className="mb-12 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
            <img
              src={post.coverImage}
              alt=""
              className="max-h-[560px] w-full object-cover"
            />
          </figure>
        )}
        <div
          className="article-content text-lg leading-8 text-ink"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {post.tags?.length ? (
          <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-6 md:flex-row">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Etiquetas:
              </span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-slate-100 px-3 py-1 text-sm text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
            <ShareActions url={`/blog/${post.slug}`} />
          </div>
        ) : null}
      </article>
      <section className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl bg-primary p-8 text-center shadow-soft md:p-12">
        <h2 className="font-display text-3xl font-bold text-white">
          ¿Necesita optimizar su infraestructura tecnológica?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
          Nuestros consultores pueden evaluar su arquitectura actual y diseñar
          una estrategia de modernización alineada con sus objetivos
          financieros.
        </p>
        <a
          href="/contacto"
          className="mt-8 inline-flex items-center gap-2 rounded bg-secondary px-8 py-3 font-semibold text-primary transition-transform hover:-translate-y-1"
        >
          Contactar para asesoría →
        </a>
      </section>
      <section className="mx-auto mt-16 max-w-container border-t border-slate-200 pt-12">
        <h2 className="mb-8 font-display text-2xl font-bold text-primary">
          Artículos Relacionados
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.slice(0, 3).map((item) => (
            <BlogCard key={item.id} post={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
