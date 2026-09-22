import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";

export const metadata: Metadata = {
  title: "Revêtement de sol sportif au Maroc | IRONZ",
  description:
    "Revêtement de sol sportif au Maroc pour salles de sport et espaces fitness : dalles caoutchouc, PVC sportif, résine polyuréthane, protections murales et devis.",
  alternates: { canonical: "/services/revetement-sol-mur" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Revêtement de sol sportif au Maroc | IRONZ",
    description:
      "Revêtement de sol sportif au Maroc pour salles de sport et espaces fitness : dalles caoutchouc, PVC sportif, résine polyuréthane, protections murales et devis.",
    url: "https://www.ironz.ma/services/revetement-sol-mur",
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Revêtement de sol sportif au Maroc | IRONZ",
    description:
      "Revêtement de sol sportif au Maroc pour salles de sport et espaces fitness : dalles caoutchouc, PVC sportif, résine polyuréthane, protections murales et devis.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function SportsFlooringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
