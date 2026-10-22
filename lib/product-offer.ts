type OfferSource = {
  price?: number | string;
  inStock?: boolean;
  stockQuantity?: number;
};

export function productOfferAvailability(product: OfferSource): string | undefined {
  // The existing detail-page purchase controls treat numeric zero as
  // unavailable. A missing quantity is not zero and does not block purchase.
  if (product.inStock === false || product.stockQuantity === 0) {
    return "https://schema.org/OutOfStock";
  }
  if (
    product.inStock === true &&
    (product.stockQuantity === undefined ||
      (Number.isFinite(product.stockQuantity) && product.stockQuantity > 0))
  ) {
    return "https://schema.org/InStock";
  }
  // Missing flags or malformed quantities do not establish availability.
  return undefined;
}

export function productOfferSchema(product: OfferSource, url: string): {
  offers?: {
    "@type": "Offer";
    url: string;
    priceCurrency: "MAD";
    price: string;
    availability?: string;
  };
} {
  const value = product.price;
  if ((typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && !value.trim())) return {};
  const price = Number(value);
  if (!Number.isFinite(price) || price < 0) return {};
  const availability = productOfferAvailability(product);
  return {
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "MAD",
      // price is the field displayed and sent by the existing detail page.
      // salePrice/oldPrice must not redefine its commercial pricing policy.
      price: price.toFixed(2),
      ...(availability ? { availability } : {}),
    },
  };
}
