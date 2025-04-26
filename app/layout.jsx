import React from "react";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "IRONZ PRO - Équipements Professionnels et Matériaux",
  description: "Votre partenaire de confiance pour tous vos besoins en équipements professionnels et matériaux de construction.",
  keywords: "équipements professionnels, matériaux de construction, fitness, musculation, arts martiaux, Maroc, ironz",
  authors: [{ name: "IRONZ PRO", url: "https://ironz.ma" }],
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
    apple: [
      { url: "/public/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // Open Graph - Used by both Facebook and Instagram
  openGraph: {
    title: "IRONZ PRO - Équipements Professionnels et Matériaux",
    description: "Votre partenaire de confiance pour tous vos besoins en équipements professionnels et matériaux de construction.",
    url: "https://ironz.ma",
    siteName: "IRONZ PRO",
    images: [
      {
        url: "https://www.instagram.com/p/DIW2nZtsx3S/",
        width: 1200,
        height: 630,
        alt: "IRONZ PRO - Équipements Professionnels",
      },
      {
        url: "/public/instagram-image.jpg",
        width: 1080,
        height: 1080,
        alt: "IRONZ PRO - Équipements Professionnels",
      },
    ],
    locale: "fr_MA",
    type: "website",
    facebook: {
      appId: "your-facebook-app-id",
    },
  },
  
  facebook: {
    domainVerification: "your-facebook-domain-verification-code",
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
  verification: {
    yandex: "your-yandex-verification-code",
  },
  // Additional meta tags that might help with social sharing
  other: {
    // Instagram doesn't have specific meta tags but uses Open Graph
    // You can add additional tags that might help
    "instagram:creator": "@ironz_equipements",
    "instagram:site": "@ironz_official",
  }
};

export default function RootLayout({ children }) {
  return (<ClientLayout>{children}</ClientLayout>)
}