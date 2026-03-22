import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter text-foreground md:text-5xl">
        Blog
      </h1>
      <p className="mt-3 max-w-[50ch] text-lg leading-relaxed text-muted-foreground">
        Tipps zu Klausurtechnik, Gutachtenstil und Examensvorbereitung.
      </p>

      {posts.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-base text-muted-foreground">
            Beitr&auml;ge folgen in K&uuml;rze. Trag dich auf die{" "}
            <Link
              href="/#waitlist"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Warteliste
            </Link>{" "}
            ein, um nichts zu verpassen.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("de-DE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-[55ch] text-base leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-8 size-5 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
