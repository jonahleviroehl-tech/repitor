import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
            Aus dem Blog
          </h2>
          <Link
            href="/blog"
            className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Alle Beitr&auml;ge
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
            >
              <p className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
