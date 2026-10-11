import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../lib/og-image";
import { articles } from "../../lib/blog";
import type { BlogArticle } from "../../lib/blog";
import BlogHubClient from "./BlogHubClient";

const PAGE_URL = "https://www.ironz.ma/blog";

export const metadata = {
  title: "Blog fitness, musculation et aménagement au Maroc | IRONZ",
  description:
    "Articles et guides IRONZ pour s'équiper au Maroc : choisir son matériel de musculation, ses machines cardio, sa nutrition et aménager sa salle de sport.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Blog fitness, musculation et aménagement au Maroc | IRONZ",
    description:
      "Articles et guides IRONZ pour s'équiper au Maroc : matériel de musculation, machines cardio, nutrition et aménagement de salle de sport.",
    url: PAGE_URL,
    siteName: "IRONZ",
    locale: "fr_MA",
    type: "website",
    images: OG_LOGO_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog fitness, musculation et aménagement au Maroc | IRONZ",
    description:
      "Articles et guides IRONZ pour s'équiper au Maroc : musculation, cardio, nutrition et aménagement de salle.",
    images: TWITTER_LOGO_IMAGES,
    creator: "@ironz_official",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ironz.ma" },
      { "@type": "ListItem", position: 2, name: "Blog", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog fitness, musculation et aménagement au Maroc",
    description:
      "Articles et guides IRONZ pour s'équiper en matériel de fitness et musculation au Maroc.",
    url: PAGE_URL,
    publisher: {
      "@type": "Organization",
      name: "IRONZ",
      logo: { "@type": "ImageObject", url: "https://www.ironz.ma/logo-optimized.png" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Articles du blog IRONZ",
    itemListElement: articles.map((article: BlogArticle, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: `https://www.ironz.ma/blog/${article.slug}`,
    })),
  },
];

export default function BlogHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogHubClient />
    </>
  );
}
