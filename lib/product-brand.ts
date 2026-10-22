type BrandSource = {
  name?: string;
  brand?: string;
  features?: string[];
  description?: string;
};

// These brand spellings are explicit in the audited catalog's product names
// or labelled attributes. Never infer brands from slugs, tags, the seller,
// image filenames, compatibility prose or an unlabelled description mention.
const CATALOG_BRANDS: Array<[string, RegExp]> = [
  ["NOW", /\bNOW(?: Foods)?\b/i],
  ["LIVEPRO", /\bLIVEPRO\b/i],
  ["FAFA Sport", /\bFAFA Sport\b/i],
  ["Nike", /\bNike\b/i],
  ["BioTechUSA", /\bBioTechUSA\b/i],
  ["Optimum Nutrition", /\bOptimum Nutrition\b(?: \(ON\))?/i],
  ["Hiro.Lab", /\bHiro\.Lab\b/i],
  ["Beverly", /\bBeverly\b/i],
  ["Dynamix", /\bDynamix\b/i],
  ["Applied Nutrition", /\bApplied Nutrition\b/i],
  ["IRONBULL", /\bIRONBULL\b/i],
  ["PAKKA", /\bPAKKA\b/i],
  ["Adidas", /\bAdidas\b/i],
  ["NARSIZO", /\bNARSIZO\b/i],
  ["OLYMP", /\bOLYMP\b/i],
  ["Reebok", /\bReebok\b/i],
  ["Gorilla Wear", /\bGorilla Wear\b/i],
  ["Everlast", /\bEverlast\b/i],
  ["Vitadulce", /\bVitadulce\b/i],
  ["ServiVita", /\bServiVita\b/i],
  ["HAPPYGAM", /\bHAPPYGAM\b/i],
  ["IRONZ", /\bIRONZ\b/i],
];

function brandValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  if (!text || /^(?:generic|g[eé]n[eé]rique|unknown|inconnu[e]?|sans marque|n\/?a|null|undefined|[-–—])$/i.test(text)) {
    return undefined;
  }
  return text;
}

function brandKey(value: string): string {
  const match = CATALOG_BRANDS.find(([, pattern]) => {
    const found = value.match(pattern);
    return found?.[0].length === value.length;
  });
  return (match?.[0] ?? value).toLowerCase();
}

export function productBrand(product: BrandSource): string | undefined {
  const explicit = brandValue(product.brand);
  const name = typeof product.name === "string" ? product.name : "";
  // A reference to another brand's equipment does not establish who made
  // this product. Explicit brand fields/labels may still establish it.
  const compatible = /\b(?:compatible|compatibility|compatibilit[eé]|pour|for|adapt[eé])\b/i.test(name);
  const named = compatible ? [] : CATALOG_BRANDS
    .filter(([, pattern]) => pattern.test(name))
    .map(([brand]) => brand);
  const lines = [
    ...(Array.isArray(product.features) ? product.features : []),
    ...(typeof product.description === "string" ? product.description.split(/\r?\n/) : []),
  ];
  const declared = lines.flatMap((line) => {
    if (typeof line !== "string") return [];
    const value = brandValue(line.match(/^\s*Marque\s*:\s*(.+?)\s*$/i)?.[1]);
    return value ? [value] : [];
  });
  const evidence = [...(explicit ? [explicit] : []), ...declared, ...named];
  if (new Set(evidence.map(brandKey)).size !== 1) return undefined;
  // Ambiguous free-text labels (e.g. HANDGRIP) need business confirmation,
  // but still participate in conflict detection instead of being ignored.
  const labelled = CATALOG_BRANDS.find(([brand]) =>
    declared.some((value) => brandKey(value) === brandKey(brand)),
  );
  return explicit ?? labelled?.[0] ?? named[0];
}

export function productBrandSchema(product: BrandSource): {
  brand?: { "@type": "Brand"; name: string };
} {
  const name = productBrand(product);
  return name ? { brand: { "@type": "Brand", name } } : {};
}
