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
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "IRONZ- Équipements Professionnels et Matériaux",
    template: "%s | IRONZ PRO",
  },
  description:
    "Votre partenaire de confiance pour tous vos besoins en équipements professionnels et matériaux de construction.",
  keywords: [
    "équipements professionnels",
    "matériaux de construction",
    "fitness",
    "musculation",
    "arts martiaux",
    "Maroc",
    "ironz",
  ],
  authors: [{ name: "IRONZ PRO", url: "https://ironz.ma" }],
  creator: "IRONZ PRO",
  publisher: "IRONZ PRO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ironz.ma"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "IRONZ PRO - Équipements Professionnels et Matériaux",
    description:
      "Votre partenaire de confiance pour tous vos besoins en équipements professionnels et matériaux de construction.",
    url: "https://ironz.ma",
    siteName: "IRONZ PRO",
    images: [
      {
        url: "https://www.instagram.com/p/DIW2nZtsx3S/",
        width: 1200,
        height: 630,
        alt: "IRONZ PRO - Équipements Professionnels",
        type: "image/jpeg",
      },
      {
        url: "/og-image.jpg",
        width: 1080,
        height: 1080,
        alt: "IRONZ PRO - Équipements Professionnels",
        type: "image/jpeg",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IRONZ PRO - Équipements Professionnels",
    description: "Votre partenaire de confiance pour équipements professionnels au Maroc.",
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
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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