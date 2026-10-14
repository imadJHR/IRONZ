import type { Metadata } from "next";

/**
 * Meta descriptions for products whose API `description` field is too short or
 * too thin to serve as a search snippet.
 *
 * Every entry is backed by facts present in the product record (name, price,
 * brand, documented attributes) — no invented availability, warranty, or
 * delivery promise. Only the fields that need overriding are listed.
 *
 * Keyed by product slug, matching the URL segment used by
 * `productSlug()` in `lib/products.ts`.
 */
export const PRODUCT_META_OVERRIDES: Record<string, { description: string }> = {
  "packs-sauces-healthy": {
    description:
      "Pack sauces healthy : barbecue ServiVita sans sucre ni matières grasses, vinaigre de cidre offert. Assaisonnez vos plats, livraison partout au Maroc.",
  },

  // 10 haltères IRONBULL : la fiche API est identique pour les 10 poids. La
  // description ci-dessous reprend uniquement des faits de la fiche (poids,
  // prix, tête acier massif, revêtement caoutchouc, poignée chromée moletée,
  // vente en paire) pour différencier chaque page.
  "les-halteres-ironbull-40-kg": {
    description:
      "Paire d'haltères IRONBULL 40 kg à 2080 MAD : tête en acier massif revêtue de caoutchouc, poignée chromée moletée. Soudées en une seule pièce.",
  },
  "les-halteres-ironbull-35kg": {
    description:
      "Haltères IRONBULL 35 kg, paire à 1820 MAD : acier massif sous revêtement caoutchouc, poignée chromée moletée pour une prise ferme.",
  },
  "les-halteres-ironbull-30-kg": {
    description:
      "Paire d'haltères IRONBULL 30 kg (1566 MAD) : tête acier massif revêtue caoutchouc, soudée en une pièce. Poignée chromée moletée, prise confortable.",
  },
  "les-halteres-ironbull-25-kg": {
    description:
      "Haltères IRONBULL 25 kg vendus en paire, 1999 MAD : tête en acier massif, revêtement caoutchouc, poignée chromée moletée. Une seule pièce.",
  },
  "les-halteres-ironbull-225-kg": {
    description:
      "Paire d'haltères IRONBULL 22,5 kg à 1799 MAD : acier massif revêtu de caoutchouc, poignée chromée moletée, soudure en une seule pièce.",
  },
  "les-halteres-ironbull-175-kg": {
    description:
      "Haltères IRONBULL 17,5 kg, paire à 1399 MAD : tête acier massif sous caoutchouc, poignée chromée moletée. Idéales pour équiper une salle.",
  },
  "les-halteres-ironbull-20-kg": {
    description:
      "Paire d'haltères IRONBULL 20 kg (1599 MAD) : tête en acier massif revêtue de caoutchouc, poignée chromée moletée, soudées en une pièce.",
  },
  "les-halteres-ironbull-15-kg": {
    description:
      "Haltères IRONBULL 15 kg vendus en paire, 1199 MAD : acier massif, revêtement caoutchouc, poignée chromée moletée pour une prise ferme et sûre.",
  },
  "haltere-ir0nbull-125-kg": {
    description:
      "Paire d'haltères IRONBULL 12,5 kg à 999 MAD : tête en acier massif revêtue caoutchouc, poignée chromée moletée, soudées en une seule pièce.",
  },
  "les-halteres-ironbull": {
    description:
      "Haltères IRONBULL 10 kg, paire à 799 MAD : tête acier massif sous revêtement caoutchouc, poignée chromée moletée. Pour home gym ou salle.",
  },

  // 5 kettlebells : même cas, fiche API identique pour les 5 poids.
  "kettle-bell-14-kg": {
    description:
      "Kettlebell en acier de 14 kg (775 MAD) : renforcement musculaire, endurance et exercices fonctionnels. Poignée large pour une prise en main sûre.",
  },
  "kettle-bell-16-kg": {
    description:
      "Kettlebell acier 16 kg à 885 MAD : swings, squats, snatch et soulevés de terre. Poignée large et confortable, prise en main sûre.",
  },
  "kettle-bell-12-kg": {
    description:
      "Kettlebell en acier de 12 kg (665 MAD) : renforcement, coordination et mouvements fonctionnels. Poignée large et confortable pour une prise sûre.",
  },
  "kettle-bell-10-kg": {
    description:
      "Kettlebell acier 10 kg à 555 MAD : swings, squats, snatch et soulevés de terre. Poignée large et confortable pour une prise en main sûre.",
  },
  "kettlebell": {
    description:
      "Kettlebell en acier de 8 kg (455 MAD) : swings, squats, snatch et soulevés de terre. Poignée large et confortable, prise en main sûre.",
  },

  // 2 disques de musculation : la meta description se résolvait aux 155
  // premiers caractères d'une description API qui commence pareil ("Disques
  // de musculation 20 kg…"), ce qui produisait deux meta identiques.
  "disques-de-musculation-10-kg": {
    description:
      "Disques de musculation 10 kg, 1299 MAD : revêtement résistant protégeant le sol et le matériel, trou central pour barres olympiques.",
  },
  "disques-de-musculation-20-kg": {
    description:
      "Disques de musculation 20 kg à 2350 MAD : robustes et durables, revêtement résistant, trou central standard pour barres olympiques.",
  },
};

/**
 * Returns the SEO description for a product, preferring a curated override
 * over the raw API description. Falls back to the product's own description,
 * truncated to the snippet length, then to a brand-name sentence.
 */
export function productMetaDescription(
  product: { slug?: string; name: string; description?: string; longDescription?: string },
  apiDescription: string,
): string {
  const override = PRODUCT_META_OVERRIDES[product.slug ?? ""];
  if (override) return override.description;
  return apiDescription;
}
