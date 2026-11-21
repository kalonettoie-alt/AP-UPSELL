import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import fr from "@/content/fr";
import { dmMono, inter, youngSerif } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: fr.seo.titre,
  description: fr.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: fr.seo.titre,
    description: fr.seo.description,
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: fr.marque,
    // Image de partage : [à fournir]
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF4EA",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${youngSerif.variable} ${inter.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
