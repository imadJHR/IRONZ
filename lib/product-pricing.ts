type ProductPricing = {
  price: number | string;
  oldPrice?: number | string | null;
  discount?: number | string | null;
};

export function getDiscount(product: ProductPricing): number {
  const price = Number(product.price);
  const oldPrice = Number(product.oldPrice);

  // Prices are authoritative: the stored discount can be missing or outdated.
  if (Number.isFinite(oldPrice) && oldPrice > 0) {
    if (!Number.isFinite(price) || price < 0) return 0;
    return Math.max(0, Math.round(((oldPrice - price) / oldPrice) * 100));
  }

  const discount = Number(product.discount);
  return Number.isFinite(discount) && discount > 0 && discount <= 100
    ? discount
    : 0;
}
