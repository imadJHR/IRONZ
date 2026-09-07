import type { Metadata } from "next";
import type { ReactNode } from "react";

const categoryMetadata: Record<
  string,
  { title: string; description: string }
> = {
  equipements: {
    title: "Équipements fitness professionnels au Maroc",
    description:
      "Découvrez les équipements IRONZ pour salles de sport, fitness, musculation et remise en forme au Maroc.",
  },
  supplement: {
    title: "Suppléments et nutrition sportive au Maroc",
    description:
      "Découvrez les suppléments et produits de nutrition sportive IRONZ pour accompagner vos objectifs de performance.",
  },
  accessoires: {
    title: "Accessoires de sport et fitness au Maroc",
    description:
      "Découvrez les accessoires IRONZ pour le sport, le fitness, la musculation et le bien-être au Maroc.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryMetadata[slug] ?? {
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
