import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CATEGORY_DEFINITIONS } from "../../../lib/category-taxonomy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_DEFINITIONS[slug as keyof typeof CATEGORY_DEFINITIONS] ?? {
    title: "Produits de sport et fitness",
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
    },
  };
}

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return children;
}
