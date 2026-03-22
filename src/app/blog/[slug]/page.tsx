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
        &larr; Alle Beiträge
      </Link>

      <header className="mt-6">
        <p className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("de-DE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        )}
      </header>

      <div className="mt-10 border-t border-border pt-10">
        <MarkdownRenderer content={post.content} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </article>
  );
}
