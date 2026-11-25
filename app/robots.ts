import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_CANONIQUE } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_CANONIQUE}/sitemap.xml`,
  };
}
