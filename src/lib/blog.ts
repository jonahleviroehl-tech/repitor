import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keyword?: string;
  keywords?: string[];
  author?: string;
  content: string;
};

function parseFile(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: (data.slug as string) || filename.replace(/\.md$/, ""),
    title: (data.title as string) || "",
    description: (data.description as string) || "",
    date: (data.date as string) || "",
    keyword: data.keyword as string | undefined,
    keywords: data.keywords as string[] | undefined,
    author: data.author as string | undefined,
    content,
  };
}

function getFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllPosts(): BlogPost[] {
  return getFiles()
    .map(parseFile)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const files = getFiles();
  for (const filename of files) {
    const post = parseFile(filename);
    if (post.slug === slug) return post;
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getFiles().map((f) => parseFile(f).slug);
}
