import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos d’IRONZ | IRONZ",
  description: "Découvrez IRONZ, son univers fitness au Maroc, ses produits et ses services d’aménagement d’espaces sportifs.",
  alternates: { canonical: "/a-propos" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "À propos d’IRONZ | IRONZ",
    description: "Découvrez IRONZ, ses produits fitness et ses services d’aménagement d’espaces sportifs au Maroc.",
    url: "https://www.ironz.ma/a-propos",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos d’IRONZ | IRONZ",
    description: "Découvrez IRONZ, ses produits fitness et ses services d’aménagement d’espaces sportifs au Maroc.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
