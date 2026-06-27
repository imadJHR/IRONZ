import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./Providers";

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
  title: "IRONZ PRO — Site en Maintenance",
  description:
    "IRONZ PRO est en maintenance. Revenez vite pour découvrir nos équipements sportifs professionnels au Maroc.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
