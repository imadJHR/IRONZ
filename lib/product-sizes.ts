// The admin stores size variants in `taille`.
export function productSizes(taille: unknown): string[] {
  const values = Array.isArray(taille) ? taille : [taille];
  const sizes: string[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    if (typeof value !== "string") continue;
    for (const part of value.split(",")) {
      const size = part.trim();
      const key = size.toLocaleLowerCase("fr-MA");
      if (!size || seen.has(key)) continue;
      seen.add(key);
      sizes.push(size);
    }
  }
  return sizes;
}
