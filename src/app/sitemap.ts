import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import {
  listKlausuren,
  listTeilgebieteInRechtsgebiet,
} from "@/lib/klausuren";
import { getPublishedRechtsgebiete } from "@/lib/rechtsgebiete";

const BASE_URL = "https://repitor.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const klausuren = listKlausuren();
  const publishedGebiete = getPublishedRechtsgebiete();

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const klausurEntries: MetadataRoute.Sitemap = klausuren.map((klausur) => ({
    url: `${BASE_URL}/klausuren/${klausur.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const hubEntries: MetadataRoute.Sitemap = publishedGebiete.map((rg) => ({
    url: `${BASE_URL}/klausuren/${rg.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const teilgebietEntries: MetadataRoute.Sitemap = publishedGebiete.flatMap(
    (rg) =>
      listTeilgebieteInRechtsgebiet(rg.slug).map((tg) => ({
        url: `${BASE_URL}/klausuren/${rg.slug}/${tg.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  const legalEntries: MetadataRoute.Sitemap = [
    "/impressum",
    "/datenschutz",
    "/agb",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/klausuren`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...hubEntries,
    ...teilgebietEntries,
    ...klausurEntries,
    ...blogEntries,
    ...legalEntries,
  ];
}
