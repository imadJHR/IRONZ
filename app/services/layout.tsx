import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../lib/og-image";

export const metadata: Metadata = {
  title: "Services IRONZ : aménagement salle, home gym et revêtement | IRONZ",
  description:
    "Services IRONZ au Maroc : aménagement de salle, home gym, salle pro, revêtement sportif, espace enfance, personnalisation, terrains.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services IRONZ : aménagement salle, home gym et revêtement | IRONZ",
    description:
      "Services IRONZ au Maroc : aménagement de salle, home gym, salle pro, revêtement sportif, espace enfance, personnalisation, terrains.",
    url: "https://www.ironz.ma/services",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Services IRONZ : aménagement salle, home gym et revêtement | IRONZ",
    description:
      "Services IRONZ au Maroc : aménagement de salle, home gym, salle pro, revêtement sportif, espace enfance, personnalisation, terrains.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
