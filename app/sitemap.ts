import type { MetadataRoute } from "next";
import { concepts } from "@/data/concepts";

const baseUrl = "https://contextcraft.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/basics",
    "/prompt-engineering",
    "/context-engineering",
    "/prompts",
    "/workflows",
    "/tools",
    "/limitations",
    "/search",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...concepts.map((concept) => ({
      url: `${baseUrl}/concepts/${concept.slug}`,
      lastModified: new Date(),
    })),
  ];
}
