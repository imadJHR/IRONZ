import type { Metadata } from "next";
import BlackFridaySection from "../../components/black-friday-section";
import BlackFridayContent from "../../components/black-friday-content";
import { blackFridayBreadcrumbs, blackFridayCollectionSchema } from "../../lib/black-friday-seo";

const title = "Black Friday Maroc : packs de nutrition sportive | IRONZ";
const description = "Découvrez 6 packs Black Friday de nutrition sportive au Maroc : whey, créatine, crème de riz, gainer et vitamines, dès 875 DH. Livraison offerte.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/black-friday" },
  openGraph: {
    title,
    description,
    url: "/black-friday",
    type: "website",
    locale: "fr_MA",
    images: [{ url: "/black-friday/pack-muscle-energy-whey-creatine-maroc.webp", width: 1254, height: 1254, alt: "Pack Muscle & Energy IRONZ" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/black-friday/pack-muscle-energy-whey-creatine-maroc.webp"] },
};

export default function BlackFridayPage() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blackFridayCollectionSchema()).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blackFridayBreadcrumbs()).replace(/</g, "\\u003c") }} />
    <BlackFridaySection standalone />
    <BlackFridayContent />
  </main>;
}
