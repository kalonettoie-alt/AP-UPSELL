import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import fr from "@/content/fr";
import { dmMono, inter, youngSerif } from "@/lib/fonts";
import { schemaOrganisation } from "@/lib/schema";
import { robotsPage, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: fr.seo.titre,
  description: fr.seo.description,
  // Fermé aux moteurs de recherche tant que NEXT_PUBLIC_SITE_URL n'est pas définie (voir lib/site.ts).
  robots: robotsPage(),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF4EA",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${youngSerif.variable} ${inter.variable} ${dmMono.variable}`}>
      <body>
        {children}
        <JsonLd donnees={schemaOrganisation()} />
      </body>
    </html>
  );
}
