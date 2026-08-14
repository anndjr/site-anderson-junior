import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-mono",
  display: "swap",
});

const shareImageUrl = new URL("/share-preview-v2.jpg", siteUrl);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.title,
    template: "%s | Anderson Junior",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Música",
  keywords: [
    "Anderson Junior",
    "cantor sertanejo",
    "cantor sertanejo em Passos",
    "show sertanejo em Minas Gerais",
    "show para prefeituras",
    "cantor para casamentos",
    "banda sertaneja para eventos",
    "Passos MG",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: shareImageUrl,
        secureUrl: shareImageUrl,
        width: 1200,
        height: 630,
        alt: "Anderson Junior, cantor sertanejo de Passos, Minas Gerais",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: shareImageUrl,
        secureUrl: shareImageUrl,
        width: 1200,
        height: 630,
        alt: "Anderson Junior, cantor sertanejo de Passos, Minas Gerais",
        type: "image/jpeg",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#171310",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
