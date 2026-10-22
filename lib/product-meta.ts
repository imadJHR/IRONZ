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
export const PRODUCT_META_OVERRIDES: Record<string, {
  description?: string;
  title?: string;
}> = {
  "packs-sauces-healthy": {
    description:
      "Pack sauces régimes associant une sauce barbecue et du vinaigre de cidre. Consultez le contenu et le prix du pack sur la fiche IRONZ au Maroc.",
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

  // Editorial titles retain identifying attributes without clipping names to
  // an arbitrary character limit. Length alone does not predict Google's display.
  "total-upper-body-workout-bar-barre-de-traction-multifonction-pour-porte": {
    title: "Barre de traction multifonction pour porte",
    description:
      "Barre de traction multifonction pour porte, également utilisable au sol pour les pompes et les dips. Retrouvez ses caractéristiques chez IRONZ au Maroc.",
  },
  "ensemble-sport-homme-3-pieces-tenue-fitness-running": {
    title: "Ensemble Sport Homme 3 Pièces",
    description:
      "Ensemble sport homme 3 pièces pour le fitness et le running, avec coupe près du corps et détails réfléchissants. Consultez sa fiche chez IRONZ au Maroc.",
  },
  "now-foods-chromium-picolinate-200-mcg-100-veg-capsules": {
    title: "NOW Picolinate de chrome 200 mcg, 100 capsules",
    description:
      "NOW Foods Chromium Picolinate 200 mcg, flacon de 100 capsules végétales. Consultez la composition et les informations du complément chez IRONZ au Maroc.",
  },
  "sports-fitness-suit-homme-ensemble-compression-sport": {
    title: "Ensemble Compression Sport Homme",
    description:
      "Ensemble compression sport homme avec haut à manches longues et pantalon. Tissu extensible et respirant décrit sur la fiche produit IRONZ au Maroc.",
  },
  "now-certified-organic-spirulina-500-mg-100-tablets": {
    title: "Spiruline NOW 500 mg, 100 comprimés",
    description:
      "Spiruline NOW 500 mg en flacon de 100 comprimés. Retrouvez les informations de composition et de format de ce complément alimentaire chez IRONZ au Maroc.",
  },
  "beverly-hydrolyzed-professional-whey-protein-isolate": {
    title: "Beverly Hydrolyzed Professional Whey Isolate",
    description:
      "Beverly Hydrolyzed Professional, whey isolate hydrolysée à base de lactosérum. Consultez les saveurs et la composition sur la fiche IRONZ au Maroc.",
  },
  "now-milk-thistle-extract-150-mg-60-veg-capsules": {
    title: "NOW Chardon-Marie 150 mg, 60 capsules",
    description:
      "NOW Milk Thistle Extract 150 mg : extrait de chardon-Marie en flacon de 60 capsules. Retrouvez sa composition et les détails du produit chez IRONZ au Maroc.",
  },
  "bandeau-de-sport-headband-fitness-running": {
    title: "Bandeau de Sport Headband",
    description:
      "Bandeau de sport Headband en textile doux et extensible, pour maintenir les cheveux pendant le fitness et le running. Retrouvez sa fiche IRONZ au Maroc.",
  },
  "corde-a-sauter-fafa-sport-skipping-rope-fitnes": {
    title: "Corde à Sauter FAFA Sport",
    description:
      "Corde à sauter FAFA Sport à poignées légères, pour les séances de cardio, d'échauffement et de coordination. Consultez sa fiche chez IRONZ au Maroc.",
  },
};

/**
 * Returns the SEO title for a product, preferring a curated override over the
 * raw product name. The template `| Prix au Maroc | IRONZ` is always appended.
 */
export function productMetaTitle(product: {
  slug?: string;
  name: string;
}): string {
  const override = PRODUCT_META_OVERRIDES[product.slug ?? ""];
  const name = override?.title ?? product.name;
  return `${name} | Prix au Maroc | IRONZ`;
}

/**
 * Returns the SEO description for a product, preferring a curated override
 * over the supplied API snippet. A title-only override must not suppress that
 * snippet. Without source copy, use an identity-based fallback without claims
 * about availability, delivery or technical attributes.
 */
export function productMetaDescription(
  product: { slug?: string; name: string; description?: string; longDescription?: string },
  apiDescription: string,
): string {
  const override = PRODUCT_META_OVERRIDES[product.slug ?? ""];
  if (override?.description?.trim()) return override.description;
  const sourceCopy = [product.description, product.longDescription]
    .map((value) => value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim())
    .find(Boolean);
  const snippet = apiDescription.trim();
  if (sourceCopy && snippet) {
    // The page supplies a length-limited excerpt. Only repair a demonstrably
    // clipped token; leave complete words and editorial overrides unchanged.
    if (
      sourceCopy.startsWith(snippet) &&
      /[\p{L}\p{N}]$/u.test(snippet) &&
      /^[\p{L}\p{N}]/u.test(sourceCopy.slice(snippet.length))
    ) {
      const boundary = snippet.lastIndexOf(" ");
      if (boundary > 0) return `${snippet.slice(0, boundary).trimEnd()}…`;
    }
    return apiDescription;
  }
  return `${product.name} : retrouvez les informations de cette référence et son prix chez IRONZ au Maroc.`;
}
