import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords ?? (post.keyword ? [post.keyword] : undefined),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://repitor.de/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Repitor" },
    publisher: { "@type": "Organization", name: "Repitor" },
    url: `https://repitor.de/blog/${slug}`,
  };

  return (
    <article>
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Alle Beitr&auml;ge
      </Link>

      <header className="mt-8 rounded-2xl border border-border/60 bg-gradient-to-b from-accent/60 to-transparent px-6 py-8 md:px-8 md:py-10">
        <div className="flex flex-wrap items-center gap-3">
          {post.keyword && (
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {post.keyword}
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.author && (
            <>
              <span className="text-muted-foreground/40">&middot;</span>
              <span className="text-sm text-muted-foreground">{post.author}</span>
            </>
          )}
        </div>
        <h1 className="mt-4 max-w-[22ch] text-3xl font-bold leading-tight tracking-tighter text-foreground md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            {post.description}
          </p>
        )}
      </header>

      <div className="mt-10 pt-2">
        <MarkdownRenderer content={post.content} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </article>
  );
}
