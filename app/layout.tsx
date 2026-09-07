import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import ClientLayout from "./ClientLayout";
import FacebookPixel from "../components/FacebookPixel";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "IRONZ | Équipement fitness et musculation au Maroc",
    template: "%s | IRONZ",
  },
  description:
    "Équipements de fitness, matériel de musculation, accessoires et suppléments sportifs avec livraison partout au Maroc.",
  keywords: [
    "équipements professionnels",
    "matériaux de construction",
    "fitness",
    "musculation",
    "arts martiaux",
    "Maroc",
    "ironz",
  ],
  authors: [{ name: "IRONZ", url: "https://www.ironz.ma" }],
  creator: "IRONZ",
  publisher: "IRONZ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.ironz.ma"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/logo-optimized.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "IRONZ | Équipement fitness et musculation au Maroc",
    description:
      "Équipements de fitness, matériel de musculation, accessoires et suppléments sportifs avec livraison partout au Maroc.",
    url: "https://www.ironz.ma",
    siteName: "IRONZ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1080,
        height: 1080,
        alt: "IRONZ - Équipements Professionnels",
        type: "image/jpeg",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IRONZ | Équipement fitness et musculation au Maroc",
    description: "Matériel de fitness et musculation avec livraison partout au Maroc.",
    images: ["/og-image.jpg"],
    creator: "@ironz_official",
  },
  verification: {
    // 'facebook' is moved inside 'other' to satisfy TypeScript types
    other: {
      monetag: "4828e1edb553377b34517c12934f4fb1",
      "facebook-domain-verification": "bhglqyk56ty0ilu2xcfi7ok1pew1f2",
    },
  },
  other: {
    "instagram:creator": "@ironz_equipements",
    "instagram:site": "@ironz_official",
    "facebook-domain-verification": "bhglqyk56ty0ilu2xcfi7ok1pew1f2",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClientLayout>
      <Suspense fallback={null}>
        <FacebookPixel />
      </Suspense>
      {children}
    </ClientLayout>
  );
}
