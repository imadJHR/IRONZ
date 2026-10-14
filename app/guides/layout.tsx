import type { Metadata } from "next";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../lib/og-image";

export const metadata: Metadata = {
  title: "Guides fitness et musculation au Maroc | IRONZ",
  description:
    "Guides d'achat IRONZ : comparez haltères, kettlebells, disques, machines cardio et matériel de boxe avant d'acheter au Maroc.",
  alternates: { canonical: "/guides" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Guides fitness et musculation au Maroc | IRONZ",
    description:
      "Guides d’achat IRONZ : comparez haltères, kettlebells, disques, machines cardio et matériel de boxe avant d’acheter au Maroc.",
    url: "https://www.ironz.ma/guides",
    siteName: "IRONZ",
    images: OG_LOGO_IMAGES,
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides fitness et musculation au Maroc | IRONZ",
    description:
      "Guides d’achat IRONZ : comparez haltères, kettlebells, disques, machines cardio et matériel de boxe avant d’acheter au Maroc.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-white dark:bg-gray-950">{children}</main>;
}
