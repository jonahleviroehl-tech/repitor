"use client";

import { cn } from "@/lib/utils";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="my-2 ml-4 list-disc space-y-1 text-sm text-foreground/90">
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trimEnd();

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={key++} className="mt-6 mb-2 text-lg font-semibold tracking-tight text-foreground">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={key++} className="mt-4 mb-1.5 text-base font-semibold text-foreground">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote key={key++} className="my-2 border-l-2 border-primary/30 pl-3 text-sm italic text-muted-foreground">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listItems.push(trimmed.slice(2));
      continue;
    }

    if (trimmed === "") {
      flushList();
      continue;
    }

    flushList();
    elements.push(
      <p key={key++} className="my-1.5 text-sm leading-relaxed text-foreground/90">
        {renderInline(trimmed)}
      </p>
    );
  }

  flushList();

  return <div className={cn("space-y-0", className)}>{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let i = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      parts.push(<strong key={i++} className="font-semibold text-foreground">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    const italicMatch = remaining.match(/^\*(.+?)\*/);
    if (italicMatch) {
      parts.push(<em key={i++}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    const codeMatch = remaining.match(/^`(.+?)`/);
    if (codeMatch) {
      parts.push(<code key={i++} className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{codeMatch[1]}</code>);
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    const nextSpecial = remaining.search(/[\*`]/);
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    }
    if (nextSpecial === 0) {
      parts.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      parts.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}
