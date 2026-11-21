import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return [];
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/mentions-legales/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cgv/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
