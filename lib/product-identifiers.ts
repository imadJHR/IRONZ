type ProductIdentifierSource = {
  sku?: unknown;
  mpn?: unknown;
};

function explicitIdentifier(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const identifier = value.trim();
  if (!identifier || /[\u0000-\u001f\u007f]/.test(identifier)) return undefined;
  return identifier;
}

/** Only explicitly labelled catalog fields establish commercial identifiers.
 * Internal IDs, slugs and untyped "reference" prose must not become SKU/MPN.
 * Numeric-looking strings and their leading zeros remain intact.
 */
export function productIdentifierSchema(product: ProductIdentifierSource): {
  sku?: string;
  mpn?: string;
} {
  const sku = explicitIdentifier(product.sku);
  const mpn = explicitIdentifier(product.mpn);
  return {
    ...(sku ? { sku } : {}),
    ...(mpn ? { mpn } : {}),
  };
}
