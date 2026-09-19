import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CATEGORY_DEFINITIONS } from "../../../lib/category-taxonomy";
import { OG_LOGO_IMAGES, TWITTER_LOGO_IMAGES } from "../../../lib/og-image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_DEFINITIONS[slug as keyof typeof CATEGORY_DEFINITIONS] ?? {
    title: "Produits de sport et fitness | IRONZ",
    description:
      "Découvrez les produits IRONZ pour le sport, le fitness et la remise en forme au Maroc.",
  };
  const canonicalPath = `/categories/${slug}`;

  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: category.title,
      description: category.description,
      url: canonicalPath,
      type: "website",
      images: OG_LOGO_IMAGES,
    },
    twitter: {
      card: "summary_large_image",
      title: category.title,
      description: category.description,
      images: TWITTER_LOGO_IMAGES,
      creator: "@ironz_official",
    },
  };
}

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return children;
}
