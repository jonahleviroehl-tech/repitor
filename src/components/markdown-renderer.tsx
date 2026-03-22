"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

const components: Components = {
  // Downgrade h1 → h2 since page title is already h1
  h1: ({ children }) => (
    <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-base leading-relaxed text-foreground/90 md:text-lg md:leading-relaxed">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em>{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 rounded-lg border-l-[3px] border-primary/40 bg-muted/40 py-1 pr-4 pl-4 text-foreground/80 [&>p]:my-2">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-1 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/90 md:text-lg marker:text-primary/50">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-1 list-decimal space-y-2 pl-5 text-base leading-relaxed text-foreground/90 md:text-lg marker:text-primary/50">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  hr: () => <hr className="my-8 border-border/60" />,
  code: ({ children }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground/90">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-5 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[600px] text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border bg-muted/50 text-left text-xs font-semibold uppercase tracking-wider text-foreground/70">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border/60">{children}</tbody>
  ),
  tr: ({ children }) => <tr className="transition-colors hover:bg-muted/30">{children}</tr>,
  th: ({ children }) => (
    <th className="px-3 py-2.5 text-left font-semibold text-foreground/80">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2.5 text-foreground/80">{children}</td>
  ),
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("max-w-none", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
